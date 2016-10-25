const { expect } = require('chai');
const express = require('express');
const morgan = require('morgan');
const faker = require('faker');
const request = require('supertest-as-promised');

describe('users api tests', () => {
  let app;
  let agent;
  let fixture;

  before(() => {
    app = require('../../../app/app');
    app.listen(3000);
    agent = request.agent(app);
    fixture = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      phone: faker.phone.phoneNumber('13#########'),
      email: faker.internet.email(),
    };
  });

  it('should fail in logining if the user is not registered', async () => {
    const { username, password } = fixture;
    await agent
      .post('/users/login')
      .send({ username, password })
      .expect(302)
      .expect('location', /users\/login/);
  });

  it('should return null post to /users/me if not registered', async () => {
    await agent
      .get('/users/me')
      .expect(401);
  });

  it('should fail to signup if password is not equal to confirm', async () => {
    const { username, password, phone, email } = fixture;
    const confirm = faker.internet.password();
    await agent
      .post('/users/signup')
      .send({ username, password, phone, email, confirm })
      .expect(302)
      .expect('location', /users\/signup/);
  });

  it('should allow you to signup', async () => {
    const { username, password, phone, email } = fixture;
    const confirm = password;
    await agent
      .post('/users/signup')
      .send({ username, password, phone, email, confirm })
      .expect(302)
      .expect('location', /\//)
      .expect('set-cookie', /sessionToken/);
  });

  it('should allow you to get userinfo when posting to /users/me', async () => {
    const { username, email, phone } = fixture;
    await agent
      .get('/users/me')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body.username).to.equal(username);
        expect(res.body.email).to.equal(email);
        expect(res.body.phone).to.equal(phone);
        fixture.id = res.body.id;
      });
  });

  it('should allow you to visit users/profile/:userId', async () => {
    const { id: userId } = fixture;
    await agent
      .get(`/users/profile/${userId}`)
      .expect(200);
  });

  it('should not allow you to visit profile of other users', async () => {
    const { id: userId } = fixture;
    const fakeUserId = `fake${userId}`;
    await agent
      .get(`/users/profile/${fakeUserId}`)
      .expect(401);
  });

  it('should allow you to logout', async () => {
    await agent
      .post('/users/logout')
      .expect(302);
    await agent
      .get('/users/me')
      .expect(401);
  });

  it('should allow you to login if the user is registered', async () => {
    const { username, password, phone, email } = fixture;
    await agent
      .post('/users/login')
      .send({ username, password})
      .expect(302)
      .expect('location', /\//)
      .expect('set-cookie', /sessionToken/);
  });

});
