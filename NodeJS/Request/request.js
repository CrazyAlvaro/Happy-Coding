var request = require("request");
var config = require("./config");

request({
  uri: config.uri,
  method: "GET",
  timeout: 10000,
  followRedirect: true,
  maxRedirects: 10
}, function(error, response, body) {
  console.log(JSON.stringify(response));
  console.log(body);
});
