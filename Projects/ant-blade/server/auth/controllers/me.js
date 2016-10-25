import { logAuthn } from '../../logger';
import { UserProfile } from '../models';

export default async function me(req, res) {
  const { user: { username } } = req;
  logAuthn('info', 'get profile', username);
  const user = await UserProfile.findOne({ username }).populate({
    path: 'roles',
    populate: { path: 'childRoles' },
  });
  res.json(user);
}
