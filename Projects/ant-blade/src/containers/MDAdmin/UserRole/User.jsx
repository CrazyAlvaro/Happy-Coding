import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Col, ListGroupItem } from 'react-bootstrap';
import { loadUserRemote } from '../../../modules/userRelation/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from '../MDAdmin.css';
import authUrls from '../../../../common/authUrls';
import 'jquery';
import 'bootstrap';
import 'react-select/dist/react-select.css';
import 'react-bootstrap-table/css/react-bootstrap-table.min.css';

class User extends Component {
  componentDidMount() {
    this.props.actions.loadUserRemote();
  }

  getUserTable() {
    const { users } = this.props;

    return (
      <div>
        <div className={styles.title}>
          <ListGroupItem className={styles.item} bsStyle="info">人员信息列表</ListGroupItem>
        </div>
        <div className={styles['role-role-table']}>
          <BootstrapTable
            striped hover pagination height="352px" data={users} options={{ noDataText: '没有数据显示' }}
          >
            <TableHeaderColumn dataField="_id" isKey hidden>User ID</TableHeaderColumn>
            <TableHeaderColumn dataField="username" width="280">用户名</TableHeaderColumn>
            <TableHeaderColumn dataField="realName" width="280">姓名</TableHeaderColumn>
            <TableHeaderColumn dataField="email" width="280">邮箱</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }

  getReturnButton() {
    return (
      <div>
        <Link to={authUrls.ADMIN_MNG}>
          <button className="btn btn-info btn-space" >
            返回管理主页
          </button>
        </Link>
      </div>
    );
  }


  render() {
    const userTable = this.getUserTable();
    const returnButton = this.getReturnButton();

    return (
      <div className={styles.container}>
        <Col md={8}>
          {userTable}
        </Col>
        {returnButton}
      </div>
    );
  }
}

User.propTypes = {
  actions: PropTypes.object,
  users: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    users: state.userLoad.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      loadUserRemote,
    }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
