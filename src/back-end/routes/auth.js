//SECTION -  Imports
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')

const config = require('../config/loadEnv')
//Data model
const User = require('../models/user')

//Includes middlewares
const router = express.Router()

//Enables processing of html forms
const upload = multer()

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

        //Generate password salt with bcrypt
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payload = {user: {is: user.id}}

        jwt.sign(payload, config.jwt_access_secret, {expires: 720000}, (err, token) => {
            if(err) {
                throw err
            }
            res.json({token})
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

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch) {
            return res.status(400).json({message: "Username or password is incorrect"})
        }

        const payload = { user: {id: user.id}}

        jwt.sign(payload, config.jwt_access_secret, {expiresIn: 720000}, (err, token) => {
            if(err) {
                throw err
            }
            res.json({token})
        })
    } catch (err) {
        res.status(500).send('server error')
    }
})

module.exports = router