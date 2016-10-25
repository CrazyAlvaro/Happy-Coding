import {
  LOAD_TABLE_LIST,
  LOAD_TABLE_LIST_SUCCESS,
  LOAD_TABLE_LIST_FAIL,
} from './action';

function tableList(state = {
  isFetching: false,
}, action) {
  switch (action.type) {
    case LOAD_TABLE_LIST: {
      return {
        isFetching: true,
      };
    }
    case LOAD_TABLE_LIST_SUCCESS: {
      const { data } = action;
      return {
        isFetching: false,
        data,
      };
    }
    case LOAD_TABLE_LIST_FAIL:
      return {
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export default tableList;
