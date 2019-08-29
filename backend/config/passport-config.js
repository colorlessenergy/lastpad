const LocalStrategy = require('passport-local').Strategy;
 
function initialize (passport) {

  // where you would do checking if the user credentials are correct

  const authenticateUser = (email, password, done) => {
    done(null, { username: 'hello', password: 'hello' }, { message: 'test'});
    return res.sendStatus(200);
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
   })

}

module.exports = initialize;