const { signupInputsChecker } = require('../../../../app/routes/utils/validateUtils');
const { expect } = require('chai');

describe('validateUtils tests', () => {
  // TODO
  // this is far from complete yet.
  describe('validateUtils tests', () => {

    let vusername;
    let vpassword;
    let vemail;
    let vphone;

    before(() => {
      vusername = 'madadata';
      vpassword = 'madadata';
      vemail = 'madadata@mdadadta.com';
      vphone = '12345678901';
    });

    it('should return empty list if inputs are valid', () => {
      const validInputs = {
        username: vusername,
        password: vpassword,
        confirm: vpassword,
        email: vemail,
        phone: vphone,
      };
      const errors = signupInputsChecker(validInputs);
      expect(errors.length).to.equal(0);
    });

    it('should return errors if inputs are incomplete', () => {
      const incompleteInputs = {};
      const errors = signupInputsChecker(incompleteInputs);
      expect(errors.length).to.equal(4);
    });
  });
});
