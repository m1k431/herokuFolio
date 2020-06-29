var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

let datetime = new Date(),
  p0rt = 80,
  filePath = `./logs/ip${nbLog}.log`,
  nbUser = 0,
  logger = log4js.getLogger('trace')

var nbLog = datetime.getFullYear() + String(datetime.getMonthFormatted()) + String(datetime.getDate()) + String(datetime.getHoursFormatted()) + String(datetime.getMinutesFormatted()) + String(datetime.getSecondsFormatted()),
  ip, geo,
  expressSessionFileStore = FileStore(session),
  sess = {
    genid: function (req) {
      return uid.sync(18)
    },
    store: new FileStore,
    resave: true,
    saveUninitialized: true,
    secret: 'qwerty',
    cookie: {
      expires: datetime.setUTCFullYear(datetime.getFullYear() + 1),
      maxage: datetime.setUTCFullYear(datetime.getFullYear() + 1)
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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
