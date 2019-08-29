const express = require('express');
var app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://lastpad123:lastpad123@ds311968.mlab.com:11968/lastpad', { useNewUrlParser: true, keepAlive: 120 })
  .then(function (res) {
    return console.log('connected');
  })
  .catch(function (err) {
    return console.log(err)
  });

// passport to login a user
const passport = require('passport');
const initializePassport = require('./config/passport-config');

const flash = require('express-flash');
const session = require('express-session');

initializePassport(passport);


app.use(cors());




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(flash())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())




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