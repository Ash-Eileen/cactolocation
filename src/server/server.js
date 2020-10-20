const express = require('express');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const mongoose = require('mongoose');
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const passport = require('passport');
require('dotenv').config();

const userRouter = require('./../routes/users_routes');
const pageRouter = require('./../routes/pages_routes');
const authRouter = require('./../routes/auth_routes');

const app = express();

app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { expires: 600000 },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

require('../middleware/passport');
app.use(passport.initialize());
app.use(passport.session());

const dbConn = process.env.MONGODB_URI || 'mongodb://localhost/caculocation_db';
mongoose.connect(
  dbConn,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log('Error connecting to database', err);
    } else {
      console.log('Connected to database!');
    }
  }
);

app.get('*', function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

app.engine(
  'handlebars',
  expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use('/', pageRouter);
app.use('/dashboard', userRouter);
app.use('/user', authRouter);

const port = process.env.PORT || 3007;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
