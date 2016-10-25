import React from 'react';
import styles from './MDErrorIndicator.css';
import MDGoBackButton from '../MDGoBackButton/MDGoBackButton';

const MDErrorIndicator = () => (
  <div className={styles.error}>
    <div className={styles.errorText}>
      出错了
    </div>
    <MDGoBackButton />
  </div>
);

export default MDErrorIndicator;
