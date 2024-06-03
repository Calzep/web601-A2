const express = require('express')

const router = express()

//SECTION - HTTP method handlers

router.get('/', (req, res) => {
    response.send('hi')
})

module.exports = router