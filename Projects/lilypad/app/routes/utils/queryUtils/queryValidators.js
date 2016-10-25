const _ = require('lodash');
const { generateDispatcher, reactor } = require('../../../helpers/dispatcher');

const SELECT_QUERY_FIELDS = ['table', 'groups', 'values', 'order', 'filters', 'limit'];
const VALID_FUNC = [
  'count',
  'max',
  'min',
  'year',
  'quarter',
  'month',
  'week',
  'day',
  'day_of_week',
  'day_of_year',
  'year_of_week',
  'hour',
  'minute',
  'second',
];

function validateFunction(interval) {
  return _.indexOf(VALID_FUNC, interval) !== -1;
}

// TODO: very basic query validator
function validateSelectQuery(payload) {
  return _.has(payload, SELECT_QUERY_FIELDS);
}

function validateQuery(type, payload) {
  const sqlValidatorDispatcher = generateDispatcher(
    reactor('SELECT', (pl) => validateSelectQuery(pl))
  );
  return sqlValidatorDispatcher(type, payload);
}

module.exports = {
  validateFunction,
  validateSelectQuery,
  validateQuery,
};
