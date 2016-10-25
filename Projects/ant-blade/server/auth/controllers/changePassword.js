import { logAuthn } from '../../logger';
import {
  userAuthMsgs,
  authUrls,
} from '../../../common/authConstants';
const msgs = userAuthMsgs.cn;

export default function changePassword(req, res) {
  const { body: { username, newPassword, confirmPassword }, user } = req;
  if (newPassword === confirmPassword) {
    if (!!newPassword) {
      return user.setPassword(newPassword, (updateError, updatedUser, passwordError) => {
        if (updateError || passwordError) {
          req.flash('error', passwordError.message);
        } else {
          updatedUser.save(saveError => {
            if (!saveError) {
              logAuthn('info', 'change password', username);
              req.flash('info', msgs.INFO_CHANGE_PASSWORD_CHANGE_SUCCESS);
              res.redirect(`${authUrls.PROFILE}/${username}`);
            } else {
              res.sendStatus(500);
            }
          });
        }
      });
    } // else
    req.flash('error', msgs.ERROR_CHANGE_PASSWORD_EMPTY_NEW_PASSWORD);
  } else {
    req.flash('error', msgs.ERROR_CHANGE_PASSWORD_NEWPASSWORDS_NOT_MATCH);
  }
  return res.redirect(authUrls.PASSWORD);
}
