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
    creator: req.user._id
  });

  note.save(function (err, note) {
    if (err) next(err);

    User.findById(req.user._id, function (err, user) {
      if (err) return next(err);
      user.notes.push(note._id);

      user.save(function (err) {
        if (err) return next(err);
        return res.send('created note').status(200);
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
      user.notes.splice(user.notes.indexOf(note._id), 1);

      user.save(function (err, user) {
        if (err) return next(err);

        return res.status(200).send('note deleted');
      });
    });
  });
}