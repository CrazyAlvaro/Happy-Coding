import { ADMIN_ROLE } from '../../../common/roleConstants';
import winston from 'winston';
import { UserProfile, Role } from '../../auth/models';

const QUERY = {
  roleName: ADMIN_ROLE,
};

/*
 * ensure that the user is an admin
 */
export default function ensureAdminMiddleware(req, res, next) {
  const { user: { username } } = req;
  Role.findOne(QUERY, (roleQueryError, adminRole) => {
    if (roleQueryError) {
      next(roleQueryError);
    } else if (!adminRole) {
      winston.warn('cannot find the admin role!');
      res.sendStatus(500);
    } else {
      UserProfile.findOne({ username, roles: adminRole._id }, (lookupError, found) => {
        if (lookupError) {
          next(lookupError);
        } else if (!!found) {
          next();
        } else {
          res.sendStatus(401);
        }
      });
    }
  });
}
