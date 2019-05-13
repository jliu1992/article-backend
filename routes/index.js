var express = require('express');
var router = express.Router();


var usersRouter = require('./users');
var articleRouter = require('./article');
var collectionRouter = require('./collection');
var uploadRouter = require('./upload');

router.use('/user', usersRouter);
router.use('/article', articleRouter);
router.use('/collection', collectionRouter);
router.use('/upload', uploadRouter);

module.exports = router;
