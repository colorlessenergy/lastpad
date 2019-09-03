var User = require('../models/schemas/user');
var Note = require('../models/schemas/note');

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
      user.stories.push(note._id);

      user.save(function (err) {
        if (err) return next(err);
        return res.send('created note').status(200);
      });
    });
  });
}