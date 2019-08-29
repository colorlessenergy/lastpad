const express = require('express');
const passport = require('passport');

let Router = express.Router();

const userControllers = require('../controllers/user');


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(403).send('not authenticated');
}

Router.route('/login')
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

Router.route('/register')
  .post(userControllers.registerUser)


Router.route('/logout')
  .delete((req, res) => {
    req.logOut();

    return res.sendStatus(200);
  })


module.exports = Router;