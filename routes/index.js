var express = require('express'),
  parseurl = require('parseurl'),
  router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  datetime = new Date()
  if (!req.session.views) {
    req.session.views = {}
  }
  var pathname = parseurl(req).pathname
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
  //fix UTC+2 hours
  datetime.setUTCHours(datetime.getHours())
  ip = req.connection.remoteAddress
  geo = geoip.lookup(ip)
  req.session.horodate = datetime
  req.session.ip = ip
  req.session.geoloc = geo
  res.render('index', { title: 'index' })
  //LOGGER
  logger.trace(req.session)
  console.log(req.session)
})

router.get('/cv', function (req, res, next) {
  res.render('cv', { title: 'cv' })
})

router.get('/aL1v3', function (req, res, next) {
  res.render('aL1v3', { title: 'al1ve' })
})

router.get('/giftedADHD', function (req, res, next) {
  res.render('giftedADHD', { title: 'adhd' })
})

module.exports = router
