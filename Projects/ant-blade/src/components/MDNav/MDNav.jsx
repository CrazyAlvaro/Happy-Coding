import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import {
  userProfileSelector,
  userIsSignedInStatusSelector,
} from '../../modules/user/selector';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import styles from './MDNav.css';
import logo from './logo.png';
import authUrls from '../../../common/authUrls';

class MDNav extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ key }) {
    if (key === 'signout') {
      this.refs.signoutForm.submit();
    }
  }

  render() {
    const { isSignedIn, profile } = this.props;
    const menu = (
      <Menu onClick={this.handleClick}>
        <MenuItem key="control-panel">
          <Link to={authUrls.CONTROL_PANEL}>控制面板</Link>
        </MenuItem>
        <Divider />
        <MenuItem key="profile">
          <Link to={`${authUrls.PROFILE}/${profile.username}`}>个人资料</Link>
        </MenuItem>
        <Divider />
        <MenuItem key="change-password">
          <Link to={authUrls.PASSWORD}>修改密码</Link>
        </MenuItem>
        {
          profile.username === 'admin' ? <Divider /> : null
        }
        {
          profile.username === 'admin' ?
            (<MenuItem key="admin">
              <Link to={authUrls.ADMIN_MNG}>管理设置</Link>
            </MenuItem>) : null
        }
        <Divider />
        <MenuItem key="signout">
          <form method="POST" action={authUrls.SIGNOUT} ref="signoutForm">
              退出登录
          </form>
        </MenuItem>
      </Menu>
    );
    const navButton = isSignedIn ?
      <Dropdown trigger={['click']} overlay={menu}>
        <button className="btn btn-default">
          <span className="glyphicon glyphicon-user"></span>
        </button>
      </Dropdown>
      :
      <Link to={authUrls.SIGNIN} className={styles.link}>
        <button
          type="button"
          className={classNames('btn', 'btn-default', 'dropdown-toggle', styles.icon)}
        >
          <span className="glyphicon glyphicon-user"></span>
        </button>
      </Link>;
    return (
      <div className={styles.container}>
        <Link to="/">
          <img className={styles.logo} alt="logo" src={logo} />
        </Link>
        <div className={styles.user}>
          {
            profile.realName ?
              <h5 className={styles.name}>{profile.realName}</h5> :
              null
          }
          {navButton}
        </div>
      </div>
    );
  }

}

MDNav.propTypes = {
  profile: PropTypes.object,
  isSignedIn: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  profile: userProfileSelector,
  isSignedIn: userIsSignedInStatusSelector,
});

export default connect(mapStateToProps, null)(MDNav);
