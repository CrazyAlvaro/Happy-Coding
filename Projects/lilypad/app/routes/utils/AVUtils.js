const { buildUrlWithMessage } = require('./urlUtils');
const AV = require('leancloud-storage');

/* eslint-disable no-unused-vars */
function resetByEmail(res, email) {
  AV.User.requestPasswordReset(email).then(
    success => res.redirect(buildUrlWithMessage(
      'success',
      '邮件发送成功，请到您的邮箱中确认',
      '/users/forget-password'
    )),
    error => res.redirect(buildUrlWithMessage(
      'error',
      '邮件发送失败，请稍后再试',
      '/users/forget-password'
    ))
  );
}

function resetBySmsCode(res, phone) {
  // TODO: this has not been verified. Receive error that
  // an user with the specified mobile phone number was
  // not found. Perhaps the reason is that I have not verified
  // the phone.
  AV.User.requestPasswordResetBySmsCode(phone).then(
    success => res.send('短信发送成功'),
    error => res.send('短信发送失败')
  );
}

module.exports = {
  resetBySmsCode,
  resetByEmail,
};
