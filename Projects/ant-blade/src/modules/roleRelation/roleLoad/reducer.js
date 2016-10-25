import {
  LOAD_ROLE,
  LOAD_ROLE_SUCCESS,
  LOAD_ROLE_FAIL,
} from './action';

const initialState = {
  isLoadingRole: false,
  saleFinRoles: [],
  saleEntRoles: [],
  revFinRoles: [],
  revEntRoles: [],
};

function roleLoad(state = initialState, action) {
  switch (action.type) {
    case LOAD_ROLE: {
      return {
        ...state,
        isLoadingRole: true,
      };
    }

    case LOAD_ROLE_SUCCESS: {
      return {
        ...state,
        isLoadingRole: false,
        saleFinRoles: action.saleFinRoles,
        saleEntRoles: action.saleEntRoles,
        revFinRoles: action.revFinRoles,
        revEntRoles: action.revEntRoles,
      };
    }

    case LOAD_ROLE_FAIL: {
      return {
        ...state,
        isLoadingRole: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
}

export default roleLoad;
