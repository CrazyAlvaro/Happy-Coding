export const LOAD_TABLE_LIST = 'app/tableList/LOAD_TABLE_LIST';
export const LOAD_TABLE_LIST_SUCCESS = 'app/tableList/LOAD_TABLE_LIST_SUCCESS';
export const LOAD_TABLE_LIST_FAIL = 'app/tableList/LOAD_TABLE_LIST_FAIL';

export function loadTableList() {
  return {
    type: LOAD_TABLE_LIST,
  };
}

export function loadTableListSuccess(data) {
  return {
    type: LOAD_TABLE_LIST_SUCCESS,
    data,
  };
}

export function loadTableListFail(error) {
  return {
    type: LOAD_TABLE_LIST_FAIL,
    error,
  };
}
