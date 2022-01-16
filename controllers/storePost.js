const BlogPost = require('../models/BlogPost');
const path = require('path');

module.exports = async (req, res) => {
  try {
    let image = req.files.image;
    //filerna borde få individuella namn, kanske cryptera är enklast?
    image.mv(path.resolve(__dirname, '../public/img/', image.name));

    let newBlogPost = new BlogPost({
      title: req.body.title,
      body: req.body.content,
      image: '/img/' + image.name,
      userid: req.session.userId
    });

    await newBlogPost.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
