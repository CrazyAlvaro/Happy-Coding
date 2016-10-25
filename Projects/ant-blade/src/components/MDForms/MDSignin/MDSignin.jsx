import React from 'react';
import { reduxForm, propTypes } from 'redux-form';
import { Link } from 'react-router';

import formStyles from '../MDForms.css';
import styles from './MDSignin.css';

import authUrls from '../../../../common/authUrls';

const MDSignin = (props) => {
  const { fields: { username, password } } = props;
  return (
    <div className={formStyles.container}>
      <div className={formStyles['form-wrapper']}>
        <form method="POST" action={authUrls.SIGNIN} className={formStyles.form}>
          <div className="form-group">
            <label htmlFor={styles.username}>QQ</label>
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
          <div className={formStyles['button-group']}>
            <button
              type="submit"
              className="btn btn-default"
            >
              登录
            </button>
            <Link to={authUrls.SIGNUP}>
              <button
                type="button"
                className="btn btn-default"
              >
                注册
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

MDSignin.propTypes = {
  ...propTypes,
};

export default reduxForm({
  form: 'md-signin',
  fields: ['username', 'password'],
})(MDSignin);
