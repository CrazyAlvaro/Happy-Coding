export const LOAD_USER_ROLE = 'app/userRelation/LOAD_USER_ROLE';
export const LOAD_USER_ROLE_SUCCESS = 'app/userRelation/LOAD_USER_ROLE_SUCCESS';
export const LOAD_USER_ROLE_FAIL = 'app/userRelation/LOAD_USER_ROLE_FAIL';

/**
 * loadUserRoleRemote(users)
 *
 * @param {string} user
 * @return {object} action
 */
export function loadUserRoleRemote(user) {
  return {
    type: LOAD_USER_ROLE,
    user,
  };
}

export function loadUserRoleRemoteSuccess(username, userRoles) {
  return {
    type: LOAD_USER_ROLE_SUCCESS,
    username,
    userRoles,
  };
}

export function loadUserRoleRemoteFail(error) {
  return {
    type: LOAD_USER_ROLE_FAIL,
    error,
  };
}
