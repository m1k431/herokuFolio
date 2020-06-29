var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cv', function(req, res, next) {
  res.render('cv', { title: 'Express' });
});

router.get('/aL1v3', function(req, res, next) {
  res.render('aL1v3', { title: 'Express' });
});

router.get('/giftedADHD', function(req, res, next) {
  res.render('giftedADHD', { title: 'Express' });
});

module.exports = router;
