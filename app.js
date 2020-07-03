Date.prototype.getMonthFormatted = function () {
  var month = this.getMonth() + 1
  return month < 10 ? '0' + month : month
}
Date.prototype.getDateFormatted = function () {
  var date = this.getDate()
  return date < 10 ? '0' + date : date
}
Date.prototype.getHoursFormatted = function () {
  var hours = this.getHours()
  return hours < 10 ? '0' + hours : hours
}
Date.prototype.getMinutesFormatted = function () {
  var minutes = this.getMinutes()
  return minutes < 10 ? '0' + minutes : minutes
}
Date.prototype.getSecondsFormatted = function () {
  var seconds = this.getSeconds()
  return seconds < 10 ? '0' + seconds : seconds
}

var createError = require('http-errors'),
  express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  uid = require('uid-safe'),
  parseurl = require('parseurl'),
  fs = require('fs'),
  favicon = require('serve-favicon'),
  path = require('path'),
  log4js = require('log4js'),
  minify = require('express-minify'),
  compression = require('compression'),
  frameguard = require('frameguard'),
  ms = require('ms'),
  session = require('express-session'),
  FileStore = require('session-file-store')(session),
  loggerO = require('morgan')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ip, geo,
  datetime = new Date(),
  p0rt = 80,
  filePath = `./logs/ip${nbLog}.log`,
  nbLog = datetime.getFullYear() + String(datetime.getMonthFormatted()) + String(datetime.getDate()) + String(datetime.getHoursFormatted()) + String(datetime.getMinutesFormatted()) + String(datetime.getSecondsFormatted()),
  nbUser = 0,
  logger = log4js.getLogger('trace')

//From serverMikael.js


var expressSessionFileStore = FileStore(session),
  sess = {
    genid: function (req) {
      return uid.sync(18)
    },
    store: new FileStore(),
    resave: true,
    saveUninitialized: true,
    secret: 'qwerty',
    cookie: {
      expires: datetime.setUTCFullYear(datetime.getFullYear() + 1),
      maxage: ms('3600 days')
    },
    sessionID: 0,
    horodate: '',
    ip: '',
    geoloc: {},
    pathname: '',
    nbViews: []
  }

//mongoDB
const MongoClient = require('mongodb').MongoClient,
  uri = "mongodb+srv://snow:<password>@cluster0-5cwg1.mongodb.net/<dbname>?retryWrites=true&w=majority",
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
client.connect(err => {
  const collection = client.db("m1k431").collection("brickBreaker")
  // perform actions on the collection object
  //console.log(collection)
  /*collection.insertOne({
    visitorName: 'mika',
    score: '123'
  })*/
  client.close()
})

//APP.LOGGER_________________________________________________________________
log4js.configure({
  appenders: {
    trace: { type: 'file', filename: `logs/ip${nbLog}.log` }
  },
  categories: { default: { appenders: ['trace'], level: 'trace' } }
})

//APP.FS_________________________________________________________________
fs.writeFile(filePath, datetime, (err) => {
  if (err) throw err
  console.log(`The file ${nbLog}.log was succesfully created`)
})

//APP.USE_________________________________________________________________
app.use(favicon(path.join(__dirname, '/public', 'favicon.ico')))
app.use(frameguard({
  action: 'sameorigin'
}))
app.use(compression())
app.use(minify({
  cache: false,
  jsMatch: /javascripts/,
  cssMatch: /stylesheets/
}))
/*app.use('/static', express.static(__dirname + '/public', {
  maxage: '0d'
}))*/

app.use(session(sess))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(loggerO('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;