var User = require('../models/schemas/user');
var Note = require('../models/schemas/note');

/**
 * get a user's notes
 *
 * @param {String} req.user._id - user id
 */
exports.getNotes = function (req, res, next) {
  User
    .findById(req.user._id)
    .populate('notes')
    .exec(function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send('No user with that ID');
      }

      return res.json(user.notes);
    });
}

/**
 * get a single note from a user
 *
 * @param {String} req.params.id - the note id
 */

exports.getNoteById = function (req, res, next) {
  Note
    .findById(req.params.id, function (err, note) {
      if (err) return next(err);
      if (!note) return res.sendStatus(404);

      return res.json(note);
    });
}

/**
 * create a note and pass a reference to that note in the user model
 * pass a reference of the user to the note
 * 
 * @param {String} req.body.title - user created content title
 * @param {String} req.body.content - user created content about the note
 */

exports.createNote = function (req, res, next) {
  let note = new Note({
    content: req.body.content,
    title: req.body.title,
    creator: req.user._id,
    createdAt: new Date()
  });

  note.save(function (err, note) {
    if (err) next(err);

    User.findById(req.user._id, function (err, user) {
      if (err) return next(err);
      user.notes.push(note._id);

      user.save(function (err) {
        if (err) return next(err);
        return res.json(note);
      });
    });
  });
}

/**
 * delete a note from the note collection by using the note id passed by the url
 * remove the reference from the user
 *
 * @param {String} req.params.id - id of the note
 */

exports.deleteNoteById = function (req, res, next) {
  Note.findByIdAndDelete(req.params.id, function (err, note) {
    if (err) return next(err);
    if (!note) return res.status(404).send('note does not exist');

    User.findById(req.user._id, function (err, user) {
      if (err) return next(err);
      if (!user) return res.status(404).send('user does not exist');

      let deletedNoteIndex = user.notes.indexOf(note._id);
      let deletedNoteId = user.notes[deletedNoteIndex];

      user.notes.splice(user.notes.indexOf(note._id), 1);

      user.save(function (err, user) {
        if (err) return next(err);

        return res.json(deletedNoteId);
      });
    });
  });
}


/**
 * find the user note in the collection and upate it depending
 * on what the user submits
 *
 * @param {String} req.body.title - new title of the note
 * @param {String} req.body.content - new content of the note
 */

exports.updateNoteById = function (req, res, next) {
  Note.findById(req.params.id, function (err, note) {
    if (err) return next(err);
    if (!note) return res.status(404).send('note does not exist');

    if (note.lastSaved.getTime() < new Date(req.body.lastSaved).getTime()) {
      note.title = req.body.title;
      note.content = req.body.content;
      note.lastSaved = new Date(req.body.lastSaved);
      
      note.save(function (err, note) {
        if (err) return next (err);
        return res.sendStatus(200);
      });

    } else {
      return res.sendStatus(200);
    }
  });
}