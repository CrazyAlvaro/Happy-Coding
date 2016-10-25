export const CREATE_ROLE = 'app/roleRelation/CREATE_ROLE';
export const CREATE_ROLE_SUCCESS = 'app/roleRelation/CREATE_ROLE_SUCCESS';
export const CREATE_ROLE_FAIL = 'app/roleRelation/CREATE_ROLE_FAIL';

export function createRoleRemote(roleName, roleType) {
  return {
    type: CREATE_ROLE,
    roleName,
    roleType,
  };
}

export function createRoleRemoteSuccess() {
  return {
    type: CREATE_ROLE_SUCCESS,
  };
}

export function createRoleRemoteFail(error) {
  return {
    type: CREATE_ROLE_FAIL,
    error,
  };
}
