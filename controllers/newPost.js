module.exports = (req, res) => {
  try {
    if (req.session.userId) {
      let title = '';
      let content = '';
      const data = req.flash('data')[0];

      if (typeof data != 'undefined') {
        title = data.title;
        content = data.content;
      }

      return res.render('create', {
        errors: req.flash('validationErrors'),
        title: title,
        content: content,
        createPost: true
      });
    } else {
      res.redirect('/auth/login');
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
