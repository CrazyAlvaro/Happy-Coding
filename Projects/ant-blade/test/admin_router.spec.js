/* global it before describe */
/* eslint padded-blocks: off */
import 'babel-polyfill';
import request from 'supertest-as-promised';
import express from 'express';
import morgan from 'morgan';
import chai from 'chai';
import authConfig from '../server/authConfig';
import adminRouter from '../server/admin/router';

const expect = chai.expect;

describe('The admin API', () => {
  let agent;

  before(async () => {
    const data = {
      realName: 'admin',
      username: 'admin',
      password: 'NJDS@2016',
      email: 'admin@madadata.com',
    };
    const app = express();
    app.use(morgan('dev'));
    authConfig(app);
    app.use('/admin', adminRouter);
    agent = request.agent(app);
    // but we do care to sign-in
    await agent
      .post('/auth/signin')
      .type('form')
      .send(data)
      .expect(302)
      .expect('Location', /\//);
  });

  it('should get a list of users', async () => {
    const res = await agent.get('/admin/user').expect(200);
    const body = res.body;
    expect(body).to.be.an('array');
  });

  it('should get info about one user', async () => {
    const res = await agent.get('/admin/user/admin').expect(200);
    const user = res.body;
    expect(user.roles).to.be.an('array');
    expect(user.roles[0].roleName).to.equal('admin');
  });

  it('should distinctly assign a role to a user', async () => {
    await agent.put('/admin/user/admin/role/ADMIN/admin').expect(201);
    await agent.put('/admin/user/admin/role/ADMIN/admin').expect(201);
    const res = await agent.get('/admin/user/admin').expect(200);
    const user = res.body;
    expect(user.roles).to.be.an('array');
  });

  it('should get a list of roles', async () => {
    const res = await agent.get('/admin/role').expect(200);
    const body = res.body;
    expect(body).to.be.an('array');
  });

  it('should get a list of roles given a role type', async () => {
    const res = await agent.get('/admin/role/ADMIN').expect(200);
    const body = res.body;
    expect(body).to.be.an('array');
  });

  it('should get info about one role', async () => {
    const res = await agent.get('/admin/role/ADMIN/admin').expect(200);
    const role = res.body;
    expect(role.roleName).to.equal('admin');
  });

  it('should create a role', async () => {
    await agent.put('/admin/role/SALE_FIN/fin_mgr').expect(201);
    const res = await agent.get('/admin/role/SALE_FIN/fin_mgr').expect(200);
    const role = res.body;
    expect(role.roleName).to.equal('fin_mgr');
  });

  it('should get all users of a given role', async () => {
    const res = await agent.get('/admin/role/ADMIN/admin/user').expect(200);
    const users = res.body;
    const user = users[0];
    expect(user.realName).to.equal('admin');
  });

  it('should assign an existing role a child that is an existing role', async () => {
    // put two roles
    await agent.put('/admin/role/SALE_FIN/fin_mgr').expect(201);
    await agent.put('/admin/role/SALE_ENT/fin_opr').expect(201);
    // and then link
    await agent.put('/admin/role/SALE_FIN/fin_mgr/child/SALE_ENT/fin_opr/')
      .expect(201);
    const res = await agent.get('/admin/role/SALE_FIN/fin_mgr').expect(200);
    const child = res.body;
    expect(child.childRoles).to.be.an('array');
    expect(child.childRoles.length).to.equal(1);
    expect(new Set(child.childRoles.map(r => r.roleName))).to.deep.equal(new Set([
      'fin_opr',
    ]));
  });

  it('should assign another child role', async () => {
    await agent.put('/admin/role/SALE_ENT/fin_opr2').expect(201);
    await agent.put('/admin/role/SALE_FIN/fin_mgr/child/SALE_ENT/fin_opr2/')
      .expect(201);
    const res = await agent.get('/admin/role/SALE_FIN/fin_mgr').expect(200);
    const child = res.body;
    expect(child.childRoles).to.be.an('array');
    expect(child.childRoles.length).to.equal(2);
    expect(new Set(child.childRoles.map(r => r.roleName))).to.deep.equal(new Set([
      'fin_opr',
      'fin_opr2',
    ]));
  });

  it('should be idempotent for PUT', async () => {
    // put again
    await agent.put('/admin/role/SALE_FIN/fin_mgr').expect(201);
    const res = await agent.get('/admin/role/SALE_FIN/fin_mgr').expect(200);
    const child = res.body;
    expect(child.childRoles).to.be.an('array');
    expect(child.childRoles.length).to.equal(2);
    expect(new Set(child.childRoles.map(r => r.roleName))).to.deep.equal(new Set([
      'fin_opr',
      'fin_opr_2',
    ]));
  });

  it('should forbid to remove the parent role when it has any children', async () => {
    await agent.delete('/admin/role/SALE_FIN/fin_mgr')
      .expect(400);
  });

  it('should unlink a child role', async () => {
    await agent.delete('/admin/role/SALE_FIN/fin_mgr/child/SALE_ENT/fin_opr')
      .expect(204);
    const res = await agent.get('/admin/role/SALE_FIN/fin_mgr').expect(200);
    const child = res.body;
    expect(child.childRoles.length).to.equal(1);
    expect(new Set(child.childRoles.map(r => r.roleName))).to.deep.equal(new Set([
      'fin_opr_2',
    ]));
  });

  it('should delete a child role which also unlinks it', async () => {
    await agent.delete('/admin/role/SALE_ENT/fin_opr2')
      .expect(204);
    const res = await agent.get('/admin/role/SALE_FIN/fin_mgr').expect(200);
    const child = res.body;
    expect(child.childRoles.length).to.equal(0);
  });

  it('should allow to remove the parent role when it has no children', async () => {
    await agent.delete('/admin/role/SALE_FIN/fin_mgr')
      .expect(204);
  });

});
