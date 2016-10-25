export const CREATE_USER_ROLE = 'app/userRelation/CREATE_USER_ROLE';
export const CREATE_USER_ROLE_SUCCESS = 'app/userRelation/CREATE_USER_ROLE_SUCCESS';
export const CREATE_USER_ROLE_FAIL = 'app/userRelation/CREATE_USER_ROLE_FAIL';

export function createUserRoleRemote(username, roleName, roleType) {
  return {
    type: CREATE_USER_ROLE,
    username,
    roleName,
    roleType,
  };
}

export function createUserRoleRemoteSuccess(username, role) {
  return {
    type: CREATE_USER_ROLE_SUCCESS,
    username,
    role,
  };
}

export function createUserRoleRemoteFail(error) {
  return {
    type: CREATE_USER_ROLE_FAIL,
    error,
  };
}
