const links = require('../fakeData/fake-board-metadata');

function fakeFetch() {
  return links;
}

function preloadData(req, res, next) {
  // TODO: here, lilypad should talk to turbine and
  // ask for board metadata
  // eslint-disable-next-line no-param-reassign
  req.links = fakeFetch(links);
  next();
}

module.exports = preloadData;

// // real board metadata should be like
// { section: '我的', group: '', name: '主页', id: '1' },
// { section: '我的', group: '收藏', name: '南极人', id: '2' },
// { section: '我的', group: '收藏', name: '北极人', id: '3' },
// { section: '我的', group: '分享', name: '麦采尧', id: '4' },
// { section: '我的', group: '分享', name: '刘嘉瑜', id: '5' },
// { section: '我的', group: '分享', name: '周宇翔', id: '6' },
// { section: '我的', group: '仪表盘', name: '销售总览', id: '7' },
// { section: '我的', group: '仪表盘', name: '销售人员业绩', id: '8' },
// { section: '团队', group: '销售', name: '销售总览', id: '9' },
// { section: '团队', group: '销售', name: '销售人员业绩', id: '10' },
// { section: '团队', group: '销售', name: '部门业绩', id: '11' },
// { section: '团队', group: '园区', name: '销售总览', id: '12' },
// { section: '团队', group: '园区', name: '销售人员业绩', id: '13' },
