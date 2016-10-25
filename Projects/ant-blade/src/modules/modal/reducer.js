import {
  OPEN_MODAL,
  CLOSE_MODAL,
  CHANGE_MODAL_DATA,
  SAVE_MODAL_FAIL,
} from './action';
import _ from 'lodash';

function modal(state = {
  statuses: {
    addColumn: false,
  },
  data: {
    addColumn: {
      formula: '',
    },
  },
}, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      const newState = { ...state };
      _.set(newState, `statuses.${action.id}`, true);
      return newState;
    }
    case CLOSE_MODAL: {
      const newState = { ...state };
      _.set(newState, `statuses.${action.id}`, false);
      return newState;
    }
    case CHANGE_MODAL_DATA: {
      const newState = { ...state };
      _.set(newState, `data.${action.path}`, action.data);
      return newState;
    }
    case SAVE_MODAL_FAIL: {
      return { ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
}

export default modal;
