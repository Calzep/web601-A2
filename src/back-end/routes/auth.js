//SECTION -  Imports
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')

const config = require('../config/loadEnv')

//Data models
const User = require('../models/user')
const RefreshToken = require('../models/refreshToken')

//Include middlewares
const getRefreshToken = require('../middleware/getRefreshToken')

const router = express()

//Enables processing of html forms
const upload = multer()

//SECTION - Functions

//Creates a JWT access token
const generateAccessToken = (user) => {
    return jwt.sign({id: user._id}, config.jwt_access_secret, {expiresIn: '600s'})
}

//SECTION - Endpoints

//Attempts to create a new user
router.post('/signup', upload.none(), async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try{ 
        //Check if username is already in use
        let user = await User.findOne({username: username})
        if(user) {
            return res.status(400).json({message: "Username is already in use"})
        }

        //Create user object with request data
        user = new User({username, password})

        //Generate hash and salt password with bcrypt
        user.password = await bcrypt.hash(password, 10)

        //Saves new user to database
        await user.save()

        res.status(200).json({message:'Registration successful'})

    } catch (err) {
        console.error(err)
        res.status(500).json({message:'Internal server error', error:err})
    }
})

//Attempts to log in user
router.post('/login', upload.none(), async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        //Check if username exists in database
        let user = await User.findOne({username: username})
        if(!user) {
            return res.status(400).json({message: "Username or password is incorrect"})
        }

        //Check if password matches bcrypt hashed password
        if(!await bcrypt.compare(password, user.password)) {
            return res.status(400).json({message: "Username or password is incorrect"})
        }

        //Creates tokes
        const accessToken = generateAccessToken(user)
        let refreshToken = jwt.sign({id: user._id}, config.jwt_refresh_secret)

        //Saves refresh token to database
        rToken = new RefreshToken({
            token : refreshToken
        })
        rToken = await rToken.save()

        //Check if token was saved successfully
        if(rToken) {
            //Returns tokens
            res.status(200).json({accessToken:accessToken, refreshToken:refreshToken})
        } else {
            res.status(404).send({message:"Refresh token could not be saved"})
        }

    } catch (err) {
        console.error(err)
        res.status(500).json({message:'Internal server error'})
    }
})

//Attempts to logout user
router.delete('/logout', getRefreshToken, (req, res) => {
    //Delete access token from database
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

//Refreshes access token using refresh token
router.post('/token', getRefreshToken, async (req, res) => {

    //Check if token was provided
    const refreshToken = req.token
    if(!refreshToken) {
        return res.status(401).json({message: "No refresh token provided"})
    }

    //Check if refresh token is valid
    let token = await RefreshToken.find({token: refreshToken})
    if(!token) {
        return res.status(403).json({message: "refresh token is invalid"})
    }

    //CHECK if refresh token is valid
    jwt.verify(refreshToken, config.jwt_refresh_secret, (err, user) => {
        if(err){
            return res.status(403).json({message: "refresh token is invalid"})
        }

        //Create new access token and send to client
        const accessToken = generateAccessToken({user})
        res.status(200).json({accessToken: accessToken})
    })
})

module.exports = router