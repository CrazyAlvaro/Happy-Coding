export const CREATE_ROLE_RELATION = 'app/roleRelation/CREATE_ROLE_RELATION';
export const CREATE_ROLE_RELATION_SUCCESS = 'app/roleRelation/CREATE_ROLE_RELATION_SUCCESS';
export const CREATE_ROLE_RELATION_FAIL = 'app/roleRelation/CREATE_ROLE_RELATION_FAIL';

export function createRoleRelationRemote(parent, parentType, child, childType) {
  return {
    type: CREATE_ROLE_RELATION,
    parent,
    parentType,
    child,
    childType,
  };
}

export function createRoleRelationRemoteSuccess() {
  return {
    type: CREATE_ROLE_RELATION_SUCCESS,
  };
}

export function createRoleRelationRemoteFail(error) {
  return {
    type: CREATE_ROLE_RELATION_FAIL,
    error,
  };
}
