const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
  try {
    const allPosts = await BlogPost.find({}).populate('userid');
    res.render('index', {
      allPosts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
