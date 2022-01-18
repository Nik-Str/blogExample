module.exports = (req, res, next) => {
  try {
    //Controlls all input
    if (req.files == null || req.body.title == null || req.body.content == null) {
      //Individuall made error
      const validationErrors = 'Blogpost require both title, body and image.';
      //'Direct' error to flash
      req.flash('validationErrors', validationErrors);
      //'Direct' req.body to flash
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
