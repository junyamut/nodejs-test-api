var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var index = require('./routes/index');
var Hashmaps = require('./routes/Hashmaps');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/api', index);
app.use('/api/Store', index);
app.use('/api/Store/object', Hashmaps);
// catch 404 and forward to error handler
app.use(function(request, response, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function(err, request, response, next) {
    // set locals, only providing error in development
    response.locals.message = err.message;
    response.locals.error = request.app.get('env') === 'development' ? err : {};
    // render the error page
    response.status(err.status || 500);
    response.render('error');
});
module.exports = app;