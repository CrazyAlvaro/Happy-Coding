/* eslint-disable max-len*/
export const UPDATE_TABLE_DATA_REMOTE = 'app/tableData/UPDATE_TABLE_DATA_REMOTE';
export const UPDATE_TABLE_DATA_REMOTE_SUCCESS = 'app/tableData/UPDATE_TABLE_DATA_REMOTE_SUCCESS';
export const UPDATE_TABLE_DATA_REMOTE_FAIL = 'app/tableData/UPDATE_TABLE_DATA_REMOTE_FAIL';
/* eslint-enable max-len*/
export function updateTableDataRemote(tableId, dataIds, newData, callback) {
  return {
    type: UPDATE_TABLE_DATA_REMOTE,
    tableId,
    dataIds,
    newData,
    callback,
  };
}

export function updateTableDataRemoteSuccess() {
  return {
    type: UPDATE_TABLE_DATA_REMOTE_SUCCESS,
  };
}

export function updateTableDataRemoteFail(error) {
  return {
    type: UPDATE_TABLE_DATA_REMOTE_FAIL,
    error,
  };
}
