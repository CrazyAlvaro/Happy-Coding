import 'babel-polyfill';
import path from 'path';
import tableList from './tableList';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import proxy from 'http-proxy-middleware';
import authConfig from './authConfig';
import winston from 'winston';
import messageToURLParams from './messageToURLParams';
import packageInfo from '../package.json';
import favicon from 'serve-favicon';
// for dev
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(helmet());
app.use(favicon(path.join(__dirname, '..', 'favicon.ico')));
app.use('/static', express.static(path.join(__dirname, '..', 'dist')));
app.use('/data', express.static(path.join(__dirname, '..', 'data')));

const apiHost = process.env.API_HOST || 'localhost';
const apiPort = process.env.API_PORT || 3001;
const apiUrl = `http://${apiHost}:${apiPort}`;
app.use('/api', proxy({
  target: apiUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/',
  },
}));
winston.log('API forwarding to', apiUrl);

const etlHost = process.env.ETL_HOST || 'localhost';
const etlPort = process.env.ETL_PORT || 5000;
const etlUrl = `http://${etlHost}:${etlPort}`;
app.use('/etl', proxy({
  target: etlUrl,
  changeOrigin: true,
  pathRewrite: {
    '^etl': '/etl',
  },
}));

authConfig(app);

// TODO - remove these
app.get('/tableList', (req, res) => {
  res.json(tableList);
});

app.get('/version', (req, res) => {
  res.json({
    version: packageInfo.version,
    NODE_ENV: process.env.NODE_ENV,
  });
});

app.get('*', messageToURLParams);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, err => {
  if (err) {
    winston.error(err);
    return;
  }
  winston.info(`listening at ${host}:${port}`);
});
