import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import * as actions from './action';
import {
  tableMetadataSelector,
  tableMetadataTableNameSelector,
} from '../tableMetadata/selector';
import {
  addColumnModalDataFormulaSelector,
} from './selector';
import _ from 'lodash';

function genSQL({ metadata, formula, tableName }) {
  const columns = _.map(metadata, 'name');

  // get column names
  // str = '[column1] + [column2]'
  // -> [column1, column2]
  const regexExtractColumnNames = /\[(.*?)\]/g;
  const columnsInFormula = _.map(formula.match(regexExtractColumnNames), col =>
    col.replace(/[\[\]]/g, ''));

  // check if columns in formula exist;
  _.forEach(columnsInFormula, colInFormula => {
    const ifColInColumns = _.some(columns, col => col === colInFormula);
    if (!ifColInColumns) {
      const error = { message: `column "${colInFormula}" not exist` };
      throw error;
    }
  });

  columns.push(formula.replace(/[\[\]]/g, ''));
  return {
    metadata,
    formula,
    sql: `select ${columns} from ${tableName}`,
  };
}

function* closeModal(action) {
  try {
    if (action.save) {
      switch (action.id) {
        case 'addColumn': {
          const tableName = yield select(tableMetadataTableNameSelector);
          const metadata = yield select(tableMetadataSelector);
          const formula = yield select(addColumnModalDataFormulaSelector);
          // FIXME: the returned SQL is not used
          yield call(genSQL, { metadata, formula, tableName });
          break;
        }
        default: {
          const error = { message: 'modal id not exist' };
          throw error;
        }
      }
    }
  } catch (error) {
    yield put(actions.saveModalFail(error));
  }
}

export default function* watchCloseModal() {
  yield* takeEvery(actions.CLOSE_MODAL, closeModal);
}
