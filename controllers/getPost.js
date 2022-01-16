const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
  try {
    const blogpost = await BlogPost.findById(req.params.id).populate('userid');
    res.render('post', {
      blogpost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
