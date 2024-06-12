//SECTION -  Imports
const express = require('express')
const multer = require('multer')

//Data model


const router = express()
//Enables processing of html forms
const upload = multer()

module.exports = router