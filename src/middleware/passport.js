const LocalStrategy = require('passport-local');
const passport = require('passport');
const UserModel = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  UserModel.findById(userId)
    .then((user) => done(null, user))
    .catch(done);
});

const canLogin = (user, password) => {
  if (user) {
    return user.verifyPasswordSync(password); // mongoose-bcrypt function
  } else {
    return false;
  }
};

const verifyCallback = (username, password, done) => {
  UserModel.findOne({ username })
    .then((user) => {
      if (canLogin(user, password)) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: 'Username or password incorrect.',
        });
      }
    })
    .catch(done);
};

passport.use(new LocalStrategy(verifyCallback));
