const { generateChecker, Validator } = require('../../helpers/checker');
const { isEmail, isNumeric, isLength } = require('validator');

// TODO:
// should test the existence and other rules
// such as minimum length...
const usernameValidator = new Validator(
  '请输入合法的用户名',
  ({ username }) => !!username
);

const emailValidator = new Validator(
  '请输入正确的邮箱',
  ({ email }) => !!email && isEmail(email)
);

const phoneValidator = new Validator(
  '请输入正确的手机号(11位数字)',
  ({ phone }) => !!phone && isNumeric(phone) && isLength(phone, 11)
);

const passwordConfirmValidator = new Validator(
  '密码为空或两次输入的密码不一致',
  ({ password, confirm }) => !!password && !!confirm && password === confirm
);

const signupInputsChecker = generateChecker([
  usernameValidator,
  passwordConfirmValidator,
  emailValidator,
  phoneValidator,
]);

module.exports = {
  signupInputsChecker,
};
