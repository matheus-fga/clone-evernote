var express = require('express');
var router = express.Router();
const Note = require('../models/note');
const withAuth = require('../middlewares/auth');

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

const isOwner = (user, note) => {
  return JSON.stringify(user._id) == JSON.stringify(note.author._id) ? true : false
}

module.exports = router;