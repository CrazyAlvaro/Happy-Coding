import React from 'react';
import { Link } from 'react-router';
import authUrls from '../../../common/authUrls';
import styles from './MDAdmin.css';

const MDAdmin = () => (
  <div className={styles.admin_container}>
    <Link to={authUrls.USER}>
      <button type="button" className="btn btn-lg btn-info btn-space" >
        人员列表
      </button>
    </Link>
    <Link to={authUrls.ROLE}>
      <button type="button" className="btn btn-lg btn-info btn-space" >
        部门列表
      </button>
    </Link>
    <Link to={authUrls.USER_ROLE}>
      <button type="button" className="btn btn-lg btn-info btn-space" >
        人员部门关系
      </button>
    </Link>
    <Link to={authUrls.ROLE_RELATION}>
      <button type="button" className="btn btn-lg btn-info btn-space" >
        部门关系
      </button>
    </Link>
  </div>
);

export default MDAdmin;
