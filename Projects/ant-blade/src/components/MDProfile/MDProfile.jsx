import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { userProfileSelector } from '../../modules/user/selector';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import classNames from 'classnames';

import styles from './MDProfile.css';

import authUrls from '../../../common/authUrls';

class MDProfile extends Component {

  constructor() {
    super();
    this.handleClickUpdate = this.handleClickUpdate.bind(this);
  }

  handleClickUpdate(e) {
    e.preventDefault();
  }

  render() {
    const { realName, username, email } = this.props.profile;
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.item} >
            <div className={styles.key}>
              中文全名
            </div>
            <div className={styles.val}>
              {realName}
            </div>
          </div>
          <div className={styles.item} >
            <div className={styles.key}>
              QQ
            </div>
            <div className={styles.val}>
              {username}
            </div>
          </div>
          <div className={styles.item} >
            <div className={styles.key}>
              邮箱
            </div>
            <div className={styles.val}>
              {email}
            </div>
          </div>
          <Link to={authUrls.EDIT_PROFILE}>
            <button
              className={classNames('btn', 'btn-default', styles.button)}
            >
              修改资料
            </button>
          </Link>
        </div>
      </div>
    );
  }

}

MDProfile.propTypes = {
  profile: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profile: userProfileSelector,
});

export default connect(mapStateToProps, null)(MDProfile);
