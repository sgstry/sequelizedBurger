var express = require('express');
var db = require('../models');

var router = express.Router();

router.get("/index", function(req, res) {
  db.Burger.findAll({}).then(function(results) {
    var obj = {
      burgers: results
    };
    res.render("index", obj);
  })
});

router.put("/:id", function(req, res) {
  db.Burger.update({
      devoured: true,
    }, {
    where: {
      id: {
        $eq: req.params.id
      }
    }
  }).then(function(data) {
    res.redirect("/index");
  });
});

router.post("/", function(req, res) {
  db.Burger.create({
      burger_name: req.body.burger_name
    }).then(function(data) {
      res.redirect("/index");
    });
});

module.exports = router;