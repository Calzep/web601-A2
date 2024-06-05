//SECTION - Imports

//External packages
const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//Internal modules
const Note = require('./models/note.js')

//Variables
const app = express()
const port = process.env.PORT || 3000

//Use packages
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//SECTION - Routers
const api = process.env.API_URL
const noteRoutes = require('./routes/notes.js')

//use routers
app.use(`${api}/notes`, noteRoutes)

//SECTION - Database connection

//MongoDB URI
const uri = 'mongodb://localhost:27017/noteDB';

mongoose.connect(uri)
    .then(() => {
        console.log(`Connection established with MongoDB at ${uri}`);
    })
    .catch((err) => {
        console.error(`Could not connect to ${uri}. Exiting process`);
        console.error(err);
        process.exit(1);
    });


//SECTION - Host server

app.listen(port, () => {
    console.log(`Live on port ${port}`)
})