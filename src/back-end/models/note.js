const mongoose = require ('mongoose')
const Schema = mongoose.Schema; 

const noteSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
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