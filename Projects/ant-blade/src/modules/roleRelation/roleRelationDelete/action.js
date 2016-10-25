export const DELETE_ROLE_RELATION = 'app/roleRelation/DELETE_ROLE_RELATION';
export const DELETE_ROLE_RELATION_SUCCESS = 'app/roleRelation/DELETE_ROLE_RELATION_SUCCESS';
export const DELETE_ROLE_RELATION_FAIL = 'app/roleRelation/DELETE_ROLE_RELATION_FAIL';

export function deleteRoleRelationRemote(parent, parentType, child, childType) {
  return {
    type: DELETE_ROLE_RELATION,
    parent,
    parentType,
    child,
    childType,
  };
}

export function deleteRoleRelationRemoteSuccess() {
  return {
    type: DELETE_ROLE_RELATION_SUCCESS,
  };
}

export function deleteRoleRelationRemoteFail(error) {
  return {
    type: DELETE_ROLE_RELATION_FAIL,
    error,
  };
}
