import {
  LOAD_TABLE_METADATA,
  LOAD_TABLE_METADATA_SUCCESS,
  LOAD_TABLE_METADATA_FAIL,
  CLEAR_TABLE_METADATA,
} from './action';

function tableMetadata(state = {
  isFetching: false,
  metadata: [],
  name: '',
}, action) {
  switch (action.type) {
    case LOAD_TABLE_METADATA: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case LOAD_TABLE_METADATA_SUCCESS: {
      const { metadata, name } = action;
      return {
        isFetching: false,
        metadata,
        name,
      };
    }
    case LOAD_TABLE_METADATA_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case CLEAR_TABLE_METADATA:
      return {
        ...state,
        metadata: [],
        name: '',
      };
    default:
      return state;
  }
}

export default tableMetadata;
