import { takeEvery, delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from './action';
// import { loadTableData } from '../loadTableData/action';
import { createApi } from '../../../utils/fetchApi';

function* createTableData(action) {
  const { tableId, newData, callback } = action;
  try {
    for (const newDatum of newData) {
      yield call(createApi, tableId, newDatum);
    }
    yield put(actions.createTableDataRemoteSuccess());
    yield delay(300);
    yield call(callback);
  } catch (error) {
    yield put(actions.createTableDataRemoteFail(error));
  }
}

export default function* watchCreateTableData() {
  yield* takeEvery(actions.CREATE_TABLE_DATA_REMOTE, createTableData);
}
