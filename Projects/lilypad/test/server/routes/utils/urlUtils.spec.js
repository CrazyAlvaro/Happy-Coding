const { expect } = require('chai');
const { buildUrlWithMessage } = require('../../../../app/routes/utils/urlUtils');
const url = require('url');
const qs = require('querystring');

describe('urlUtils test', () => {
  describe('buildUrlWithMessage', () => {

    let messageType;
    let messageContent;
    let message;

    before(() => {
      messageType = 'success';
      messageContent = 'you have passed';
      message = { type: messageType, content: messageContent };
    });

    it('should build url with message given baseUrl with protocal', () => {
      const baseUrl = 'http://www.madadata.com';
      const resUrl = url.parse(buildUrlWithMessage(messageType, messageContent, baseUrl));
      expect(resUrl.host).to.equal(url.parse(baseUrl).host);
      expect(resUrl.query).to.equal(qs.stringify({ message: JSON.stringify(message) }));
    });

    it('should build url with message given baseUrl without protocal', () => {
      const baseUrl = 'www.madadata.com';
      const resUrl = url.parse(buildUrlWithMessage(messageType, messageContent, baseUrl));
      expect(resUrl.host).to.equal(url.parse(baseUrl).host);
      expect(resUrl.protocol).to.equal('http:');
      expect(resUrl.query).to.equal(qs.stringify({ message: JSON.stringify(message) }));
    });

    it('should replace original querystring within url with message querystring', () => {
      const baseUrl = 'http://www.madadata.com/?serach=talented';
      const resUrl = url.parse(buildUrlWithMessage(messageType, messageContent, baseUrl));
      expect(resUrl.query).to.equal(qs.stringify({ message: JSON.stringify(message) }));
    });

    it('should work with arbitrary level deep path', () => {
      const baseUrl = 'http://www.madadata.com/a/b/c/?serach=talented';
      const resUrl = url.parse(buildUrlWithMessage(messageType, messageContent, baseUrl));
      expect(resUrl.pathname).to.equal('/a/b/c/');
    });
  });
});
