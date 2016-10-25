import {
  CREATE_ROLE_RELATION,
  CREATE_ROLE_RELATION_SUCCESS,
  CREATE_ROLE_RELATION_FAIL,
} from './action';

const initialState = {
  isCreating: false,
};

function roleRelationCreate(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROLE_RELATION: {
      return {
        ...state,
        isCreating: true,
      };
    }

    case CREATE_ROLE_RELATION_SUCCESS: {
      return {
        ...state,
        isCreating: false,
        parent: action.parent,
        child: action.child,
      };
    }

    case CREATE_ROLE_RELATION_FAIL: {
      return {
        ...state,
        isCreating: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
}

export default roleRelationCreate;
