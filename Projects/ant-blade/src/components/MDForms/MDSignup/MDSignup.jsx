import React, { Component } from 'react';
import { reduxForm, propTypes } from 'redux-form';
import { Link } from 'react-router';

import formStyles from '../MDForms.css';
import styles from './MDSignup.css';

import authUrls from '../../../../common/authUrls';

class MDSignup extends Component {

  constructor() {
    super();
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
  }

  handleSubmitSignUp(e) {
    e.preventDefault();
    this.refs.email.value = `${this.refs.qq.value}@qq.com`;
    this.refs.signupForm.submit();
  }

  render() {
    const { fields: { username, password, email, realName } } = this.props;
    return (
      <div className={formStyles.container}>
        <div className={formStyles['form-wrapper']}>
          <form method="POST" action={authUrls.SIGNUP} className={formStyles.form} ref="signupForm">
            <div className="form-group">
              <label htmlFor={styles['real-name']}>中文全名</label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                { ...realName }
                id={styles['real-name']}
              />
            </div>
            <div className="form-group">
              <label htmlFor={styles.username}>QQ</label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                { ...username }
                id={styles.username}
                ref="qq"
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
            <div className="form-group" hidden>
              <input
                type="email"
                className="form-control"
                placeholder=""
                {...email}
                ref="email"
              />
            </div>
            <div className={formStyles['button-group']}>
              <button
                type="submit"
                className="btn btn-default"
                onClick={this.handleSubmitSignUp}
              >
                提交
              </button>
              <Link to={authUrls.SIGNIN}>
                <button
                  type="button"
                  className="btn btn-default"
                >
                  返回
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

MDSignup.propTypes = {
  ...propTypes,
};

export default reduxForm({
  form: 'md-signin',
  fields: ['username', 'password', 'email', 'realName'],
})(MDSignup);
