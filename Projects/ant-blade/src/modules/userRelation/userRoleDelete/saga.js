import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from './action';
import { loadUserRoleRemote } from '../userRoleLoad/action';
import { deleteUserRole as deleteAPI } from '../../../utils/aclApi';

function* deleteUserRole(action) {
  try {
    const { username, roleName, roleType } = action;
    const result = yield call(deleteAPI, username, roleName, roleType);

    // API not return valid JSON
    if (result) {
      yield put(actions.deleteUserRoleRemoteSuccess());
      yield put(loadUserRoleRemote(action.username));
    } else {
      yield put(actions.deleteUserRoleRemoteFail(result.error));
    }
  } catch (error) {
    yield put(actions.deleteUserRoleRemoteFail(error));
  }
}

export default function* watchDeleteUserRole() {
  yield* takeEvery(actions.DELETE_USER_ROLE, deleteUserRole);
}
