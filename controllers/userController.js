const User = require('../models/user');
const logger = require('../utils/logger');

exports.showLoginPage = (req, res) => {
  res.render('login', { title: 'Login/Register' });
};

exports.showRegisterPage = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  User.authenticate(username, password, (err, user) => {
    if (err || !user) {
      res.redirect('/login');
    } else {
      req.session.user = user;
      res.redirect('/');
    }
  });
};

exports.register = (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.redirect('/login');
    }
  });
};

exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render('users', { title: 'Users', users: users });
    }
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
