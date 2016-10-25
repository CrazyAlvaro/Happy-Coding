var authUrls = require('./authUrls');

module.exports = {
  authUrls: authUrls,
  userAuthMsgs: {
    en: {
      // common
      ERROR_USER_NOT_SIGNED_IN: 'user has not signed in',

      // signup messages
      ERROR_SIGNUP_INVALID_INPUT: 'username, password and email should all be provided',
      INFO_SIGNUP_SUCCESS: 'user has been created',

      // signin messages
      ERROR_SIGNIN_AUTHENTICATION_FAILED: 'authentication failed',
      ERROR_SIGNIN_FAILED: 'user signin failed',
      INFO_SIGNIN_SUCCESS: 'user has been signed in',

      // signout messages
      INFO_SIGNOUT_SUCCESS: 'user has been signed out',

      // change password
      ERROR_CHANGE_PASSWORD_EMPTY_NEW_PASSWORD: 'empty new password is not allowed',
      ERROR_CHANGE_PASSWORD_NEWPASSWORDS_NOT_MATCH: 'new-password and confirm-password don\'t match',
      INFO_CHANGE_PASSWORD_CHANGE_SUCCESS: 'password has been successfully changed',
    },
    cn: {
      // common
      ERROR_USER_NOT_SIGNED_IN: '用户未登录',

      // signup messages
      ERROR_SIGNUP_INVALID_INPUT: '中文名、QQ号以及密码皆为必填项',
      INFO_SIGNUP_SUCCESS: '用户已创建',

      // signin messages
      ERROR_SIGNIN_FAILED: '用户登录失败',
      INFO_SIGNIN_SUCCESS: '用户登录成功',
      INFO_ADMIN_SIGNIN_SUCCESS: '管理员登录成功',

      // signout messages
      INFO_SIGNOUT_SUCCESS: '用户登出成功',

      // change password
      ERROR_CHANGE_PASSWORD_EMPTY_NEW_PASSWORD: '新密码不可以为空',
      ERROR_CHANGE_PASSWORD_NEWPASSWORDS_NOT_MATCH: '两次输入的密码不一致',
      INFO_CHANGE_PASSWORD_CHANGE_SUCCESS: '密码修改成功',
    },
  },
  profileMsgs: {
    en: {
      // common
      ERROR_USER_NOT_SIGNED_IN: 'user has not signed in',

      // update
      ERROR_PROFILE_NO_UPDATE_SENSITIVE_DATA: 'update sensitive data is not allowed',
      ERROR_PROFILE_UPDATE_FAILED_IN_DB: 'user profile update failed in database',
      ERROR_PROFILE_UPDATE_FAILED: 'user profile update failed',
      INFO_PROFILE_UPDATE_SUCCESS: 'user profile has been updated',
    },
    cn: {
      // common
      ERROR_USER_NOT_SIGNED_IN: '用户未登录',

      // update
      ERROR_PROFILE_NO_UPDATE_SENSITIVE_DATA: '不能修改敏感数据',
      ERROR_PROFILE_UPDATE_FAILED_IN_DB: '保存用户新信息出错',
      ERROR_PROFILE_UPDATE_FAILED: '用户资料更新失败',
      INFO_PROFILE_UPDATE_SUCCESS: '用户资料更新成功',
    },
  },
  PLMErrorMsgs: {
    MissingPasswordError: '您没有输入密码',
    AttemptTooSoonError: '该账户已经被锁定，请过一段时间重试',
    TooManyAttemptsError: '您重复登录失败次数过多',
    NoSaltValueStoredError: '用户验证失败(No salt value stored)',
    IncorrectPasswordError: '用户名或密码错误',
    IncorrectUsernameError: '用户名或密码错误',
    MissingUsernameError: '请输入用户名',
    UserExistsError: '该用户已被注册',
  },
};
