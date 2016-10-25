export const DELETE_USER_ROLE = 'app/userRelation/DELETE_USER_ROLE';
export const DELETE_USER_ROLE_SUCCESS = 'app/userRelation/DELETE_USER_ROLE_SUCCESS';
export const DELETE_USER_ROLE_FAIL = 'app/userRelation/DELETE_USER_ROLE_FAIL';

export function deleteUserRoleRemote(username, roleName, roleType) {
  return {
    type: DELETE_USER_ROLE,
    username,
    roleName,
    roleType,
  };
}

export function deleteUserRoleRemoteSuccess() {
  return {
    type: DELETE_USER_ROLE_SUCCESS,
  };
}

export function deleteUserRoleRemoteFail(error) {
  return {
    type: DELETE_USER_ROLE_FAIL,
    error,
  };
}
