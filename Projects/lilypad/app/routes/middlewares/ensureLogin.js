const { addToCookie } = require('../utils/responseUtils');
const cookie = require('cookie');
const AV = require('leancloud-storage');

const LOGIN_URL = '/users/login';

function ensureLogin(req, res, next) {
  const cookies = req.get('cookie');
  if (AV.User.current()) {
    next();
  } else if (!cookies) {
    res.redirect(LOGIN_URL);
  } else {
    const { sessionToken } = cookie.parse(cookies);
    if (sessionToken) {
      const { _sessionToken } = AV.User.logIn(sessionToken);
      if (_sessionToken) {
        addToCookie('sessionToken', _sessionToken);
        next();
      } else {
        res.redirect(LOGIN_URL);
      }
    } else {
      res.redirect(LOGIN_URL);
    }
  }
}

module.exports = ensureLogin;
