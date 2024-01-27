var express = require('express');
var router = express.Router();
var Flight = require('../model/flights');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/flights');
});

module.exports = router;
