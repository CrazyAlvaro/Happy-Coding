import {
  DELETE_TABLE_DATA_REMOTE,
  DELETE_TABLE_DATA_REMOTE_SUCCESS,
  DELETE_TABLE_DATA_REMOTE_FAIL,
} from './action';

function tableDataDelete(state = {
  isDeleting: false,
}, action) {
  switch (action.type) {
    case DELETE_TABLE_DATA_REMOTE:
      return {
        isDeleting: true,
      };
    case DELETE_TABLE_DATA_REMOTE_SUCCESS:
      return {
        isDeleting: false,
      };
    case DELETE_TABLE_DATA_REMOTE_FAIL:
      return {
        isDeleting: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export default tableDataDelete;
