import { userAuthMsgs, authUrls } from '../../../common/authConstants';
const msgs = userAuthMsgs.cn;

/*
 * ensure that the request is authenticated
 */
export default function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('error', msgs.ERROR_USER_NOT_SIGNED_IN);
    res.redirect(authUrls.SIGNIN);
  }
}
