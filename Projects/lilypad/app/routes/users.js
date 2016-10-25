const {
  addToCookie,
  removeNilEntries,
  safeGetMessageObject,
} = require('./utils/responseUtils');
const {
  resetByEmail,
  resetBySmsCode,
} = require('./utils/AVUtils');
const { buildUrlWithMessage } = require('./utils/urlUtils');
const { generateDispatcher, reactor } = require('../helpers/dispatcher');
const { signupInputsChecker } = require('./utils/validateUtils');
const AV = require('leancloud-storage');
const express = require('express');
const preloadUserProfile = require('./middlewares/preloadUserProfile');
const preloadData = require('./middlewares/preloadData');
const ensureLogin = require('./middlewares/ensureLogin');
const winston = require('winston');

const router = express.Router();

router.route('/login')
  .get((req, res) => {
    const { message } = req.query;
    res.render('pages/auth/userLogin.pug', removeNilEntries({
      enterpriseDomain: 'nanjiren',
      message: safeGetMessageObject(message),
    }));
  })
  .post(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      const message = { type: 'error', content: '用户名或密码不能为空' };
      res.redirect(`/users/login?message=${JSON.stringify(message)}`);
    } else {
      try {
        await AV.User.logIn(username, password);
        const { _sessionToken } = AV.User.current();
        addToCookie(res, 'sessionToken', _sessionToken);
        res.redirect(buildUrlWithMessage('success', '登录成功', '/'));
      } catch (err) {
        // TODO: err should not be pass directly to client
        // should be mapped to corresponding error message
        winston.info(err.message);
        const message = { type: 'error', content: '用户名或密码错误' };
        res.redirect(`/users/login?message=${JSON.stringify(message)}`);
      }
    }
  });

router.route('/logout')
  .post(async (req, res) => {
    try {
      await AV.User.logOut();
      res.redirect(buildUrlWithMessage('success', '退出成功', '/users/login'));
    } catch (err) {
      // TODO: this should be forward to error page
      res.redirect('/');
    }
  });

router.route('/signup')
  .get((req, res) => {
    const { message } = req.query;
    res.render('pages/auth/userSignup.pug', removeNilEntries({
      message: safeGetMessageObject(message),
    }));
  })
  .post(async (req, res) => {
    const errors = signupInputsChecker(req.body);
    if (errors.length > 0) {
      res.redirect(buildUrlWithMessage('error', errors[0], '/users/signup'));
    } else {
      try {
        const { username, password, email, phone } = req.body;
        await AV.User.signUp(username, password, { email, phone });
        const { _sessionToken } = AV.User.current();
        addToCookie(res, 'sessionToken', _sessionToken);
        res.redirect(buildUrlWithMessage('success', '您已注册成功并登陆', '/'));
      } catch (err) {
        // TODO: err should not be pass directly to client
        // should be mapped to corresponding error message
        res.redirect(buildUrlWithMessage('error', err.toString(), '/users/signup'));
      }
    }
  });

router.route('/me')
  .get((req, res) => {
    const user = AV.User.current();
    if (user) {
      // TODO: decide what information to send back
      // eslint-disable-next-line no-underscore-dangle
      const { username, email, phone } = user.attributes;
      const id = user.id;
      res.json({ username, email, phone, id });
    } else {
      res.sendStatus(401);
    }
  });

router.route('/profile/:userid')
  .all(ensureLogin, preloadUserProfile, preloadData)
  .get((req, res) => {
    const paramUserId = req.params.userid;
    if (paramUserId === req.user.id) {
      res.render('pages/auth/userProfile.pug', {
        links: req.links,
        user: req.user,
      });
    } else {
      // TODO: should has an error page
      res.sendStatus(401);
    }
  });

router.route('/reset-password')
  .all(ensureLogin, preloadUserProfile, preloadData)
  .get((req, res) => {
    const { message } = req.query;
    res.render('pages/auth/userResetPassword.pug', {
      links: req.links,
      user: req.user,
      message: safeGetMessageObject(message),
    });
  })
  .post((req, res) => {
    const { resetType } = req.body;
    const { email, phone } = req.user;
    // TODO: flash messages on success and error
    try {
      const dispatchReset = generateDispatcher(
        reactor('email', () => resetByEmail(res, email)),
        reactor('phone', () => resetBySmsCode(res, phone))
      );
      if (['email', 'phone'].includes(resetType)) {
        dispatchReset(resetType);
      } else {
        res.sendStatus(400);
      }
    } catch (err) {
      res.redirect(buildUrlWithMessage(
        'error',
        '内部错误',
        '/users/reset-password'
      ));
    }
  });

router.route('/forget-password')
  .get((req, res) => {
    const { message } = req.query;
    res.render('pages/auth/userForgetPassword.pug', removeNilEntries({
      message: safeGetMessageObject(message),
    }));
  })
  .post((req, res) => {
    const { email } = req.body;
    // TODO: validate the email
    try {
      resetByEmail(res, email);
    } catch (err) {
      res.redirect(buildUrlWithMessage(
        'error',
        '内部错误',
        '/users/forget-password'
      ));
    }
  });

module.exports = router;
