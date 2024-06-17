//SECTION -  Imports
const express = require('express')
const multer = require('multer')

//Data model
const Note = require('../models/note.js')

//Middleware
const authenticateToken = require('../middleware/auth.js')

const router = express()
//Enables processing of html forms
const upload = multer()

//SECTION - HTTP method handlers

//Retrieve all notes
//Attempts to send all notes from the database, sending an error if failed.
router.get('/', authenticateToken, async (req, res) => {
    console.log(req.user)
    const noteList = await Note.find({userId: req.user.id})
    if(noteList) {
        res.status(200).send(noteList)
    } else {
        res.status(500).json({success:false, message: "Could not retrieve notes list"})
    }
})

//Find one note
//Attempts to send a single note from the database, sending an error if failed.
router.get('/:id', async (req, res) => {
    let note = await Note.findById(req.params.id)
    
    if (note) {
        res.status(200).send(note)
    } else {
        res.status(500).json({success:false, message: 'Could not find a note with the given ID'})
    }
})

//Save Note
//Attempts to save a note to the database sending an error if failed.
router.post('/', upload.none(), async (req, res) => {
    let note = new Note ({
        userId: 1,  //REVIEW replace with current user when implementing authentication
        title: req.body.title,
        content: req.body.content,
        date: new Date()
    })
    note = await note.save()
    
    if(note) {
        res.status(200).send("Note saved to database")
    } else {
        res.status(404).send("Error, Note could not be saved")
    }
})

//Update note
//Attempts to update a note to the database, sending an error if failed.
router.put('/:id', upload.none(), async (req, res) => {
    let note = await Note.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content,
        date: new Date()
    }, {
        new: true
    })

    if(note) {
        res.status(200).send('Success')
    } else {
        res.status(500).send("Error, note could not be updated")
    }
})

//Delete note
//Attempts to remove a note from the database, sending an error if failed.
router.delete('/:id', upload.none(), async (req, res) => {
    Note.findByIdAndDelete(req.params.id).then(note => {
        if(note) {
            return res.status(200).json({success: true, message: 'Note deleted'})
        } else {
            return res.status(404).json({success: false, message: 'Note not found'})
        }
    }).catch((err) => {
        return res.status(400).json({success:false, message: err})
    })
})

module.exports = router