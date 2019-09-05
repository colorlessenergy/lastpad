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

exports.getNoteById = function (req, res, next) {
  Note
    .findById(req.params.id, function (err, note) {
      if (err) return next(err);

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