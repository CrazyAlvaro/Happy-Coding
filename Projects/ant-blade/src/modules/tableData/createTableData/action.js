/* eslint-disable max-len */
export const CREATE_TABLE_DATA_REMOTE = 'app/tableData/CREATE_TABLE_DATA_REMOTE';
export const CREATE_TABLE_DATA_REMOTE_SUCCESS = 'app/tableData/CREATE_TABLE_DATA_REMOTE_SUCCESS';
export const CREATE_TABLE_DATA_REMOTE_FAIL = 'app/tableData/CREATE_TABLE_DATA_REMOTE_FAIL';
/* eslint-enable max-len */

export function createTableDataRemote(tableId, newData, callback) {
  return {
    type: CREATE_TABLE_DATA_REMOTE,
    tableId,
    newData,
    callback,
  };
}

export function createTableDataRemoteSuccess() {
  return {
    type: CREATE_TABLE_DATA_REMOTE_SUCCESS,
  };
}

export function createTableDataRemoteFail() {
  return {
    type: CREATE_TABLE_DATA_REMOTE_FAIL,
  };
}
