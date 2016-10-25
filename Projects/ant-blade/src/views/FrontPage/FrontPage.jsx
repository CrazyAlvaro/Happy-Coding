import React, { PropTypes } from 'react';
import styles from './FrontPage.css';
import { Home } from '../../containers';

const FrontPage = ({ children }) => (
  <div className={styles.container}>
    <Home children={children} />
  </div>
);

FrontPage.propTypes = {
  children: PropTypes.object,
};

export default FrontPage;
