const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
  try {
    const { username, password } = req.body;
    User.findOne({ username: username }, (err, user) => {
      if (err) throw err;
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (err) throw err;
          if (same) {
            req.session.userId = user._id;
            res.redirect('/');
          } else {
            const validationErrors = 'Password is incorrect.';
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
            res.redirect('/auth/login');
          }
        });
      } else {
        const validationErrors = 'Username does not exist.';
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        res.redirect('/auth/login');
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
