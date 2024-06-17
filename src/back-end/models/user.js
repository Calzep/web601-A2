const mongoose = require('mongoose')
const Schema = mongoose.Schema; 
//Schema for storing users
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('user', userSchema)