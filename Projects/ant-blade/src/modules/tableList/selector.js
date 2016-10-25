import _ from 'lodash';

export const tableCategorySelector = state => _.get(state, 'tableList.data');

export const tableListSelector = (state, props) => {
  const { category } = props.params;
  const list = _.get(state, 'tableList.data');
  const tableListObject = _.find(list, { id: category });
  return tableListObject ? tableListObject.children : [];
};

export default {
  tableListSelector,
  tableCategorySelector,
};
