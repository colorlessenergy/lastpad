const express = require('express');
var app = express();
const cors = require('cors');
const morgan = require('morgan');

// passport to login a user
const passport = require('passport');
const initializePassport = require('./config/passport-config');

const flash = require('express-flash');
const session = require('express-session');

initializePassport(passport, 
  (id) => { return 'user' });


app.use(cors());
app.use(flash());
app.use(session({
  secret: 'sdfaljfdhsafdsahd',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'))

const authsRouter = require('./routes/authRouter');

app.use('/', authsRouter);


app.listen(3001, function () {
  console.log('listening on port 3001')
});