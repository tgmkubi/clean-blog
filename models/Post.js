const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Post title is required.'],
  },
  detail: {
    type: String,
    required: [true, 'Post detail is required.'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
