var express = require('express'),
  parseurl = require('parseurl'),
  geoip = require('geoip-lite'),
  router = express.Router(),
  sess = req.session


/* GET home page. */
router.get('/', function (req, res, next) {
  datetime = new Date()
  //VIEWS
  if (!req.session.views) {
    req.session.views = {}
  }
  var pathname = parseurl(req).pathname
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
  //fix UTC+2 hours
  datetime.setUTCHours(datetime.getHours())
  ip = req.connection.remoteAddress
  geo = geoip.lookup(ip)
  sess.horodate = datetime
  sess.ip = ip
  sess.geoloc = geo
  sess.views = req.session.views
  res.render('index', { title: 'index' })
  logger.trace(sess)
  console.log(sess)
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
