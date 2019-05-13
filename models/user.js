const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id : {
		type: String,
		unique: true,
	},
  name : String,
  _createtime : {
		type: Date,
		default: Date.now,
	},
  pass : String,
}, { collection: 'user'});

module.exports = mongoose.model('user', userSchema);