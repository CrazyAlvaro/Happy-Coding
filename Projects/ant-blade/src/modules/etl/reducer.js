import {
  RUN_ETL,
  RUN_ETL_SUCCESS,
  RUN_ETL_FAIL,
} from './action';

function etlStatus(state = {
  isRunning: false,
}, action) {
  switch (action.type) {

    case RUN_ETL: {
      return {
        isRunning: true,
      };
    }

    case RUN_ETL_SUCCESS: {
      return {
        isRunning: false,
      };
    }

    case RUN_ETL_FAIL: {
      return {
        isRunning: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}

export default etlStatus;
