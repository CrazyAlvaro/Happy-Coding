import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { MDSignin } from '../../components';
import styles from './Home.css';
import SideMenu from '../SideMenu/SideMenu';
import _ from 'lodash';

import logo from './logo.png';

class Home extends Component {

  getFrontPage() {
    return (
      <div className={styles.frontContainer}>
        <div className={styles.title}>
          欢迎来到马达数据南极人数据平台
        </div>
        <MDSignin />
      </div>
    );
  }

  getHomePage() {
    const { children } = this.props;
    return (
      <div className={styles.homeContainer}>
        <SideMenu />
        {children || <div className={styles.logo}><img src={logo} alt="logo" /></div>}
      </div>
    );
  }

  render() {
    const { profile } = this.props;
    if (!_.isEmpty(profile)) return this.getHomePage();
    return this.getFrontPage();
  }
}

Home.propTypes = {
  profile: PropTypes.object,
  children: PropTypes.object,
};

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(Home);
