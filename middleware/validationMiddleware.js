module.exports = (req, res, next) => {
  try {
    if (req.files == null || req.body.title == null || req.body.content == null) {
      const validationErrors = 'Blogpost require both title, body and image.';
      req.flash('validationErrors', validationErrors);
      req.flash('data', req.body);

      return res.redirect('/posts/new');
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
