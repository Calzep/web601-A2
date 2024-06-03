const express = require('express')

const router = express()

//SECTION - HTTP method handlers

//Get Notes
router.get('/', (req, res) => {
    response.send('hi')
})

//Save Note
router.post('/', (req, res) => {
    const note = new Note ({
        title: 'TestTitle',
        content: 'notenotentoenotentoentoeneotnon'
    })
    note.save()
    .then(result => {
        res.redirect("/")
    })
})

module.exports = router