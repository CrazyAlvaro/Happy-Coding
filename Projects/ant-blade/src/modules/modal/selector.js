import _ from 'lodash';

export const addColumnModalStatusSelector = state => _.get(state, 'modal.statuses.addColumn');
export const addColumnModalDataFormulaSelector = state =>
  _.get(state, 'modal.data.addColumn.formula');

export default {
  addColumnModalStatusSelector,
  addColumnModalDataFormulaSelector,
};
