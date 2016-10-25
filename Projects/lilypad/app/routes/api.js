/* eslint-disable no-unused-vars */
const {
  getCardMetadataQueryString,
  getBoardMetadataQueryString,
} = require('./utils/graphqlUtils');
const {
  TURBINE_METADATA_API,
  HEADERS,
} = require('../constants/urls');
const { Url } = require('url');
const { buildSql } = require('./utils/queryUtils/queryBuilders');
const express = require('express');
const fetch = require('isomorphic-fetch');
const fakeCardMetadata = require('./fakeData/cardMetadata');
const fakeBoardMetadata = require('./fakeData/boardMetadata');
const fakeCardData = require('./fakeData/cardData');

const router = express.Router();

function getUrlConstructor(qs) {
  const urlConstructor = new Url();
  urlConstructor.protocol = 'http:';
  urlConstructor.host = TURBINE_METADATA_API;
  urlConstructor.query = { query: qs };
  return urlConstructor;
}

// TODO:
// match :id with proper regex
router
  .get('/metadata/cards/:id', async (req, res) => {
    const { id } = req.params;
    // const urlConstructor = getUrlConstructor(getCardMetadataQueryString(id));
    // const response = await fetch(urlConstructor.format(), {
    //   method: 'GET',
    //   headers: {
    //     Accept: HEADERS.APPICATION_JSON,
    //     host: HEADERS.TURBINE_META_API,
    //   },
    // });
    // const data = await response.json();
    // res.json(data);

    // send fake data for now
    res.set('Access-Control-Allow-Origin', '*');
    res.json(fakeCardMetadata.find(datum => datum.id === id));
  })
  .get('/metadata/boards/:id', async (req, res) => {
    const { id } = req.params;
    const urlConstructor = getUrlConstructor(getBoardMetadataQueryString(id));
    // const response = await fetch(urlConstructor.format(), {
    //   method: 'GET',
    //   headers: {
    //     Accept: HEADERS.APPICATION_JSON,
    //     host: HEADERS.TURBINE_META_API,
    //   },
    // });
    // const data = await response.json();
    // res.json(data);

    // send fake data for now
    res.set('Access-Control-Allow-Origin', '*');
    res.json(fakeBoardMetadata.find(datum => datum.id === id));
  });

router
  .get('/data', (req, res) => {
    const { type, payload } = req.query;
    const sql = buildSql(type, JSON.parse(payload));
    // TODO:
    // talk to turbine-sql-api
    res.set('Access-Control-Allow-Origin', '*');
    res.json(fakeCardData);
  });

module.exports = router;
