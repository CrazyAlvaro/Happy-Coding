/* global it before after describe */
/* eslint padded-blocks: off */
import request from 'supertest-as-promised';
import express from 'express';
import morgan from 'morgan';
import authConfig from '../../../server/authConfig';
import messageToURLParams from '../../../server/messageToURLParams';
import faker from 'faker';
import chai from 'chai';
const expect = chai.expect;

describe('Profile API', () => {

  const qq = faker.helpers.replaceSymbolWithNumber('######');
  const data = {
    realName: faker.internet.userName(),
    username: qq,
    password: faker.internet.password(),
    email: `${qq}@qq.com`,
  };

  let agent;

  before(async () => {
    const app = express();
    app.use(morgan('dev'));
    authConfig(app);
    app.use('*', messageToURLParams);
    agent = request.agent(app);
    await agent
      .post('/auth/signup')
      .send(data)
      .expect(302);
    await agent
      .post('/auth/signin')
      .send(data)
      .expect(302);
  });

  after(async () => {
    await agent
      .post('/auth/signout')
      .expect(302);
  });

  describe('meApi', () => {

    it('should return user object with status 200', async () => {
      const res = await agent
        .get('/auth/me')
        .expect(200);
      expect(res.body.username).to.equal(data.username);
    });

  });

  describe('updateApi', () => {
    it.skip('should', async () => {
      await agent
        .post('/auth/update')
        .send({ username: 'mada' })
        .expect(200);
      await agent
        .post('/auth/update')
        .send({ username: 'madadata' })
        .expect(200);
    });

  });

});
