var express = require('express');
var router = express.Router();

var Article = require('../models/article');

router.get("/", (req, res) => {
  Article.find({secret: false})
    .sort({ update_at: -1 })
    .then(articles => {
      res.json(articles);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/myarticles", (req, res) => {
  const { userid } = req.headers;
  if (userid) {
    Article.find({ _userid: userid })
      .sort({ update_at: -1 })
      .then(articles => {
        res.json(articles);
      })
      .catch(err => {
        res.json(err);
      });
  } else {
    res.status(401).json({
      name: "UserError",
      code: 00001,
      errmsg: "鉴权失败！！！"
    })
  }
});

router.get('/:id', function (req, res, next) {
  Article.findById(req.params.id)
    .then(article => {
      res.json(article);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete('/:id', function (req, res, next) {
  const { userid } = req.headers;
  if (userid) {
    Article.findOneAndDelete({ _id: req.params.id })
      .then(article => {
        res.json(article);
      })
      .catch(err => {
        res.json(err);
      });
  } else {
    res.status(401).json({
      name: "UserError",
      code: 00001,
      errmsg: "鉴权失败！！！"
    })
  }
});

router.post("/", (req, res) => {
  const { userid } = req.headers;
  if (userid) {
    Article.create({ ...req.body, _userid: userid }, (err, article) => {
      if (err) {
        res.json(err);
      } else {
        res.json(article);
      }
    });
  } else {
    res.status(401).json({
      name: "UserError",
      code: 00001,
      errmsg: "鉴权失败！！！"
    })
  }
});

router.put("/:id", (req, res) => {
  Article.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        content: req.body.content,
        time: req.body.time,
        _userid: req.body._userid,
      }
    },
    {
      new: true
    }
  )
    .then(article => res.json(article))
    .catch(err => res.json(err));
});

module.exports = router;
