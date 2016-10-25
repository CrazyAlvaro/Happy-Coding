const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');
const buildSql = require('./utils/queryUtils/queryBuilders').buildSql;

// http://0.0.0.0:3000/query/data now is just a fake server
// will be replaced by turbine later
const DATA_URL = 'http://0.0.0.0:3000/query/data';

// this is a fake server for test. will be removed later
router.post('/data', (req, res) => {
  const { sql } = req.body;
  let data;
  if (sql.includes('select')) {
    data = [{ x: 1, y: 1 }];
  }
  res.json(data);
});

router.post('/', async (req, res) => {
  const { type, payload } = req.body;
  const sql = buildSql(type, JSON.parse(payload));
  const resp = await fetch(DATA_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql }),
  });
  const data = await resp.json();
  res.json(data);
});

// TODO
// this is only for testing purpose
// will be remove later
router.post('/getSql', (req, res) => {
  const { type, payload } = req.body;
  const sql = buildSql(type, JSON.parse(payload));
  res.send(sql);
});

module.exports = router;
