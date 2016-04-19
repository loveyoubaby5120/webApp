var express = require('express');
var React = require('../public/lib/react/react-with-addons.min.js');
var Hello = React.createFactory(require('../public/js/index.js').HelloWord);
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var Hello = React
  res.render('index', { Hello: HelloWord });
});

module.exports = router;
