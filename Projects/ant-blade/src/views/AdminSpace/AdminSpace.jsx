import React, { PropTypes } from 'react';

import styles from './AdminSpace.css';

const AdminSpace = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);

AdminSpace.propTypes = {
  children: PropTypes.object,
};

export default AdminSpace;
