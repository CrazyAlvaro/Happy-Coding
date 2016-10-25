import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from './action';
import { loadRoleRemote } from '../roleLoad/action';
import { createRole as createRoleAPI } from '../../../utils/aclApi';

function* createRole(action) {
  const { roleName, roleType } = action;
  try {
    const result = yield call(createRoleAPI, roleName, roleType);
    if (result.status === 201) {
      yield put(actions.createRoleRemoteSuccess(roleName, roleType));
      yield put(loadRoleRemote());
    } else {
      yield put(actions.createRoleRemoteFail(result.error));
    }
  } catch (error) {
    yield put(actions.createRoleRemoteFail(error));
  }
}

export default function* watchCreateRole() {
  yield* takeEvery(actions.CREATE_ROLE, createRole);
}
