import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import * as actions from './action';
import { loadRoleRelationRemote } from '../roleRelationLoad/action';
function* loadRoles() {
  try {
    yield put(loadRoleRelationRemote());  // Call loadRoleRemote to do actual work
  } catch (error) {
    yield put(actions.loadRoleRemoteFail(error));
  }
}

export default function* watchLoadRole() {
  yield* takeEvery(actions.LOAD_ROLE, loadRoles);
}
