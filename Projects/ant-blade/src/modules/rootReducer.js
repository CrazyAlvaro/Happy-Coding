import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import tableList from './tableList/reducer';
import tableMetadata from './tableMetadata/reducer';
import modal from './modal/reducer';
import {
  tableDataLoad,
  tableDataUpdate,
  tableDataDelete,
  tableDataCreate,
} from './tableData/reducers';
import user from './user/reducer';
import {
  userRoleCreate,
  userRoleLoad,
  userRoleDelete,
  userLoad,
} from './userRelation/reducers';

import {
  roleRelationCreate,
  roleRelationLoad,
  roleRelationDelete,
  roleCreate,
  roleDelete,
  roleLoad,
} from './roleRelation/reducers';

import runEtl from './etl/reducer';

const rootReducer = combineReducers({
  // custom reducers
  tableList,
  tableMetadata,
  tableDataLoad,
  tableDataUpdate,
  tableDataDelete,
  tableDataCreate,
  user,
  modal,
  userRoleCreate,
  userRoleLoad,
  userRoleDelete,
  userLoad,
  roleRelationCreate,
  roleRelationLoad,
  roleRelationDelete,
  roleCreate,
  roleDelete,
  roleLoad,
  runEtl,
  // external reducers
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
