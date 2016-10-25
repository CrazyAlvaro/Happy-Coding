/* eslint-disable no-param-reassign */
const AV = require('leancloud-storage');


/**
 * preloadUserProfile - this function will
 * 1. retrieve user basic information from leancloud
 * 2. retrive user metadata from turbine
 *
 * @param  {type} req
 * @param  {type} res
 * @param  {type} next
 * @return {type}
 */
function preloadUserProfile(req, res, next) {
  // 1.
  const user = AV.User.current();
  req.user = user.attributes;
  // eslint-disable-next-line no-underscore-dangle
  req.user.sessionToken = user._sessionToken;
  // 2.
  // TODO: the followings data should be retrieved from turbine.
  req.user.organization = '马达数据';
  req.user.avatarSrc = '/static/avatar.png';
  req.user.id = user.id; // use leancloud id instead for test
  next();
}

module.exports = preloadUserProfile;
