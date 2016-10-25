import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { userProfileSelector } from '../../../modules/user/selector';
import { createStructuredSelector } from 'reselect';
import { reduxForm } from 'redux-form';
import MDFlashMessage from '../../MDFlashMessage/MDFlashMessage';

import classNames from 'classnames';
import formStyles from '../MDForms.css';
import styles from './MDEditProfile.css';

import authUrls from '../../../../common/authUrls';

const MDEditProfile = (props) => {
  const { fields: { realName } } = props;
  const { realName: preRealName } = props.profile;
  const { message, type } = props.location.query;
  const flashMessage = !!message ? <MDFlashMessage message={message} type={type} /> : null;
  return (
    <div className={formStyles.container}>
      <div>
        {flashMessage}
      </div>
      <div className={formStyles['form-wrapper']}>
        <form method="POST" action={authUrls.UPDATE} className={formStyles.form}>
          <div className="form-group">
            <label htmlFor={styles['real-name']}>中文全名</label>
            <input
              type="text"
              className="form-control"
              placeholder={preRealName}
              { ...realName }
              id={styles['real-name']}
            />
          </div>
          <div className={formStyles['button-group']}>
            <button
              type="submit"
              className={classNames('btn', 'btn-default', formStyles.button)}
            >
              确认修改
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

MDEditProfile.propTypes = {
  fields: PropTypes.object,
  location: PropTypes.object,
  profile: PropTypes.object,
};

MDEditProfile.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profile: userProfileSelector,
});

export default connect(mapStateToProps, null)(reduxForm({
  form: 'md-edit-profile',
  fields: ['realName'],
})(MDEditProfile));
