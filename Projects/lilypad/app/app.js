// vendors
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const path = require('path');
const ensureLogin = require('./routes/middlewares/ensureLogin');
const preloadData = require('./routes/middlewares/preloadData');
const preloadUserProfile = require('./routes/middlewares/preloadUserProfile');
// init leancloud
require('./initLeanCloud')();
// test data
// const links = require('./testHomePageData.js');
// modules
const routes = require('./routes');
// app
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(helmet());
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use('/static', express.static(path.join(__dirname, '..', 'public')));

// routes
app.use('/organizations', routes.organizations);
app.use('/users', routes.users);
// TODO:
// turbine and query will be put after auth middlewares later
// this is only for tests
app.use('/api', routes.api);
app.use('/query', routes.query);
app.use(ensureLogin);
app.use(preloadData);
app.use(preloadUserProfile);
app.use('/boards', routes.boards);
app.use('/third-party', routes.thirdParty.jd);
app.use('/datacenter', routes.datacenter);
app.use('/', routes.home);

module.exports = app;
