//SECTION -  Imports
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')

const config = require('../config/loadEnv')
//Data model
const User = require('../models/user')
const RefreshToken = require('../models/refreshToken')

//Includes middlewares
const getRefreshToken = require('../middleware/getRefreshToken')
const { CancellationToken } = require('mongodb')

const router = express()

//Enables processing of html forms
const upload = multer()

//SECTION - Functions
const generateAccessToken = (user) => {
    return jwt.sign({id: user._id}, config.jwt_access_secret, {expiresIn: '600s'})
}

//SECTION - Endpoints

router.post('/signup', upload.none(), async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try{ 
        let user = await User.findOne({username: username})
        if(user) {
            return res.status(400).json({message: "Username is already in use"})
        }

        //Create user object with request data
        user = new User({username, password})

        //Generate hash and salt password with bcrypt
        user.password = await bcrypt.hash(password, 10)

        await user.save()

        res.status(200).json({message:'Registration successful'})
    } catch (err) {
        console.error(err)
        res.status(500).json({message:'Internal server error', error:err})
    }
})

router.post('/login', upload.none(), async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        let user = await User.findOne({username: username})

        if(!user) {
            return res.status(400).json({message: "Username or password is incorrect"})
        }

        if(!await bcrypt.compare(password, user.password)) {
            return res.status(400).json({message: "Username or password is incorrect"})
        }

        const accessToken = generateAccessToken(user)
        let refreshToken = jwt.sign(user.id, config.jwt_refresh_secret)

        rToken = new RefreshToken({
            token : refreshToken
        })

        rToken = await rToken.save()

        if(rToken) {
            res.status(200).json({accessToken:accessToken, refreshToken:refreshToken})
        } else {
            res.status(404).send({message:"Refresh token could not be saved"})
        }

    } catch (err) {
        console.error(err)
        res.status(500).json({message:'Internal server error'})
    }
})

router.delete('/logout', getRefreshToken, (req, res) => {
    token = RefreshToken.findOneAndDelete ({token: req.token}).then(token => {
        if(token) {
            return res.status(200).json({message: 'Token deleted'})
        } else {
            return res.status(404).json({message: 'Token not found'})
        }
    }).catch((err) => {
        return res.status(400).json({message: err})
    })
})

router.post('/token', async (req, res) => {
    const refreshToken = req.body.token
    if(!refreshToken) {
        return res.status(401).json({message: "No refresh token provided"})
    }

    let token = await RefreshToken.find({token: refreshToken})
    if(!token) {
        return res.status(403).json({message: "refresh token is invalid"})
    }

    //CHECK if refresh token is valid
    jwt.verify(refreshToken, config.jwt_refresh_secret, (err, user) => {
        if(err){
            return res.status(403).json({message: "refresh token is invalid"})
        }
        const accessToken = generateAccessToken({id: user._id})
        res.status(200).json({accessToken: accessToken})
    })
})

module.exports = router