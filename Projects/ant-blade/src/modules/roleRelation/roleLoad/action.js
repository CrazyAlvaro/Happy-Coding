export const LOAD_ROLE = 'app/roleRelation/LOAD_ROLE';
export const LOAD_ROLE_SUCCESS = 'app/roleRelation/LOAD_ROLE_SUCCESS';
export const LOAD_ROLE_FAIL = 'app/roleRelation/LOAD_ROLE_FAIL';

export function loadRoleRemote() {
  return {
    type: LOAD_ROLE,
  };
}

export function loadRoleRemoteSuccess(saleFinRoles, saleEntRoles, revFinRoles, revEntRoles) {
  return {
    type: LOAD_ROLE_SUCCESS,
    saleFinRoles,
    saleEntRoles,
    revFinRoles,
    revEntRoles,
  };
}

export function loadRoleRemoteFail(error) {
  return {
    type: LOAD_ROLE_FAIL,
    error,
  };
}
