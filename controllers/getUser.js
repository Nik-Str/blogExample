const BlogPost = require('../models/BlogPost');
const User = require('../models/User');

module.exports = async (req, res) => {
  try {
    const userPosts = await BlogPost.find({ userid: req.params.id }).populate('userid');
    const userImage = await User.findById(req.params.id, 'image username');

    res.render('user', {
      userPosts,
      userImage,
    });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
