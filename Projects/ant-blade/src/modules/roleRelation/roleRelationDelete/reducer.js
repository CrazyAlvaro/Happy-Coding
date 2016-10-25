import {
  DELETE_ROLE_RELATION,
  DELETE_ROLE_RELATION_SUCCESS,
  DELETE_ROLE_RELATION_FAIL,
} from './action';

const initialState = {
  isDeletingRoleRelation: false,
};

function roleRelationDelete(state = initialState, action) {
  switch (action.type) {
    case DELETE_ROLE_RELATION: {
      return {
        ...state,
        isDeletingRoleRelation: true,
      };
    }

    case DELETE_ROLE_RELATION_SUCCESS: {
      return {
        ...state,
        isDeletingRoleRelation: false,
      };
    }

    case DELETE_ROLE_RELATION_FAIL: {
      return {
        ...state,
        isDeletingRoleRelation: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
}

export default roleRelationDelete;
