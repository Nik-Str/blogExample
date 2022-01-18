module.exports = (req, res) => {
  let username = '';
  let password = '';

  //If 'controllers/storeUser' flash error => res: req.body & error
  const data = req.flash('data')[0];

  if (typeof data != 'undefined') {
    username = data.username;
    password = data.password;
  }

  res.render('register', {
    errors: req.flash('validationErrors'),
    username: username,
    password: password,
  });
};
