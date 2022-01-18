const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
  try {
    const userPosts = await BlogPost.find({userid: req.params.id}).populate('userid');
    res.render('user', {
      userPosts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
