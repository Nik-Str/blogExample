const User = require('../models/User');

module.exports = (req, res) => {
  try {
    let newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });

    newUser.save((err) => {
      if (err) {
        const validationErrors = Object.keys(err.errors).map((key) => err.errors[key].message);
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        res.redirect('/auth/register');
      } else {
        res.redirect('/');
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
