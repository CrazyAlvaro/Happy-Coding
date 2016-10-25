const { expect } = require('chai');
const express = require('express');
const morgan = require('morgan');
const router = require('../../../../app/routes/thirdParty/jd');
const request = require('supertest-as-promised');

describe('connector tests', () => {

  describe('jd connector', () => {

    let app;
    let agent;

    before(() => {
      app = express();
      app.use(morgan('dev'));
      app.use('/third-party', router);
      agent = request.agent(app);
    });

    it('should redirect to jd auth page', async () => {
      const res = await agent.get('/third-party/jd/auth').expect(302);
      const { location } = res.header;
      expect(location).to.include('https://oauth.jd.com/oauth/authorize?');
      expect(location).to.include('response_type=code');
      expect(location).to.include('state=CUSTOM_CODE');
    });

  });
});
