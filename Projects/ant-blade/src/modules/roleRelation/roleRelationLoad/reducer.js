import {
  LOAD_ROLE_RELATION,
  LOAD_ROLE_RELATION_SUCCESS,
  LOAD_ROLE_RELATION_FAIL,
} from './action';

const initialState = {
  isLoadingRoleRelation: false,
  saleRoleRelations: [],
  revRoleRelations: [],
};

function roleRelationLoad(state = initialState, action) {
  switch (action.type) {
    case LOAD_ROLE_RELATION: {
      return {
        ...state,
        isLoadingRoleRelation: true,
      };
    }

    case LOAD_ROLE_RELATION_SUCCESS: {
      return {
        ...state,
        isLoadingRoleRelation: false,
        saleRoleRelations: action.saleRoleRelations,
        revRoleRelations: action.revRoleRelations,
      };
    }

    case LOAD_ROLE_RELATION_FAIL: {
      return {
        ...state,
        isLoadingRoleRelation: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
}

export default roleRelationLoad;
