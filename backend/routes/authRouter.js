const express = require('express');
const passport = require('passport');

let Router = express.Router();

const userControllers = require('../controllers/user');


Router.route('/login')
  .post(passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: false
  }), function (req, res, next) {
    return res.sendStatus(200);
  })
  .get((req, res) => {
    if (!req.user) {
      return res.status(400).send('Email or password is incorrect');
    }
  });

Router.route('/register')
  .post(userControllers.registerUser)


Router.route('/logout')
  .delete((req, res) => {
    req.logOut();

    return res.sendStatus(200);
  })


module.exports = Router;