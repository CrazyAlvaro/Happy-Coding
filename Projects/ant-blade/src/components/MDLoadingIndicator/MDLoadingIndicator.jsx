import React from 'react';
import Spinner from 'react-spinkit';

import styles from './MDLoadingIndicator.css';

const MDLoadingIndicator = () => (
  <div className={styles.loading}>
    <div className={styles.loadingText}>读取数据中</div>
    <Spinner
      spinnerName="three-bounce"
      noFadeIn
    />
  </div>
);

export default MDLoadingIndicator;
