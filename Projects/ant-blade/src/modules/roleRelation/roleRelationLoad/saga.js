import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from './action';
import { loadRoleRemoteSuccess } from '../roleLoad/action';
import { loadRolesWithType as loadRolesWithTypeAPI } from '../../../utils/aclApi';
import {
  SALE_FIN,
  SALE_ENT,
  REV_FIN,
  REV_ENT,
} from '../../../../common/roleConstants';

function roleToRelations(role) {
  const { roleName: parentRole, roleType: parentType } = role;

  return role.childRoles.map(({ roleName: childRole, roleType: childType }) => ({
    parentRole, parentType, childRole, childType,
  }));
}

function rolesToRoleRelations(roles) {
  return roles.reduce(
    (roleRelations, currRole) => roleRelations.concat(roleToRelations(currRole)
  ), []);
}

function* loadRoleRelations() {
  try {
    const saleFinRoles = yield call(loadRolesWithTypeAPI, SALE_FIN);
    const saleEntRoles = yield call(loadRolesWithTypeAPI, SALE_ENT);
    const revFinRoles = yield call(loadRolesWithTypeAPI, REV_FIN);
    const revEntRoles = yield call(loadRolesWithTypeAPI, REV_ENT);

    yield put(loadRoleRemoteSuccess(saleFinRoles, saleEntRoles, revFinRoles, revEntRoles));

    if (saleFinRoles && revFinRoles) {
      yield put(actions.loadRoleRelationRemoteSuccess(
        rolesToRoleRelations(saleFinRoles),
        rolesToRoleRelations(revFinRoles)
      ));
    } else {
      yield put(actions.loadRoleRelationRemoteFail('API Failed'));
    }
  } catch (error) {
    yield put(actions.loadRoleRelationRemoteFail(error));
  }
}

export default function* watchLoadRoleRelation() {
  yield* takeEvery(actions.LOAD_ROLE_RELATION, loadRoleRelations);
}
