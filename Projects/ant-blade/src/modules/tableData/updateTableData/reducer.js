import {
  UPDATE_TABLE_DATA_REMOTE,
  UPDATE_TABLE_DATA_REMOTE_SUCCESS,
  UPDATE_TABLE_DATA_REMOTE_FAIL,
} from './action';

function tableDataUpdate(state = {
  isUpdating: false,
}, action) {
  switch (action.type) {
    case UPDATE_TABLE_DATA_REMOTE:
      return {
        isUpdating: true,
      };
    case UPDATE_TABLE_DATA_REMOTE_SUCCESS:
      return {
        isUpdating: false,
      };
    case UPDATE_TABLE_DATA_REMOTE_FAIL:
      return {
        isUpdating: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export default tableDataUpdate;
