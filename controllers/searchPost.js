const User = require('../models/User');

module.exports = async (req, res) => {
  try {
    //Create a RegExp and search for name 'like' case-insensitive
    const regExp = new RegExp(req.body.search, 'i');
    const search = await User.find({ username: regExp }, 'username _id');

    if (search.length > 0) {
      res.json({ user: search });
    } else {
      res.json({ error: 'Blog does not exist.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
