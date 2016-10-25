import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from './action';
import { loadRoleRemote } from '../roleLoad/action';
import { deleteRole as deleteRoleAPI } from '../../../utils/aclApi';

function* deleteRole(action) {
  const { roleName, roleType } = action;
  try {
    const result = yield call(deleteRoleAPI, roleName, roleType);
    if (result.status === 204) {
      yield put(actions.deleteRoleRemoteSuccess(roleName, roleType));
      yield put(loadRoleRemote());
    } else {
      yield put(actions.deleteRoleRemoteFail(result.error));
      yield put(loadRoleRemote());
    }
  } catch (error) {
    yield put(actions.deleteRoleRemoteFail(error));
    yield put(loadRoleRemote());
  }
}

export default function* watchCreateRole() {
  yield* takeEvery(actions.DELETE_ROLE, deleteRole);
}
