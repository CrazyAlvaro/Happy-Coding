const Url = require('url');

/**
 * buildUrlWithMessage - build urls with query for flash messages
 *
 * @param  {string} messageType    type of message ['info', 'success', 'error']
 * @param  {string} messageContent
 * @param  {string} baseUrl        any url without querystring.
 * @return {string} url
 */
function buildUrlWithMessage(messageType, messageContent, baseUrl) {
  const message = { type: messageType, content: messageContent };
  const urlWithMessage = Url.parse(baseUrl);
  if (urlWithMessage.query) {
    // eslint-disable-next-line no-console
    console.warn(`
      the baseUrl provided to buildUrlWithMessage has querystring,
      and the querystring will be removed.
    `);
    urlWithMessage.search = null;
  }
  urlWithMessage.query = { message: JSON.stringify(message) };
  urlWithMessage.protocol = urlWithMessage.protocal || 'http:';
  return urlWithMessage.format();
}

module.exports = {
  buildUrlWithMessage,
};
