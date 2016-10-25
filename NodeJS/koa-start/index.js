/* jshint ignore: start */
var koa = require('koa');
var app = koa();

/**
 *  Cascading style
 */

// x-response-time

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// response

app.use(function *(){
  this.body = 'Hello World';
});

// context
app.user(function *(){
  this; // is the Conetxt
  this.request; // is a koa request
  this.response; // is a koa response
});

// ctx.throw
this.throw('name required', 400);

// ==

var err = new Error('name required');
err.status = 400;
throw err;


// error handling
app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});

app.listen(3000);
