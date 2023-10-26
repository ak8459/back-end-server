const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: String,
    description: String,
    username: String,
    userId: String
}, {
    versionKey: false,
    timestamps: true
})

const NoteModel = mongoose.model('Note', noteSchema)

module.exports = {
    NoteModel
}