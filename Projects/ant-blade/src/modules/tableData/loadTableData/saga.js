import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from './action';
import { readTableApi } from '../../../utils/fetchApi';

function* loadTableData(action) {
  const { id } = action;
  try {
    const data = yield call(readTableApi, { tableId: id });
    yield put(actions.loadTableDataSuccess(data));
  } catch (error) {
    yield put(actions.loadTableDataFail(error));
  }
}

export default function* watchLoadTableData() {
  yield* takeEvery(actions.LOAD_TABLE_DATA, loadTableData);
}
