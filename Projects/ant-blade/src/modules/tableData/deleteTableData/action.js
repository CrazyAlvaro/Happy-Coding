/* eslint-disable max-len */
export const DELETE_TABLE_DATA_REMOTE = 'app/tableData/DELETE_TABLE_DATA_REMOTE';
export const DELETE_TABLE_DATA_REMOTE_SUCCESS = 'app/tableData/DELETE_TABLE_DATA_REMOTE_SUCCESS';
export const DELETE_TABLE_DATA_REMOTE_FAIL = 'app/tableData/DELETE_TABLE_DATA_REMOTE_FAIL';
/* eslint-enable max-len */

export function deleteTableDataRemote(tableId, dataIds, rowIds) {
  return {
    type: DELETE_TABLE_DATA_REMOTE,
    tableId,
    dataIds,
    rowIds,
  };
}

export function deleteTableDataRemoteSuccess() {
  return {
    type: DELETE_TABLE_DATA_REMOTE_SUCCESS,
  };
}

export function deleteTableDataRemoteFail(error) {
  return {
    type: DELETE_TABLE_DATA_REMOTE_FAIL,
    error,
  };
}
