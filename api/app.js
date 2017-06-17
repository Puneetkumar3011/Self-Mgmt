var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/** routes definition */
var taskRoutes = require('./routes/task/app');

var app = express();
mongoose.connect('localhost:27017/self-mgmt');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
app.use('/api/task', taskRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.send('page not found...');
});

app.listen(3000, function () {
  console.log('self-mgmt listening on port 3000!')
})


module.exports = app;
