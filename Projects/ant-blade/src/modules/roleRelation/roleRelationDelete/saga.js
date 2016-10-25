import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from './action';
import { loadRoleRemote } from '../roleLoad/action';
import { deleteRoleRelation as deleteRoleRelationAPI } from '../../../utils/aclApi';

function* deleteRoleRelation(action) {
  try {
    const { parent, parentType, child, childType } = action;
    const result = yield call(deleteRoleRelationAPI, parent, parentType, child, childType);
    // Currently API return invalid JSON, unable to handle result
    if (result) {
      yield put(actions.deleteRoleRelationRemoteSuccess());
      yield put(loadRoleRemote());
    } else {
      yield put(actions.deleteRoleRelationRemoteFail(result.error));
    }
  } catch (error) {
    yield put(actions.deleteRoleRelationRemoteFail(error));
  }
}

export default function* watchDeleteRoleRelation() {
  yield* takeEvery(actions.DELETE_ROLE_RELATION, deleteRoleRelation);
}
