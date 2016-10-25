import jsdom from 'jsdom';
import 'babel-polyfill';

const DEFAULT_HTML = `
<!doctype html>
<html lang="zh-CN">
  <head></head>
  <body></body>
</html>`;

global.document = jsdom.jsdom(DEFAULT_HTML);
global.window = document.defaultView;
global.navigator = window.navigator;
