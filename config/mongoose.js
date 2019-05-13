const mongoose = require('mongoose');
const config = require('./config');
module.exports = ()=>{
  console.log('mongoose');
  mongoose.connect(config.mongodb, { useNewUrlParser: true });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, '连接错误：'));
  db.once('open', (callback) => {
      console.log('MongoDB连接成功！！');
  });
  return db;
}