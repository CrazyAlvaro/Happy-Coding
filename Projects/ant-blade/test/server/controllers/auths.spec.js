/* global it before describe */
/* eslint padded-blocks: off */
import request from 'supertest-as-promised';
import express from 'express';
import morgan from 'morgan';
import authConfig from '../../../server/authConfig';
import messageToURLParams from '../../../server/messageToURLParams';
import faker from 'faker';

describe('Authentication API', () => {

  let app;

  const qq = faker.helpers.replaceSymbolWithNumber('######');
  const data = {
    realName: faker.internet.userName(),
    username: qq,
    password: faker.internet.password(),
    email: `${qq}@qq.com`,
  };

  before(() => {
    app = express();
    app.use(morgan('dev'));
    authConfig(app);
    app.use('*', messageToURLParams);
  });

  describe('auth.signup api', () => {

    it('invalid inputs, redirected to signup page', async () => {
      const badData = [
        {},
        { username: '' },
        { username: 'username', password: 'password' },
        { username: '', email: 'email@madadata.com' },
        { username: 'username', email: '123' },
      ];
      for (const i of badData) {
        await request(app)
          .post('/auth/signup')
          .send(i)
          .expect(302)
          .expect('Location', /auth\/signup/);
      }
    });

    it('with valid inputs, new user should be created and redirect to index page', async () => {
      await request(app)
        .post('/auth/signup')
        .send(data)
        .expect(302)
        .expect('Location', /\//);
    });

    it('failed and redirect to signup page when user exists', async () => {
      await request(app)
        .post('/auth/signup')
        .send(data)
        .expect(302)
        .expect('Location', /auth\/signup/);
    });
  });

  describe('auth.signin api', () => {

    it('should redirect to signin page when username and password are wrong', async () => {
      const badData = [
        {},
        { username: '', password: 'madadata' },
        { username: 'username', password: 'password' },
        { username: 'madadata', password: '' },
      ];
      for (const i of badData) {
        await request(app)
          .post('/auth/signin')
          .send(i)
          .expect(302)
          .expect('Location', /auth\/signin/);
      }
    });

    it('signin when username and password matches and redirect to index page', async () => {
      await request(app)
        .post('/auth/signin')
        .send(data)
        .expect(302)
        .expect('Location', /\//);
    });

  });

  describe('auth.signout api', () => {

    it('should throw bad request error if user is not signed in', async () => {
      await request(app)
        .post('/auth/signout')
        .expect(302)
        .expect('Location', /auth\/signin/);
    });

    it('should signout when user is signed in', async () => {
      const agent = request.agent(app);
      await agent
        .post('/auth/signin')
        .send(data);
      await agent
        .post('/auth/signout')
        .expect(302)
        .expect('Location', /auth\/signin/);
    });

  });

  describe('change password Api', () => {

    it('should redirect to password page when new password is empty', async () => {

      const emptyData = {
        ...data,
        newPassword: '',
        confirmPassword: '',
      };
      const agent = request.agent(app);

      await agent
        .post('/auth/signin')
        .send(data);

      await agent
        .post('/auth/password')
        .send(emptyData)
        .expect(302)
        .expect('Location', /auth\/password/);
    });

    it('should redirect to password page' +
      ' when new password and confirm password doesn\'t match', async () => {

      const agent = request.agent(app);

      await agent
        .post('/auth/signin')
        .send(data);

      const conflictData = {
        ...data,
        newPassword: 'mada1',
        confirmPassword: 'mada2',
      };

      await agent
        .post('/auth/password')
        .send(conflictData)
        .expect(302)
        .expect('Location', /auth\/password/);
    });

    it('should redirect to profile page when all inputs are valid', async () => {

      const correctData1 = {
        ...data,
        newPassword: 'mada',
        confirmPassword: 'mada',
      };

      const correctData2 = {
        ...data,
        newPassword: 'madadata',
        confirmPassword: 'madadata',
      };

      const agent = request.agent(app);

      await agent
        .post('/auth/signin')
        .send(data);

      await agent
        .post('/auth/password')
        .send(correctData1)
        .expect(302)
        .expect('Location', /auth\/profile/);

      await agent
        .post('/auth/password')
        .send(correctData2)
        .expect(302)
        .expect('Location', /auth\/profile/);
    });

  });

});
