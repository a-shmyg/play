var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('downloads', {layout : 'download_head'});
});

module.exports = router;
