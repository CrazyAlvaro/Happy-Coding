export const DELETE_ROLE = 'app/roleRelation/DELETE_ROLE';
export const DELETE_ROLE_SUCCESS = 'app/roleRelation/DELETE_ROLE_SUCCESS';
export const DELETE_ROLE_FAIL = 'app/roleRelation/DELETE_ROLE_FAIL';

export function deleteRoleRemote(roleName, roleType) {
  return {
    type: DELETE_ROLE,
    roleName,
    roleType,
  };
}

export function deleteRoleRemoteSuccess() {
  return {
    type: DELETE_ROLE_SUCCESS,
  };
}

export function deleteRoleRemoteFail(error) {
  return {
    type: DELETE_ROLE_FAIL,
    error,
  };
}
