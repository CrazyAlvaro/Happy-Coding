import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { tableListSelector } from '../../modules/tableList/selector';
import _ from 'lodash';

import { Link } from 'react-router';

import styles from './TableList.css';

const TableList = ({ tableList }) => (
  <div className={styles['sheets-overview']}>
    {
      _.map(tableList, (table) => (
        <div className={styles.sheet}>
          <Link
            key={table.id}
            to={`/table/${table.id}`}
            className={styles.link}
          >
            {table.name}
          </Link>
        </div>
      ))
    }
  </div>
);

TableList.propTypes = {
  params: PropTypes.object,
  tableList: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  tableList: tableListSelector,
});

export default connect(mapStateToProps)(TableList);
