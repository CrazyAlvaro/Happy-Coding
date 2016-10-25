import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from './action';
import { loadUserRoleRemote } from '../userRoleLoad/action';
import { createUserRole as createUserRoleAPI } from '../../../utils/aclApi';

function* createUserRole(action) {
  try {
    const { username, roleName, roleType } = action;
    const result = yield call(createUserRoleAPI, username, roleName, roleType);

    // API not return valid JSON
    if (result) {
      yield put(actions.createUserRoleRemoteSuccess());
      yield put(loadUserRoleRemote(username));
    } else {
      yield put(actions.createUserRoleRemoteFail(result.error));
    }
  } catch (error) {
    yield put(actions.createUserRoleRemoteFail(error));
  }
}

export default function* watchCreateUserRole() {
  yield* takeEvery(actions.CREATE_USER_ROLE, createUserRole);
}
