const User = require('../models/User');

module.exports = async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.render('search', {
      allUsers
    });

  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};