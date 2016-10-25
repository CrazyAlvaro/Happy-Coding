const express = require('express');
const router = express.Router();
// load fake data
const fakeDatasets = require('./fakeData/datacenter-authentication-data');
const fakeCredentials = require('./fakeData/datacenter-credentials-data');
const fakeConnectors = require('./fakeData/datacenter-connectors-data');
const fakeTables = require('./fakeData/datacenter-tables-data');
import {
  DATACENTER_CONNECTORS_URL,
  DATACENTER_GENERATE_DATASOURCE_URL,
  DATACENTER_MAIN_URL,
} from '../constants/urls';

router.get('/', (req, res) => {
  res.render('pages/datacenter/datacenter.pug', {
    user: req.user,
    links: req.links,
    DATACENTER_MAIN_URL,
  });
});

router.get('/connectors', (req, res) => {
  res.render('pages/datacenter/connectors.pug', {
    user: req.user,
    links: req.links,
    DATACENTER_CONNECTORS_URL,
  });
});

router.get('/generate-datasource', (req, res) => {
  res.render('pages/datacenter/generate-datasource.pug', {
    user: req.user,
    links: req.links,
    DATACENTER_GENERATE_DATASOURCE_URL,
  });
});

router.get('/api/datasources', (req, res) => {
  // TODO: this should be an api call to connector
  res.json(fakeDatasets);
});

router.get('/api/connectors', (req, res) => {
  // TODO: this should be an api call to connector
  res.json(fakeConnectors);
});

router.get('/api/:credentials/tables', (req, res) => {
  // TODO: this should be an api call to connector
  res.json(fakeTables);
});

router.get('/api/credentials', (req, res) => {
  // TODO: this should be an api call to connector
  res.json(fakeCredentials);
});

module.exports = router;
