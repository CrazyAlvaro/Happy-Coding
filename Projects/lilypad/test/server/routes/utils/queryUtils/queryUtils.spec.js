const { expect } = require('chai');
const {
  joinWords,
  joinTypedWords,
} = require('../../../../../app/routes/utils/queryUtils/queryUtils');

describe('queryBuilderUtils tests', () => {

  describe('joinWords', () => {
    it('should combine words with comma given non-empty string array', () => {
      const columns = ['a', 'b', 'c', 'd'];
      const res = joinWords(columns);
      expect(res).to.equal('a, b, c, d');
    });

    it('should return empty string with empty string array', () => {
      const columns = [];
      const res = joinWords(columns);
      expect(res).to.equal('');
    });
  });

  describe('joinTypedWords tests', () => {
    it('should join words and add single quote for string type', () => {
      const columns = ['a', 1, 'b', 5];
      const res = joinTypedWords(columns);
      const expectedString = `'a', 1, 'b', 5`;
      expect(res).to.equal(expectedString);
    });
  });

});
