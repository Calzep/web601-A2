//SECTION -  Imports
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')

const config = require('../config/loadEnv')
//Data model
const User = require('../models/user')

//Includes middlewares
const router = express()

//Enables processing of html forms
const upload = multer()

//SECTION - Functions
const generateAccessToken = (user) => {
    return jwt.sign(user, config.jwt_access_secret, {expiresIn: '360000'})
}

//SECTION - Endpoints

router.post('/signup', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    //TODO - ADD VALIDATION HERE

    try {
        let user = await User.findOne({username})
        if(user) {
            return res.status(400).json({message: "Username is already in use"})
        }

        //Create user object with request data
        user = new User({username, password})

        //Generate hash and salt password with bcrypt
        user.password = await bcrypt.hash(password, 10)

        await user.save()

        const payload = {user: {is: user.id}}

        jwt.sign(payload, config.jwt_access_secret, {expires: 720000}, (err, token) => {
            if(err) {
                throw err
            }
            res.status(201).json({token})
        })
    } catch (err) {
        res.status(500).json({message:'Internal server error', error:err})
    }
})

router.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        let user = await user.findOne({username})

        if(!user) {
            return res.status(400).json({message: "Username or password is incorrect"})
        }

        if(!await bcrypt.compare(password, user.password)) {
            return res.status(400).json({message: "Username or password is incorrect"})
        }

        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, config.jwt_refresh_secret)

        res.status(200).json({accessToken: accessToken, refreshToken: refreshToken})

    } catch (err) {
        res.status(500).send('server error')
    }
})

router.delete('/logout', (req, res) => {
    //delete refreshToken
    res.status(204)
})

router.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if(!refreshToken) return res.status(401)
    //CHECK if refresh token is valid
    jwt.verify(refreshToken, config.jwt_refresh_secret, (err, user) => {
        if(err){
            return res.status(403)
            const accessToken = generateAccessToken({name: user.username})
            res.json({accessToken: accessToken})
        }
    })
})

module.exports = router