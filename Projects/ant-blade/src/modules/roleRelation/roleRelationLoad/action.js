export const LOAD_ROLE_RELATION = 'app/roleRelation/LOAD_ROLE_RELATION';
export const LOAD_ROLE_RELATION_SUCCESS = 'app/roleRelation/LOAD_ROLE_RELATION_SUCCESS';
export const LOAD_ROLE_RELATION_FAIL = 'app/roleRelation/LOAD_ROLE_RELATION_FAIL';

export function loadRoleRelationRemote() {
  return {
    type: LOAD_ROLE_RELATION,
  };
}

export function loadRoleRelationRemoteSuccess(saleRoleRelations, revRoleRelations) {
  return {
    type: LOAD_ROLE_RELATION_SUCCESS,
    saleRoleRelations,
    revRoleRelations,
  };
}

export function loadRoleRelationRemoteFail(error) {
  return {
    type: LOAD_ROLE_RELATION_FAIL,
    error,
  };
}
