import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from './action';

function etlApi() {
  return fetch('/etl', {
    method: 'POST',
    body: JSON.stringify({}),
  }).then(resp => resp.json());
}

function* runEtl() {
  const res = yield call(etlApi);
  if (res.status === 200) {
    yield put(actions.runEtlSuccess());
  } else {
    yield put(actions.runEtlFail('Etl failed'));
  }
}

export default function* watchRunEtl() {
  yield* takeEvery(actions.RUN_ETL, runEtl);
}
