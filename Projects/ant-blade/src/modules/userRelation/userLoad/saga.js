import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from './action';
import { loadUserRoleRemote } from '../userRoleLoad/action';
import { loadAllUser as loadAllUserAPI } from '../../../utils/aclApi';

function* loadUser() {
  try {
    const users = yield call(loadAllUserAPI);
    if (users) {
      for (const user of users) {
        yield put(loadUserRoleRemote(user.username));
      }
      yield put(actions.loadUserRemoteSuccess(users));
    } else {
      yield put(actions.loadUserRemoteFail(users.error));
    }
  } catch (error) {
    yield put(actions.loadUserRemoteFail(error));
  }
}

export default function* watchLoadUser() {
  yield* takeEvery(actions.LOAD_USER, loadUser);
}
