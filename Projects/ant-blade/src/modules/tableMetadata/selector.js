import _ from 'lodash';

export const tableMetadataSelector = state => _.get(state, 'tableMetadata.metadata');
export const tableMetadataFetchingStatusSelector = state =>
  _.get(state, 'tableMetadata.isFetching');
export const tableMetadataFetchingErrorSelector = state => _.get(state, 'tableMetadata.error');
export const tableMetadataTableNameSelector = state => _.get(state, 'tableMetadata.name');

export default {
  tableMetadataSelector,
  tableMetadataFetchingStatusSelector,
  tableMetadataFetchingErrorSelector,
  tableMetadataTableNameSelector,
};
