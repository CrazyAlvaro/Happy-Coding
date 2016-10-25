export const LOAD_TABLE_METADATA = 'app/tableMetadata/LOAD_TABLE_METADATA';
export const LOAD_TABLE_METADATA_SUCCESS = 'app/tableMetadata/LOAD_TABLE_METADATA_SUCCESS';
export const LOAD_TABLE_METADATA_FAIL = 'app/tableMetadata/LOAD_TABLE_METADATA_FAIL';
export const CLEAR_TABLE_METADATA = 'app/tableMetadata/CLEAR_TABLE_METADATA';

// Very simple loader. We may pass SQL or more complicated arguments for data fetching
export function loadTableMetadata(id) {
  return {
    type: LOAD_TABLE_METADATA,
    id,
  };
}

export function loadTableMetadataSuccess({ metadata, name }) {
  return {
    type: LOAD_TABLE_METADATA_SUCCESS,
    metadata,
    name,
  };
}

export function loadTableMetadataFail(error) {
  return {
    type: LOAD_TABLE_METADATA_FAIL,
    error,
  };
}

export function clearTableMetadata() {
  return {
    type: CLEAR_TABLE_METADATA,
  };
}
