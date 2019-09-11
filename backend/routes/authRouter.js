const express = require('express');
const passport = require('passport');

let Router = express.Router();

const userControllers = require('../controllers/user');


Router.route('/login')
  .post(passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: false
  }), function (req, res, next) {
    console.log(req.user, 'login succesful');
    return res.sendStatus(200);
  })
  .get((req, res) => {
    console.log(req.user, 'login unsucessful');
    if (!req.user) {
      return res.status(400).send('Email or password is incorrect');
    }
  });

/**
 * Route to check if the user is login to do redirecting on initial page
 * laod
 */

Router.route('/userislogin')
  .get(function (req, res, next) {
    console.log(req.user)
    if (req.user) {
      return res.sendStatus(200);
    }

    return res.sendStatus(403);
  });

Router.route('/register')
  .post(userControllers.registerUser)


Router.route('/logout')
  .delete((req, res) => {
    req.logOut();

    return res.sendStatus(200);
  })


module.exports = Router;