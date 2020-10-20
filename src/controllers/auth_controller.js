const UserModel = require('../models/user');
const passport = require('passport');

function registerNew(req, res) {
  res.render('authentication/register');
}

function registerCreate(req, res, next) {
  const newUserHandler = (user) => {
    // Where did we get req.login from?
    req.login(user, (err) => {
      if (err) {
        next(err);
      } else {
        res.redirect('/dashboard');
      }
    });
  };

  const { username, email, password } = req.body;

  UserModel.create({ username, email, password }).then(newUserHandler);
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/');
  });
}

function loginNew(req, res) {
  res.render('authentication/login');
}

function loginCreate(req, res, next) {
  const loginFunc = passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/user/login',
    failureFlash: true,
  });
  loginFunc(req, res, next);
}

module.exports = {
  registerNew,
  registerCreate,
  logout,
  loginNew,
  loginCreate,
};
