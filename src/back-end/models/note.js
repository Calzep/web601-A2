const mongoose = require ('mongoose')
const Schema = mongoose.Schema; 

//Schema for storing notes
const noteSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    date : {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('note', noteSchema)