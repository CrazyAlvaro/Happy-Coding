import { logAuthn } from '../../logger';
import UserProfile from '../models/userProfile';
import {
  userAuthMsgs,
  authUrls,
} from '../../../common/authConstants';
const msgs = userAuthMsgs.cn;

export default function signup(req, res) {
  const { realName, username, password, email } = req.body;
  if (!realName || !username || !password || !email) {
    req.flash('error', msgs.ERROR_SIGNUP_INVALID_INPUT);
    return res.redirect(authUrls.SIGNUP);
  }
  const userProfile = new UserProfile({
    username,
    email,
    realName,
    provider: 'local',
  });
  return UserProfile.register(userProfile, password, err => {
    if (err) {
      req.flash('error', err.message);
      res.redirect(authUrls.SIGNUP);
    } else {
      req.flash('success', msgs.INFO_SIGNUP_SUCCESS);
      logAuthn('info', 'signup', username);
      res.redirect(authUrls.SIGNIN);
    }
  });
}
