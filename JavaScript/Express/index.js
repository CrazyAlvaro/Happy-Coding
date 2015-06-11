

var express = require('express');
var responseTime = require('response-time')   // Send back a X-Response-Time through response header


var app = express();

// Use responseTime to records the response time for requests in HTTP servers
// The response time is the elapsed time from a request enters this middleware to when
// the headers are written out to the client
app.use(responseTime());

var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

// bound to root path
//app.use(express.static('public'));

// a middleware with no mount path; gets executed for every request to the app
app.use(function(req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// bound to static directory
app.use('/static', express.static('public'));

app.all('/', function (req, res) {
  res.send('Hello World second!');
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// Route handlers
app.get('/example/a', function(req, res) {
  res.send('Hello from A');
});

// handled using a more than one callback function( make sure to specify the next object)
app.get('/example/b', function(req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function(req, res) {
  res.send('Hello from B');
});

// Application level middleware

// any type of HTTP request to /use/:id
app.use('/user/:id', function(req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// handle GET requests to /user/:id
app.get('/user/:id', function(req, res, next) {
  res.send('USER');
});
