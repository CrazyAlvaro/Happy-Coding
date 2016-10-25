import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from './action';
import fetch from 'isomorphic-fetch';

function fetchApi() {
  return fetch('/tableList')
    .then(resp => resp.json());
}

function* loadTableList() {
  try {
    const data = yield call(fetchApi);
    yield put(actions.loadTableListSuccess(data));
  } catch (error) {
    yield put(actions.loadTableListFail(error));
  }
}

export default function* watchLoadTableList() {
  yield* takeEvery(actions.LOAD_TABLE_LIST, loadTableList);
}
