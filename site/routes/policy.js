var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  console.log("getting page");
  res.render('policy', {layout : 'policy_head'});
});

module.exports = router;
