var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// require all routes from routes folder
var usersRouter = require('./routes/users');
var authenticationRouter = require('./routes/authentication');
var productsRouter =require('./routes/products');
var ordersRouter =require('./routes/orders')

// database connection
const connect = require("./db/dbConnection");


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set all api
app.use('/', authenticationRouter);
app.use('/users', usersRouter);
app.use('/products',productsRouter);
app.use('/orders',ordersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
