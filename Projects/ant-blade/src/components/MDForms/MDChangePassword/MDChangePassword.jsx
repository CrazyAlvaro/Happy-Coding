import React from 'react';
import { reduxForm, propTypes } from 'redux-form';

import classNames from 'classnames';
import formStyles from '../MDForms.css';
import styles from './MDChangePassword.css';

import authUrls from '../../../../common/authUrls';

const MDChangePassword = (props) => {
  const { fields: { username, password, newPassword, confirmPassword } } = props;
  return (
    <div className={formStyles.container}>
      <div className={formStyles['form-wrapper']}>
        <form method="POST" action={authUrls.PASSWORD} className={formStyles.form}>
          <div className="form-group">
            <label htmlFor={styles.username}>用户名</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              { ...username }
              id={styles.username}
            />
          </div>
          <div className="form-group">
            <label htmlFor={styles.password}>密码</label>
            <input
              type="password"
              className="form-control"
              placeholder=""
              { ...password }
              id={styles.password}
            />
          </div>
          <div className="form-group">
            <label htmlFor={styles['new-password']}>新密码</label>
            <input
              type="password"
              className="form-control"
              placeholder=""
              { ...newPassword }
              id={styles['new-password']}
            />
          </div>
          <div className="form-group">
            <label htmlFor={styles['confirm-password']}>确认新密码</label>
            <input
              type="password"
              className="form-control"
              placeholder=""
              { ...confirmPassword }
              id={styles['confirm-password']}
            />
          </div>
          <div className={formStyles['button-group']}>
            <button
              type="submit"
              className={classNames('btn', 'btn-default', formStyles.button)}
            >
              提交
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

MDChangePassword.propTypes = {
  ...propTypes,
};

export default reduxForm({
  form: 'md-password',
  fields: ['username', 'password', 'newPassword', 'confirmPassword'],
})(MDChangePassword);
