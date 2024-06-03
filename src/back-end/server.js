//SECTION - Imports

//External packages
const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//Internal modules


//Variables
const app = express()
const port = process.env.PORT || 3000

//Use packages
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))

//SECTION - Routers
const api = process.env.API_URL
const noteRoutes = require('./routes/notes.js')

//use routers
app.use(`${api}/notes`, noteRoutes)

app.get('/', (req, res) => {
    res.send('hi')
})
//SECTION - Host server
app.listen(port, () => {
    console.log(`Live on port ${port}`)
})