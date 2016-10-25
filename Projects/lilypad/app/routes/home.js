const express = require('express');
const router = express.Router();
const { removeNilEntries, safeGetMessageObject } = require('./utils/responseUtils');

router.get(['/', '/home'], (req, res) => {
  const { message } = req.query;
  res.render('pages/main/homePage.pug', removeNilEntries({
    links: req.links,
    user: req.user,
    message: safeGetMessageObject(message),
  }));
});

module.exports = router;
