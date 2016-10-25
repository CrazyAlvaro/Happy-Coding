export const LOAD_TABLE_DATA = 'app/loadTableData/LOAD_TABLE_DATA';
export const LOAD_TABLE_DATA_SUCCESS = 'app/loadTableData/LOAD_TABLE_DATA_SUCCESS';
export const LOAD_TABLE_DATA_FAIL = 'app/loadTableData/LOAD_TABLE_DATA_FAIL';

export const SYNC_TABLE_DATA_UPDATE = 'app/loadTableData/SYNC_TABLE_DATA_UPDATE';
export const SYNC_TABLE_DATA_DELETE = 'app/loadTableData/SYNC_TABLE_DATA_DELETE';

// TODO: add page and much more arguments for this part
export function loadTableData(id) {
  return {
    type: LOAD_TABLE_DATA,
    id,
  };
}

export function loadTableDataSuccess(data) {
  return {
    type: LOAD_TABLE_DATA_SUCCESS,
    data,
  };
}

export function loadTableDataFail(error) {
  return {
    type: LOAD_TABLE_DATA_FAIL,
    error,
  };
}

export function syncTableDataUpdate(rowIds, newData) {
  return {
    type: SYNC_TABLE_DATA_UPDATE,
    rowIds,
    newData,
  };
}

export function syncTableDataDelete(rowIds) {
  return {
    type: SYNC_TABLE_DATA_DELETE,
    rowIds,
  };
}
