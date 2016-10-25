import React, { PropTypes } from 'react';
import { MDNav, MDFlashMessage } from '../../components';
import styles from './App.css';

const App = ({ children, location }) => {
  const { message, type } = location.query;
  const flashMessage = !!message ?
    <div className={styles['flash-message']}>
      <MDFlashMessage message={message} type={type} />
    </div> : null;
  return (
    <div className={styles.container}>
      <MDNav />
      {flashMessage}
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
};

export default App;
