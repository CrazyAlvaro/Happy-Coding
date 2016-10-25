import {
  userAuthMsgs,
  authUrls,
} from '../../../common/authConstants';
const msgs = userAuthMsgs.cn;

export default function signout(req, res) {
  req.logout();
  req.flash('success', msgs.INFO_SIGNOUT_SUCCESS);
  res.redirect(authUrls.SIGNIN);
}
