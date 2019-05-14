var express = require('express');
var router = express.Router();
var User = require('../models/user');
var session = require('../tool/session');

router.post('/login', function (req, res, next) {
  const { id, pass } = req.body;
  User.findOne({ id, pass })
    .then(user => {
      const { id, name } = user;
      const sessionid = session.generateId(id);
      session.addSessionId(sessionid);
      res.cookie('sessionid', sessionid, { expires: new Date(Date.now() + 900000) });
      res.json({ id, name });
    })
    .catch(err => {
      res.status(401).json({
        name: "UserError",
        code: 00001,
        errmsg: "用户名或密码错误！！！"
      });
    });
});

router.post('/logout', function (req, res, next) {
  const { sessionid } = req.cookies;
  session.deleteSessionId(sessionid);
  res.json({ msg: '登出成功' });
});

router.post('/signup', function (req, res, next) {
  User.create({ ...req.body }, (err, user) => {
    if (err) {
      switch (err.code) {
        case 11000: {
          res.status(400).json({ ...err, errmsg: '该用户ID已注册，请更换ID后重试！！！' });
          break;
        }
        default: {
          res.status(400).json(err);
        }
      }
    } else {
      const { id, name } = user;
      res.json({ id, name });
    }
  });
});

module.exports = router;
