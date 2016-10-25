const { generateDispatcher, reactor } = require('../../../app/helpers/dispatcher');
const expect = require('chai').expect;

describe('reactor', () => {

  let greetReactor;
  let byeReactor;
  const greet = (name) => `hello ${name}`;
  const bye = (name) => `goodbye ${name}`;
  const greetType = 'greet';
  const byeType = 'bye';

  before(() => {
    greetReactor = reactor(greetType, greet);
    byeReactor = reactor(byeType, bye);
  })

  describe('reactor tests', () => {

    it('should fire with the right type', () => {
      const greetRes = greetReactor(greetType, 'madadata');
      const byeRes = byeReactor(byeType, 'madadata');
      expect(greetRes).to.equal('hello madadata');
      expect(byeRes).to.equal('goodbye madadata');
    });

    it('should do nothing with the wrong type', () => {
      const greetRes = greetReactor(byeType, 'madadata');
      const byeRes = byeReactor(greetType, 'madadata');
      expect(greetRes).to.not.exist;
      expect(byeRes).to.not.exist;
    });
  });

  describe('dispatcher', () => {

    let dispatcher;

    before(() => {
      dispatcher = generateDispatcher(
        greetReactor,
        byeReactor
      );
    });

    it('corresponding reactor should react to that type', () => {
      const greetRes = dispatcher(greetType, 'madadata');
      const byeRes = dispatcher(byeType, 'madadata');
      expect(greetRes).to.equal('hello madadata');
      expect(byeRes).to.equal('goodbye madadata');
    });

    it('no response if not hit', () => {
      const otherRes = dispatcher('otherType', 'madadata');
      expect(otherRes).to.not.exist;
    });
  });
});
