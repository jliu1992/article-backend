var express = require('express');
const path = require('path');
var router = express.Router();

var upload = require('../tool/upload');

router.post('/', upload.single('file'), function (req, res, next) {
  const filePath = 'uploads/' + path.basename(req.file.path);
  res.send({ filePath });
});

module.exports = router;
