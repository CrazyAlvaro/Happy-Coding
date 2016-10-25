const express = require('express');
const router = express.Router();

router.get('/:id([0-9]+)', (req, res) => {
  const { id: boardId } = req.params;
  res.render('pages/main/boardPage.pug', {
    boardId,
    title: 'board',
    links: req.links,
    user: req.user,
  });
});

router.param('id', (req, res, next, id) => {
  // TODO: validate the id
  // eslint-disable-next-line
  console.log(id);
  next();
});

module.exports = router;
