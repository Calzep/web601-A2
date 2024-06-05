//SECTION - Imports

//External packages
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

//Internal modules
const Note = require('./models/note.js')
const config = require("./config/loadEnv.js")

//Variables
const app = express()
const port = config.port

//Use packages
app.use(cors())
app.options("*", cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//SECTION - Routers
const noteRoutes = require('./routes/notes.js')

//use routers
app.use(`/api/notes`, noteRoutes)

//SECTION - Database connection

//MongoDB URI
mongoose.promise = global.promise

mongoose.connect(config.atlas_uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => {
        console.log(`Connection established with MongoDB`);
    })
    .catch((err) => {
        console.error(`Could not connect to MongoDB. Exiting process`);
        console.error(err);
        process.exit(1);
    });


//SECTION - Host server
app.get('/', (req, res) => {
    res.status(200).send("Connected to server")
})

app.listen(port, () => {
    console.log(`Live on port ${port}`)
})