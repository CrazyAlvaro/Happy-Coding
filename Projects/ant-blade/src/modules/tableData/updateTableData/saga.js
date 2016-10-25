import { takeEvery, delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from './action';
import { updateApi } from '../../../utils/fetchApi';
import _ from 'lodash';

function* updateTableData(action) {
  const { tableId, dataIds, newData, callback } = action;
  try {
    for (const tuple of _.zip(dataIds, newData)) {
      const [datumId, newDatum] = tuple;
      yield call(updateApi, tableId, datumId, newDatum);
    }
    yield put(actions.updateTableDataRemoteSuccess());
    yield delay(300);
    yield call(callback);
  } catch (error) {
    yield put(actions.updateTableDataRemoteFail(error));
  }
}

export default function* watchUpdateTableData() {
  yield* takeEvery(actions.UPDATE_TABLE_DATA_REMOTE, updateTableData);
}
