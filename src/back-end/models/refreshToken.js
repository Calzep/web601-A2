const mongoose = require('mongoose')
const Schema = mongoose.Schema; 
//Schema for storing users
const refreshTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('refreshToken', refreshTokenSchema)