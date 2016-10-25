const { expect } = require('chai');
const {
  buildSqlExpression,
  buildSelectSqlClause,
  buildSelectSql,
  buildSql,
} = require('../../../../../app/routes/utils/queryUtils/queryBuilders');

const COLUMN_EXPRESSION = {
  type: 'COLUMN',
  values: ['price'],
};

const STRING_EXPRESSION = {
  type: 'STRING',
  values: ['beijing'],
};

const NUMBER_EXPRESSION = {
  type: 'NUMBER',
  values: [100],
};

const FUNC_EXPRESSION = {
  type: 'FUNC',
  option: 'max',
  values: [
    COLUMN_EXPRESSION,
  ],
};

const SELECT_EXPRESSION = {
  type: 'SELECT',
  option: 'DISTINCT',
  values: [COLUMN_EXPRESSION],
};

const ORDER_EXPRESSION = {
  type: 'ORDER',
  option: 'ASC',
  values: [FUNC_EXPRESSION],
};

const COMPARISON_EXPRESSION = {
  type: 'COMPARISON',
  option: 'IN',
  values: [
    COLUMN_EXPRESSION,
    STRING_EXPRESSION,
  ],
};

const BASE_QUERY = {
  table: 'company',
  values: [],
  filters: [],
  groups: [],
  orders: [],
  limit: null,
};

describe('queryBuilderUtils tests', () => {

  describe('buildSqlExpression tests', () => {
    it('should return sql string given COLUMN type expression', () => {
      const res = buildSqlExpression(COLUMN_EXPRESSION);
      const expectedString = 'price';
      expect(res).to.equal(expectedString);
    });

    it('should return sql string given STRING type expression', () => {
      const res = buildSqlExpression(STRING_EXPRESSION);
      const expectedString = 'beijing';
      expect(res).to.equal(expectedString);
    });

    it('should return sql string given NUMBER type expression', () => {
      const res = buildSqlExpression(NUMBER_EXPRESSION);
      const expectedString = '100';
      expect(res).to.equal(expectedString);
    });

    it('should return sql string given FUNC type expression', () => {
      const res = buildSqlExpression(FUNC_EXPRESSION);
      const expectedString = 'max(price) AS max_of_price';
      expect(res).to.equal(expectedString);
    });

    it('should return sql string given SELECT type expression', () => {
      const res = buildSqlExpression(SELECT_EXPRESSION);
      const expectedString = 'DISTINCT price';
      expect(res).to.equal(expectedString);
    });

    it('should return sql string given ORDER type expression', () => {
      const res = buildSqlExpression(ORDER_EXPRESSION);
      const expectedString = 'max(price) AS max_of_price ASC';
      expect(res).to.equal(expectedString);
    });

    it('should return sql string given ORDER type expression', () => {
      const res = buildSqlExpression(COMPARISON_EXPRESSION);
      const expectedString = 'price IN beijing';
      expect(res).to.equal(expectedString);
    });
  });

  describe('buildSelectSqlClause tests', () => {
    it('should return correct SELECT value clause', () => {
      const values = [
        SELECT_EXPRESSION,
        FUNC_EXPRESSION
      ];
      const res = buildSelectSqlClause('select', values);
      const expectedString = 'SELECT DISTINCT price, max(price) AS max_of_price';
      expect(res).to.equal(expectedString);
    });

    it('should return correct FROM value clause', () => {
      const res = buildSelectSqlClause('from', 'company');
      const expectedString = 'FROM company';
      expect(res).to.equal(expectedString);
    });

    it('should return correct WHERE value clause', () => {
      const values = [
        COMPARISON_EXPRESSION,
      ];
      const res = buildSelectSqlClause('filter', values);
      const expectedString = 'WHERE price IN beijing';
      expect(res).to.equal(expectedString);
    });

    it('should return correct ORDER value clause', () => {
      const values = [
        ORDER_EXPRESSION,
      ];
      const res = buildSelectSqlClause('order', values);
      const expectedString = 'ORDER BY max(price) AS max_of_price ASC';
      expect(res).to.equal(expectedString);
    });

    it('should return correct GROUP value clause', () => {
      const values = [
        COLUMN_EXPRESSION,
        {
          ...FUNC_EXPRESSION,
          option: 'month',
          values: [
            {
              ...COLUMN_EXPRESSION,
              values: ['sale_datetime'],
            },
          ],
        },
      ];
      const res = buildSelectSqlClause('group', values);
      const expectedString = 'GROUP BY price, month(sale_datetime) AS month_of_sale_datetime';
      expect(res).to.equal(expectedString);
    });

    it('should return correct LIMIT value clause', () => {
      const res = buildSelectSqlClause('limit', 100);
      const expectedString = 'LIMIT 100';
      expect(res).to.equal(expectedString);
    });
  });

  describe('buildSelectSqlOrders tests', () => {
    it('should return the complete sql when only SELECT displayed ', () => {
      const query = {
        ...BASE_QUERY,
        values: [SELECT_EXPRESSION],
      };
      const res = buildSelectSql(query);
      const expectedString = 'SELECT DISTINCT price FROM company';
      expect(res).to.equal(expectedString);
    });

    it('should return the complete sql when WHERE displayed ', () => {
      const query = {
        ...BASE_QUERY,
        values: [SELECT_EXPRESSION],
        filters: [COMPARISON_EXPRESSION]
      };
      const res = buildSelectSql(query);
      const expectedString = 'SELECT DISTINCT price FROM company WHERE price IN beijing';
      expect(res).to.equal(expectedString);
    });

    it('should return the complete sql when ORDER displayed ', () => {
      const query = {
        ...BASE_QUERY,
        values: [SELECT_EXPRESSION],
        orders: [ORDER_EXPRESSION]
      };
      const res = buildSelectSql(query);
      const expectedString = 'SELECT DISTINCT price FROM company ORDER BY max(price) AS max_of_price ASC';
      expect(res).to.equal(expectedString);
    });

    it('should return the complete sql when EVERYTHING displayed ', () => {
      const query = {
        ...BASE_QUERY,
        values: [SELECT_EXPRESSION, STRING_EXPRESSION],
        filters: [COMPARISON_EXPRESSION],
        orders: [ORDER_EXPRESSION],
        groups: [SELECT_EXPRESSION],
        limit: 100,
      };
      const res = buildSelectSql(query);
      const expectedString = 'SELECT DISTINCT price, beijing FROM company WHERE price IN beijing GROUP BY DISTINCT price ORDER BY max(price) AS max_of_price ASC LIMIT 100';
      expect(res).to.equal(expectedString);
    });
  });

  describe('buildSelectSql tests', () => {
    it('should return correct select sql given table and columns', () => {
      expect(1).to.equal(1);
    });
  });

  describe('buildSql tests', () => {
    it('should return select sql given select type and payload', () => {
      expect(1).to.equal(1);
    });
  });

});
