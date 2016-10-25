import _ from 'lodash';
import { logAuthn } from '../../logger';
import { profileMsgs, authUrls } from '../../../common/authConstants';
const msgs = profileMsgs.cn;

export default async function update(req, res) {
  const { user, user: { username }, body } = req;
  _.assign(user, req.body);
  user.updated = Date.now();
  // this should be overwritten later if the user model has changed
  if (_.intersection(_.keys(body), ['password', '_id']).length <= 0) {
    try {
      await user.save();
      logAuthn('info', 'update profile', username);
      req.flash('success', msgs.INFO_PROFILE_UPDATE_SUCCESS);
    } catch (err) {
      req.flash('error', msgs.ERROR_PROFILE_UPDATE_FAILED);
    }
  } else {
    req.flash('error', msgs.ERROR_PROFILE_UPDATE_FAILED);
  }
  return res.redirect(`${authUrls.PROFILE}/${username}`);
}
