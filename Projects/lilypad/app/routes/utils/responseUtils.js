const _ = require('lodash');

function responseErrorHandler(code, expected, message) {
  if (code === expected) {
    throw new Error(message);
  }
}

function addToCookie(res, key, val, ttl = 86400) {
  res.cookie(key, val, { httpOnly: true, maxAge: ttl });
}

function removeNilEntries(object) {
  return _.omitBy(object, !_.isNil);
}

function safeGetMessageObject(message) {
  return message ? JSON.parse(message) : null;
}

module.exports = {
  responseErrorHandler,
  addToCookie,
  removeNilEntries,
  safeGetMessageObject,
};
