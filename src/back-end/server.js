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
const authRoutes = require('./routes/auth.js')

//use routers
app.use('/api/notes', noteRoutes)
app.use('api/auth', authRoutes)

//SECTION - Database connection

//Establish mongo promises as global promises
mongoose.promise = global.promise

//Attempt to connect to the mongo db using mongoose, sending an error if failed.
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
//Send message to show server connection
app.get('/', (req, res) => {
    res.status(200).send("Connected to server")
})

//Host on port X
app.listen(port, () => {
    console.log(`Live on port ${port}`)
})