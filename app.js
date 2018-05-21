var express = require('express');
var path = require('path');

var logger = require('morgan');

var bodyParser = require('body-parser');

const jwtMiddleware = require('express-jwt')

const allowCORs = require('./middlewares/allowCORS')()

var db = require("./config/database.js");

db.connect();


var dashboards = require('./routes/dashboards');
var users = require('./routes/users');
var sessions = require('./routes/sessions');
var lists = require('./routes/lists')
var tasks = require('./routes/tasks')

var app = express();



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(allowCORs.unless({path:'/public'}))

app.use(jwtMiddleware({secret:'dfhwgfreufewhfgdhgrehgehgrmenteehrhg'})

  .unless({path:['/sessions','/users'], method:['OPTIONS']})

)
app.use('/dashboards', dashboards)
app.use('/users', users);
app.use('/sessions', sessions);
app.use('/lists',lists);
app.use('/tasks',tasks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
