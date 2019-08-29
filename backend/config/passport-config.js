const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/schemas/user'); 

function initialize (passport) {

  const authenticateUser = (email, password, done) => {
    if (typeof email !== 'string')
      return done(null, false, { message: 'missing password' })

    if (typeof password !== 'string')
      return done(null, false, { message: 'missing password' })
    
    console.log(email);

    User.findOne({ email: email }, function (err, user) {

      if (err) return done(err);
      if (!user) return done(null, false, { message: 'no user with that email'});

      user.comparePassword(password, function (err, isMatch) {
        if (err) return done(err);

        if (!isMatch) done(null, false, { message: 'incorrect password'});

        return done(null, user)
      });
    });
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return User.findById(
      id,
      (err, user) => {
        return done(err, user)
      }
    )
   })

}

module.exports = initialize;