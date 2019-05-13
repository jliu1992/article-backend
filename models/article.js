const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: String,
  type: String,
  imageUrl: String,
  secret: Boolean,
  content: String,
  _createtime: {
    type: Date,
    default: Date.now,
  },
  _userid: {
    type: String,
    ref: 'user'
  }
}, { collection: 'article' });

module.exports = mongoose.model('article', articleSchema);