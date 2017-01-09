// NOTE: https://strongloop.com/strongblog/node-js-callback-hell-promises-generators/

// Find the largest file within a directory

var findLargest = require('./findLargest')

findLargest('../Learning', function (er, filename) {
  if (er) return console.error(er)
  console.log('largest file was: filename')
})
