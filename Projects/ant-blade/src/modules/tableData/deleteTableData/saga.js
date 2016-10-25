import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from './action';
import { syncTableDataDelete } from '../loadTableData/action';
import { deleteApi } from '../../../utils/fetchApi';

function* deleteTableData(action) {
  const { tableId, dataIds, rowIds } = action;
  try {
    for (const dataId of dataIds) {
      yield call(deleteApi, tableId, dataId);
    }
    yield put(actions.deleteTableDataRemoteSuccess());
    yield put(syncTableDataDelete(rowIds));
  } catch (error) {
    yield put(actions.deleteTableDataRemoteFail(error));
  }
}

export default function* watchDeleteTableData() {
  yield* takeEvery(actions.DELETE_TABLE_DATA_REMOTE, deleteTableData);
}
