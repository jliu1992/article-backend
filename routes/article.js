var express = require('express');
var router = express.Router();

var Article = require('../models/article');

router.get("/", (req, res) => {
  Article.find({ secret: false })
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
  Article.find({ _userid: userid })
    .sort({ update_at: -1 })
    .then(articles => {
      res.json(articles);
    })
    .catch(err => {
      res.json(err);
    });
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
  Article.findOneAndDelete({ _id: req.params.id })
    .then(article => {
      res.json(article);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  const { userid } = req.headers;
  Article.create({ ...req.body, _userid: userid }, (err, article) => {
    if (err) {
      res.json(err);
    } else {
      res.json(article);
    }
  });
});

router.put("/:id", (req, res) => {
  Article.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        ...req.body
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
