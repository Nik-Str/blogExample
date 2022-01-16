const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blogpost require title.'],
    },
    body: {
      type: String,
      required: [true, 'Blogpost require body.'],
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    image: {
      type: String,
      required: [true, 'Blogpost require image.'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('blogpost', BlogPostSchema);
