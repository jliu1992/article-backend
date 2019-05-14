var express = require('express');
var router = express.Router();
var Collection = require('../models/collection');

router.get("/", (req, res) => {
  const { userid } = req.headers;
  Collection.find({ _userid: userid })
    .populate('_articleid').exec(function (err, articles) {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json(articles);
      }
    });
});

router.get('/:id', function (req, res, next) {
  Collection.findById(req.params.id)
    .then(collection => {
      res.json(collection);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete('/:id', function (req, res, next) {
  const { userid } = req.headers;
  Collection.findOneAndDelete({ _id: req.params.id })
    .then(collection => {
      res.json(collection);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  const { userid } = req.headers;
  Collection.find({ ...req.body, _userid: userid }, (err, collections) => {
    if (err) {
      res.status(400).json(err);
    } else {
      if (collections.length > 0) {
        res.status(400).json({
          name: "DBError",
          code: 00001,
          errmsg: "不能重复收藏！！！"
        })
      } else {
        Collection.create({ ...req.body, _userid: userid }, (err, collection) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.json(collection);
          }
        });
      }
    }
  });
});

module.exports = router;
