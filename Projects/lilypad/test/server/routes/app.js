const express = require('express');
const bodyParser = require('body-parser');

function startTestServer(route) {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/', route);
  app.listen(3000, '0.0.0.0');
}

module.exports = startTestServer;
