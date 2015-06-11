// Load the fs (filesystem) module
var fs = require('fs');

// Read the contents of the file into memory
fs.readFile('example_log.txt', function (error, logData) {
  if(error) throw error;
  var text = logData.toString();
});


