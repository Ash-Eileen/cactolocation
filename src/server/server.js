const express = require('express');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const passport = require('passport');

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

const dbConn = 'mongodb://127.0.0.1:27017/caculocation_db';
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

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/', pageRouter);
app.use('/dashboard', userRouter);
app.use('/user', authRouter);

const port = process.env.port || 3007;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
