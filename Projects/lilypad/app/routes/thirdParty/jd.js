const { CONNECTOR_JD } = require('../../constants/thirdParty');
const { constructURL } = require('../utils/thirdPartyUtils');
const { responseErrorHandler } = require('../utils/responseUtils');
const express = require('express');
const winston = require('winston');
const router = express.Router();
const fetch = require('isomorphic-fetch');

router.get('/jd/auth', (req, res) => {
  // const homeUrl = `${req.protocol}://${req.get('host')}`;
  // const redirectURL = `${homeUrl}/third-party/jd/token`;
  const redirectURL = 'http://127.0.0.1:3000/datacenter';

  const params = {
    response_type: 'code',
    client_id: process.env.JD_APP_KEY,
    redirect_uri: redirectURL,
    state: 'CUSTOM_CODE',
  };
  winston.log(redirectURL);
  res.redirect(constructURL(CONNECTOR_JD.AUTH_BASE_URL, params));
});

router.get('/jd/token', async (req, res) => {
  // https://www.madadata.com/?state=CUSTOM_CODE&code=7T8aU9
  const { code, error } = req.query;
  // User denied to grant access
  if (error) {
    winston.error('jd access denied');
    res.status(400).send(error);
  } else {
    const { JD_APP_KEY, JD_APP_SECRET } = process.env;
    // const homeUrl = `${req.protocol}://${req.get('host')}`;
    // const redirectURL = `${homeUrl}/third-party/jd/token`;
    const redirectURL = 'http://127.0.0.1:3000/datacenter';
    const params = {
      code,
      grant_type: 'authorization_code',
      client_id: JD_APP_KEY,
      client_secret: JD_APP_SECRET,
      scope: 'read',
      redirect_uri: redirectURL,
      state: '1234',
    };
    winston.log(redirectURL);
    const tokenURL = constructURL(CONNECTOR_JD.TOKEN_BASE_URL, params);
    try {
      const resp = await fetch(tokenURL, { method: 'POST' });
      responseErrorHandler(resp.status, 400, 'bad request');
      const sessionInfo = await resp.json();
      responseErrorHandler(sessionInfo.code, 402, 'failed to get access token');
      const { access_token: accessToken, refresh_token: refreshToken } = sessionInfo;
      winston.info(`token: ${accessToken} refreshToken: ${refreshToken}`);
      res.send(sessionInfo);
    } catch (err) {
      winston.error(err);
      res.status(500).send(err);
    }
  }
});

module.exports = router;
