//SECTION -  Imports
const express = require('express')
const multer = require('multer')

//Data model
const Note = require('../models/note.js')

//Middleware
const authenticateToken = require('../middleware/authenticateToken.js')

const router = express()
//Enables processing of html forms
const upload = multer()

//SECTION - HTTP method handlers

//Retrieve all notes
//Attempts to send all notes from the database, sending an error if failed.
router.get('/', authenticateToken, async (req, res) => {
    const noteList = await Note.find({userId: req.user.id})
    if(noteList) {
        res.status(200).send(noteList)
    } else {
        res.status(500).json({success:false, message: "Could not retrieve notes list"})
    }
})

//Find one note
//Attempts to send a single note from the database, sending an error if failed.
router.get('/:id', authenticateToken, async (req, res) => {
    let note = await Note.findById(req.params.id)
    
    if (note) {
        res.status(200).json({note:note})
    } else {
        res.status(500).json({message: 'Could not find a note with the given ID'})
    }
})

//Save Note
//Attempts to save a note to the database sending an error if failed.
router.post('/', authenticateToken, upload.none(), async (req, res) => {
    let note = new Note ({
        userId: req.user.id,
        title: req.body.title,
        content: req.body.content,
        date: new Date()
    })
    note = await note.save()
    
    if(note) {
        res.status(200).json({message:"Note saved to database"})
    } else {
        res.status(404).send({message:"Error, Note could not be saved"})
    }
})

//Update note
//Attempts to update a note to the database, sending an error if failed.
router.put('/:id', authenticateToken, upload.none(), async (req, res) => {
    let note = await Note.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content,
        date: new Date()
    }, {
        new: true
    })

    if(note) {
        res.status(200).json({message:"Note updated"})
    } else {
        res.status(500).json({message:"Error, note could not be updated"})
    }
})

//Delete note
//Attempts to remove a note from the database, sending an error if failed.
router.delete('/:id', authenticateToken, upload.none(), async (req, res) => {
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