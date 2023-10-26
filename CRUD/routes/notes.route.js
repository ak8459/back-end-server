const express = require('express');
const { auth } = require('../middleware/auth.middleware');
const { NoteModel } = require('../model/notes.model');
const { User } = require('../model/user.model');
const noteRouter = express.Router();

noteRouter.use(auth);

noteRouter.post('/create', async (req, res) => {
    try {
        const note = new NoteModel(req.body);
        await note.save();
        res.status(200).json({ msg: "Note created successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

noteRouter.get('/', async (req, res) => {
     console.log(req.body.userId);
    try {
        const notes = await NoteModel.find({ username: req.body.username });
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
})

noteRouter.patch('/update/:id', async (req, res) => {

    const { id } = req.params
    const note = await NoteModel.findOne({ _id: id });
    console.log(note, id)
    try {
        if (req.body.userId == note.userId) {
            await NoteModel.findByIdAndUpdate({ _id: id }, req.body);
            res.status(200).json({ msg: "Note updated successfully" });
        } else {
            res.status(400).json({ msg: "You are not authorized to update this note" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }



})

noteRouter.delete('/delete/:id', async (req, res) => {

    const { id } = req.params
    const note = await NoteModel.findOne({ _id: id });
    console.log(note, id)
    try {
        if (req.body.userId == note.userId) {
            await NoteModel.findByIdAndDelete({ _id: id }, req.body);
            res.status(200).json({ msg: "Note deleted successfully" });
        } else {
            res.status(400).json({ msg: "You are not authorized to delete this note" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

})

module.exports = { noteRouter }