const { expect } = require('chai');
const { constructURL } = require('../../../../app/routes/utils/thirdPartyUtils');

describe('connectorUtils tests', () => {

  const baseURI = 'www.madadata.com/?';
  const params = {
    type: 'select',
    column: 'baobao',
    table: 'people',
  };
  const cnParams = {
    name: '宝宝',
  };

  describe('constructURL tests', () => {
    it('should constructURL as expected', () => {
      const res = constructURL(baseURI, params);
      const exp = 'www.madadata.com/?type=select&column=baobao&table=people';
      expect(res).to.equal(exp);
    });

    it('should construct encoded URI', () => {
      const res = constructURL(baseURI, cnParams);
      const exp = 'www.madadata.com/?name=%E5%AE%9D%E5%AE%9D';
      expect(res).to.equal(exp);
    });
  });

});
