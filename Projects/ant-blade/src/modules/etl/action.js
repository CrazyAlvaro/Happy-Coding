export const RUN_ETL = 'app/etl/RUN_ETL';
export const RUN_ETL_SUCCESS = 'app/etl/RUN_ETL_SUCCESS';
export const RUN_ETL_FAIL = 'app/etl/RUN_ETL_FAIL';

export function runEtl() {
  return {
    type: RUN_ETL,
  };
}

export function runEtlSuccess() {
  return {
    type: RUN_ETL_SUCCESS,
  };
}

export function runEtlFail(error) {
  return {
    type: RUN_ETL_FAIL,
    payload: error,
    error: true,
  };
}
