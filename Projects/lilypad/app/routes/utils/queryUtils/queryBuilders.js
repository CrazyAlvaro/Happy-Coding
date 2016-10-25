const _ = require('lodash');
const { generateDispatcher, reactor } = require('../../../helpers/dispatcher');
const { joinWords } = require('./queryUtils');
const { validateFunction } = require('./queryValidators');

const TYPE_TO_SQL_PREFIX = {
  select: 'SELECT',
  from: 'FROM',
  group: 'GROUP BY',
  filter: 'WHERE',
  order: 'ORDER BY',
  limit: 'LIMIT',
};

function buildSqlExpression(expression) {
  const { type, option, values } = expression;
  switch (type) {
    case 'STRING':
      return values[0];
    case 'NUMBER':
      return `${values[0]}`;
    case 'COLUMN':
      return values[0];
    case 'FUNC': {
      if (validateFunction(option)) {
        const expressions = _.map(values, buildSqlExpression);
        const funcArgs = joinWords(expressions);
        return `${option}(${funcArgs}) AS ${option}_of_${funcArgs}`;
      }
      throw new Error('function type undefined');
    }
    case 'SELECT': {
      return `${option} ${buildSqlExpression(values[0])}`;
    }
    case 'ORDER': {
      return `${buildSqlExpression(values[0])} ${option}`;
    }
    case 'COMPARISON': {
      const [leftExpression, rightExpression] = values;
      const left = buildSqlExpression(leftExpression);
      const right = buildSqlExpression(rightExpression);
      return `${left} ${option} ${right}`;
    }
    default:
      throw new Error(`expression type ${type} undefined`);
  }
}

function buildSelectSqlClause(type, values) {
  if (!_.isNumber(values) && _.isEmpty(values)) return '';
  let content;
  if (type === 'limit' || type === 'from') {
    content = `${values}`;
  } else {
    const wordList = _.map(values, value => buildSqlExpression(value));
    content = joinWords(wordList);
  }
  return `${TYPE_TO_SQL_PREFIX[type]} ${content}`;
}

function combineClauses(clauses) {
  const combinedSql = _.reduce(clauses, (result, clause) => {
    if (_.isEmpty(clause)) return result;
    return `${result} ${clause}`;
  }, '');
  return combinedSql.trim();
}

function buildSelectSql({ table, values, groups, orders, filters, limit }) {
  const sqlSelect = buildSelectSqlClause('select', values);
  const sqlFrom = buildSelectSqlClause('from', table);
  const sqlGroup = buildSelectSqlClause('group', groups);
  const sqlOrder = buildSelectSqlClause('order', orders);
  const sqlWhere = buildSelectSqlClause('filter', filters);
  const sqlLimit = buildSelectSqlClause('limit', limit);
  const sqlClauses = [
    sqlSelect,
    sqlFrom,
    sqlWhere,
    sqlGroup,
    sqlOrder,
    sqlLimit,
  ];
  return combineClauses(sqlClauses);
}

function buildSql(type, payload) {
  const sqlBuilderDispatcher = generateDispatcher(
    reactor('SELECT', (pl) => buildSelectSql(pl))
  );
  return sqlBuilderDispatcher(type, payload);
}

module.exports = {
  buildSqlExpression,
  buildSelectSqlClause,
  buildSelectSql,
  buildSql,
};
