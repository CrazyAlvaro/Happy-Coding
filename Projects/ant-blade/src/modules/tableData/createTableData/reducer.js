import {
  CREATE_TABLE_DATA_REMOTE,
  CREATE_TABLE_DATA_REMOTE_SUCCESS,
  CREATE_TABLE_DATA_REMOTE_FAIL,
} from './action';

function tableDataCreate(state = {
  isCreating: false,
}, action) {
  switch (action.type) {
    case CREATE_TABLE_DATA_REMOTE:
      return {
        isCreating: true,
      };
    case CREATE_TABLE_DATA_REMOTE_SUCCESS:
      return {
        isCreating: false,
      };
    case CREATE_TABLE_DATA_REMOTE_FAIL:
      return {
        isCreating: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export default tableDataCreate;
