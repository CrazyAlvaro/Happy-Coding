import 'babel-polyfill';
import { Role, UserProfile } from '../server/auth/models';
import winston from 'winston';
import { ADMIN_ROLE, ADMIN_USER, ADMIN_TYPE } from '../common/roleConstants';

async function getOrCreateAdminRole() {
  let adminRole = await Role.findOne({ roleName: ADMIN_ROLE, roleType: ADMIN_TYPE });
  if (!adminRole) {
    adminRole = new Role({
      roleName: ADMIN_ROLE,
      roleType: ADMIN_TYPE,
      childRoles: [],
    });
    await adminRole.save();
  }
  return adminRole;
}

export default function installDefaultAdmin() {
  return new Promise((resolve, reject) => {
    const password = process.env.ADMIN_PASSWORD || 'NJDS@2016';
    UserProfile.findByUsername(ADMIN_USER, (findError, testAdmin) => {
      if (findError) {
        winston.error('finding new admin user failed', findError);
        reject(findError);
      } else {
        if (!testAdmin) {
          winston.info('admin not found, creating one', testAdmin);
          UserProfile.register(new UserProfile({
            realName: ADMIN_USER,
            username: ADMIN_USER,
            email: 'admin@madadata.com',
            roles: [],
            provider: 'ant-blade',
          }), password, (registerError, admin) => {
            if (registerError) {
              winston.error('registering new admin user failed', registerError);
              reject(registerError);
            } else {
              getOrCreateAdminRole().then(role => {
                admin.roles.push(role);
                admin.save().then(() => {
                  winston.info('generate new admin user success');
                  resolve();
                });
              }).catch(roleError => {
                winston.error('getting admin role type failed', roleError);
                process.exit(-1);
              });
            }
          });
        } else {
          winston.info('admin user already exists, nothing to do');
          resolve();
        }
      }
    });
  });
}
