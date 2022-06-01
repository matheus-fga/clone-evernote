var express = require('express');
var router = express.Router();
const Note = require('../models/note');
const withAuth = require('../middlewares/auth');
const note = require('../models/note');

router.post('/', withAuth, async (req, res) => {
  const { title, body } = req.body;

  try{
    let note = new Note({ title: title, body: body, author: req.user._id });
    await note.save();
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Error to create a new note' })
  }
});

router.get('/search', withAuth, async (req, res) => {
  const { query } = req.query;

  try {
    let notes = await Note.find({ author: req.user._id }).find({ $text: {$search: query } });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    let note = await Note.findById(id);
    if(isOwner(req.user, note))
      res.status(200).json(note);
    else {
      res.status(403).json({ error: "Forbidden: You're not owner of the note" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error to find a note' });
  }
});

router.put('/:id', withAuth, async (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;

  try {
    let noteToUpdate = await Note.findById(id);
    if(isOwner(req.user, noteToUpdate)) {
      let note = await Note.findByIdAndUpdate(id,
        { $set: {title: title, body: body, updated_at: Date.now() }},
        { upsert: true, 'new': true }
      );
      res.status(200).json(note);
    } else
      res.status(403).json({ error: "Forbidden: You're not owner of the note" });
  } catch (error) {
    res.status(500).json({ error: 'Error to update a note' });
  }
});

router.delete('/:id', withAuth, async(req, res) => {
  const { id } = req.params;

  try {
    let noteToDelete = await Note.findById(id);
    if(isOwner(req.user, noteToDelete)) {
      noteToDelete.delete();
      res.status(204).json();
    } else
      res.status(403).json({ error: "Forbidden: You're not owner of the note" });
  } catch (error) {
    res.status(500).json({ error: 'Error to remove a note' });
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
    let notes = await Note.find({ author: req.user._id })
    res.status(200).json(notes)
  } catch (error) {
    res.status(500).json({ error: 'Error to list notes' });
  }
});

const isOwner = (user, note) => {
  return JSON.stringify(user._id) == JSON.stringify(note.author._id) ? true : false
}

module.exports = router;