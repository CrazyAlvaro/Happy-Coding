const { generateChecker, Validator } = require('../../../app/helpers/checker');
const expect = require('chai').expect;
const isEmail = require('validator/lib/isEmail');
const isNumeric = require('validator/lib/isNumeric');

describe('checker', () => {

  let emailValidator;
  let phoneValidator;
  let checker;

  before(() => {
    emailValidator = new Validator(
      'invalid email',
      ({ email }) => !!email && isEmail(email)
    );
    phoneValidator = new Validator(
      'invalid phone',
      ({ phone }) => !!phone && isNumeric(phone)
    );
    checker = generateChecker([
      emailValidator,
      phoneValidator,
    ]);
  });

  it('should report invalid email if email is not valid', () => {
    const user = {
      email: '123456',
      phone: '123456',
    };
    expect(checker(user)[0]).to.equal('invalid email');
  });

  it('should report invalid phone if phone is not numbers', () => {
    const user = {
      email: '123456@madadata.com',
      phone: '123456@madadata.com',
    };
    expect(checker(user)[0]).to.equal('invalid phone');
  });

  it('should report valid if inputs are valid', () => {
    const user = {
      email: '123456@madadata.com',
      phone: '123456',
    };
    expect(checker(user)).to.be.empty;
  });

  it('should report invalid if inputs are undefined', () => {
    const user = {};
    const errors = checker(user);
    expect(errors[0]).to.equal('invalid email');
    expect(errors[1]).to.equal('invalid phone');
    expect(errors.length).to.equal(2);
  });

});
