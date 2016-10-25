const express = require('express');
const router = express.Router();
const ensureLogin = require('./middlewares/ensureLogin');
const preloadData = require('./middlewares/preloadData');
const preloadUserProfile = require('./middlewares/preloadUserProfile');
const usersData = require('./fakeData/organization-users-data');

function fakeFetch(organization, sessionToken) {
  // eslint-disable-next-line no-console
  console.log(organization, sessionToken);
  return usersData;
}

// TODO: routes for organization will be changed later
// which is not required by MVC
router.get('/signin', (req, res) => {
  res.render('pages/auth/organizationSignin.pug');
});

router.get('/signup', (req, res) => {
  res.render('pages/auth/organizationSignup.pug');
});

router.get('/profile', ensureLogin, preloadUserProfile, preloadData, async (req, res) => {
  const { organization, sessionToken } = req.user;
  const colleagues = await fakeFetch(organization, sessionToken);
  res.render('pages/auth/organizationProfile.pug', {
    colleagues,
    user: req.user,
    links: req.links,
    organization: '马达数据',
  });
});

module.exports = router;
