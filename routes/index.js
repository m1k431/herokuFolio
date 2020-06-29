var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  nbUser++
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
  req.session.sessionID = req.sessionID
  req.session.horodate = datetime
  req.session.ip = ip
  req.session.geoloc = geo
  res.render('index', { title: 'Express' });
  //LOGGER
  logger.trace(req.session)
  console.log(req.session)
});

router.get('/cv', function (req, res, next) {
  //VIEWS
  pathname = parseurl(req).pathname
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
  if (req.query.r == 'highScore') {
    //AJax
  }
  res.render('cv', { title: 'Express' });
  logger.trace(pathname + ': ' + req.session.views[pathname])
  console.log(pathname + ': ' + req.session.views[pathname])
});

router.get('/aL1v3', function (req, res, next) {
  //VIEWS
  pathname = parseurl(req).pathname
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
  if (req.query.r == 'highScore') {
    //AJax
  }
  res.render('aL1v3', { title: 'Express' });
  logger.trace(pathname + ': ' + req.session.views[pathname])
  console.log(pathname + ': ' + req.session.views[pathname])
});

router.get('/giftedADHD', function (req, res, next) {
  //VIEWS
  pathname = parseurl(req).pathname
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
  if (req.query.r == 'highScore') {
    //AJax
  }
  res.render('giftedADHD', { title: 'Express' });
  logger.trace(pathname + ': ' + req.session.views[pathname])
  console.log(pathname + ': ' + req.session.views[pathname])
});

module.exports = router;
