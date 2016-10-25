import { fork } from 'redux-saga/effects';

import watchLoadTableList from './tableList/saga';
import watchLoadTableMetadata from './tableMetadata/saga';
import watchCloseModal from './modal/saga';

import {
  watchLoadTableData,
  watchUpdateTableData,
  watchDeleteTableData,
  watchCreateTableData,
} from './tableData/sagas';

import {
  watchUserLoadProfile,
} from './user/sagas';

import {
  watchCreateUserRole,
  watchLoadUserRole,
  watchDeleteUserRole,
  watchLoadUser,
} from './userRelation/sagas';

import {
  watchCreateRoleRelation,
  watchLoadRoleRelation,
  watchDeleteRoleRelation,
  watchCreateRole,
  watchDeleteRole,
  watchLoadRole,
} from './roleRelation/sagas';

import watchRunEtl from './etl/saga';

export default function* rootSaga() {
  yield [
    fork(watchLoadTableList),
    fork(watchLoadTableMetadata),
    fork(watchCloseModal),
    fork(watchLoadTableData),
    fork(watchUpdateTableData),
    fork(watchDeleteTableData),
    fork(watchCreateTableData),
    fork(watchUserLoadProfile),
    fork(watchCreateUserRole),
    fork(watchLoadUserRole),
    fork(watchDeleteUserRole),
    fork(watchLoadUser),
    fork(watchRunEtl),
    fork(watchCreateRoleRelation),
    fork(watchLoadRoleRelation),
    fork(watchDeleteRoleRelation),
    fork(watchCreateRole),
    fork(watchDeleteRole),
    fork(watchLoadRole),
  ];
}
