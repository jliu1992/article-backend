const mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

const collectionSchema = mongoose.Schema({
  _userid: {
    type: String,
    ref: 'user'
  },
  _articleid: {
    type: ObjectId,
    ref: 'article'
  },
  _createtime: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'collection' });

module.exports = mongoose.model('collection', collectionSchema);