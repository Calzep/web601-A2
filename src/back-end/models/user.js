const mongoose = require('mongoose')

//Schema for storing users
const userSchema = new mongoose.Schema({
    username: {
        typeof: String,
        required: true,
        unique: true
    },
    password: {
        typeof: String,
        required: true
    }
})

module.exports = mongoose.model('user', userSchema)