const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let Schema = mongoose.Schema;
let userSchema = new Schema({
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  token: String
});

// methods for validating password
userSchema.methods.comparePassword = function (pw, callback) {
  bcrypt.compare(pw, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

userSchema.pre('save', function (next) {
  let user = this;
  console.log(this);

  if (!user.email) {
    return next(new Error('Missing user email'));
  }
  if (!user.password) {
    return next(new Error('Missing user password'));
  }

  if (!user.isModified('password')) {
    return next();
  }

  // hash pw
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        console.log(err);
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

let User = mongoose.model('User', userSchema);

module.exports = User;