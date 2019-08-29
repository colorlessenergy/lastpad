const express = require('express');
const passport = require('passport');

let Router = express.Router();

const userControllers = require('../controllers/user');

// use this to authenticate routes
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(403).send('forbidden');
}

Router.route('/login')
  .post(passport.authenticate('local', {
    failureRedirect: '/loginerror',
    failureFlash: true
  }), function (req, res, next) {
    console.log('response', res);
    return res.sendStatus(200);
  });

Router.route('/loginerror')
  .get((req, res) => {
    console.log('LOGIN ERROR')
    console.log('LOGIN ERROR')
    console.log('LOGIN ERROR')
    console.log('LOGIN ERROR')
    console.log('LOGIN ERROR')
    console.log(req.flash('messages'));

    console.log('messages')
    console.log('messages')
    console.log('messages')
    console.log('messages')
    console.log('messages')
    console.log('messages')
    return res.sendStatus(400);
  })

Router.route('/register')
  .post(userControllers.registerUser)


Router.route('/logout')
  .delete((req, res) => {
    req.logOut();

    return res.sendStatus(200);
  })


module.exports = Router;