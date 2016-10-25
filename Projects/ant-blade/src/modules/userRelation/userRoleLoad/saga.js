import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from './action';
import { loadUserRole as loadUserRoleAPI } from '../../../utils/aclApi';

function* loadUserRole(action) {
  try {
    const userRoles = yield call(loadUserRoleAPI, action.user);
    if (userRoles) {
      yield put(actions.loadUserRoleRemoteSuccess(action.user, userRoles));
    } else {
      yield put(actions.loadUserRoleRemoteFail(userRoles.error));
    }
  } catch (error) {
    yield put(actions.loadUserRoleRemoteFail(error));
  }
}

export default function* watchLoadUserRole() {
  yield* takeEvery(actions.LOAD_USER_ROLE, loadUserRole);
}
