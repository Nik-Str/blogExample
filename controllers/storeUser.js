const User = require('../models/User');
const path = require('path');

module.exports = (req, res) => {
  try {
    let image = req.files.image;
    //Moves img to folder
    image.mv(path.resolve(__dirname, '../public/img/', image.name));

    //Save new user
    let newUser = new User({
      username: req.body.username,
      password: req.body.password,
      image: '/img/' + image.name,
    });

    newUser.save((err) => {
      if (err) {
        //Error message from mongoDB
        const validationErrors = Object.keys(err.errors).map((key) => err.errors[key].message);
        //'Direct' error to flash
        req.flash('validationErrors', validationErrors);
        //'Direct' req.body to flash
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
