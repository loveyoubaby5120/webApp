var express = require('express');
var React = require('react');
var Hello = React.createFactory(require('../public/js/index.js').HelloWord);
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var Hello = React.randerToString(Hell({}));
  res.render('index', { Hello: Hello });
});

module.exports = router;
