var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.session.name);
  res.render('main', {layout : 'index_head'});
});

//export the module to use in index.js
module.exports = router;
