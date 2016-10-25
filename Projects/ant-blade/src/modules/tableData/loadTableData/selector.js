import _ from 'lodash';
import { createSelector } from 'reselect';

import { userRolesSelector } from '../../user/selector';
import { tableMetadataTableNameSelector } from '../../tableMetadata/selector';

// TODO: filter data by tableName and roles once the role api is done
function dataRoleFilter(data, roles, tableName) {
  if (tableName === '销售序时') {
    return data;
  } else if (tableName === '收付款序时') {
    return data;
  }
  return data;
}

export const tableAllDataSelector = state => _.get(state, 'tableDataLoad.data');
export const tableDataFetchingStatusSelector = state => _.get(state, 'tableDataLoad.isFetching');
export const tableDataFetchingErrorSelector = state => _.get(state, 'tableDataLoad.error');

export const tableDataSelector = createSelector(
  tableAllDataSelector,
  userRolesSelector,
  tableMetadataTableNameSelector,
  dataRoleFilter
);

export default {
  tableDataSelector,
  tableDataFetchingStatusSelector,
  tableDataFetchingErrorSelector,
};
