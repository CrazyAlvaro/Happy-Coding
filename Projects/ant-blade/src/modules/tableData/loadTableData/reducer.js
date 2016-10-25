import {
  LOAD_TABLE_DATA,
  LOAD_TABLE_DATA_SUCCESS,
  LOAD_TABLE_DATA_FAIL,
  SYNC_TABLE_DATA_UPDATE,
  SYNC_TABLE_DATA_DELETE,
} from './action';

import _ from 'lodash';

function tableDataLoad(state = {
  isFetching: false,
}, action) {
  switch (action.type) {
    case LOAD_TABLE_DATA: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case LOAD_TABLE_DATA_SUCCESS: {
      const { data } = action;
      return {
        isFetching: false,
        data,
      };
    }
    case LOAD_TABLE_DATA_FAIL:
      return {
        isFetching: false,
        error: action.error,
      };
    case SYNC_TABLE_DATA_UPDATE: {
      const { rowIds, newData } = action;
      const syncedData = _.cloneDeep(state.data);
      _.forEach(_.zip(rowIds, newData), ([rowId, newDatum]) => {
        Object.assign(syncedData[rowId], newDatum);
      });
      return {
        ...state,
        data: syncedData,
      };
    }
    case SYNC_TABLE_DATA_DELETE: {
      const { rowIds } = action;
      const syncedData = _.cloneDeep(state.data);
      _.remove(syncedData, (ele, idx) => idx in rowIds);
      return {
        ...state,
        data: syncedData,
      };
    }
    default:
      return state;
  }
}

export default tableDataLoad;
