import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from './action';
import { loadRoleRemote } from '../roleLoad/action';
import { createRoleRelation as createRoleRelationAPI } from '../../../utils/aclApi';

function* createRoleRelation(action) {
  try {
    const { parent, parentType, child, childType } = action;
    const result = yield call(createRoleRelationAPI, parent, parentType, child, childType);
    // API return Nothing for all request, so this check is meaningless
    if (result) {
      yield put(actions.createRoleRelationRemoteSuccess());
      // Update Role Relations by Calling API(with updated ID), or Change local state(fast)
      yield put(loadRoleRemote());
    } else {
      yield put(actions.createRoleRelationRemoteFail(result.error));
    }
  } catch (error) {
    yield put(actions.createRoleRelationRemoteFail(error));
  }
}

export default function* watchCreateRoleRelation() {
  yield* takeEvery(actions.CREATE_ROLE_RELATION, createRoleRelation);
}
