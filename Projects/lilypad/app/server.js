const app = require('./app');
const winston = require('winston');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, err => {
  if (err) {
    winston.error(err);
    return;
  }
  winston.info(`listening at ${host}:${port}`);
});
