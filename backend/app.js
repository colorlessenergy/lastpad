const express = require('express');
var app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const config = require('./config/config')

mongoose.connect(config.MONGO_DB, { useNewUrlParser: true, keepAlive: 120 })
  .then(function (res) {
    return console.log('connected');
  })
  .catch(function (err) {
    return console.log(err)
  });

// passport to login a user
const passport = require('passport');
const initializePassport = require('./config/passport-config');

const session = require('express-session');

// Configure Express application.
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);

app.use(express.static(path.join(__dirname, '../frontend/build')));


const authsRouter = require('./routes/authRouter');

app.use('/', authsRouter);

// error handler
app.use(function (err, req, res, next) {
  console.log(err)
  res.status(err.status || 500).send();
});

app.listen(3001, function () {
  console.log('listening on port 3001')
});