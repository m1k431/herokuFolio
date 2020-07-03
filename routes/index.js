var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'index' })
  res.end()
})

router.get('/cv', function (req, res, next) {
  res.render('cv', { title: 'cv' })
  res.end()
})

router.get('/aL1v3', function (req, res, next) {
  res.render('aL1v3', { title: 'al1ve' })
  res.end()
})

router.get('/giftedADHD', function (req, res, next) {
  res.render('giftedADHD', { title: 'adhd' })
  res.end()
})

module.exports = router
