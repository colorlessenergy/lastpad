var User = require('../models/schemas/user');

exports.registerUser = function (req, res, next) {
  
  var user = new User(req.body);

  user.save(function (err, user) {
    if (err) {
      if (err.code === 11000) {
        return res.status(400).send('username is in use');
      }

      return next(err);
    }
    return res.sendStatus(200);
  });
}