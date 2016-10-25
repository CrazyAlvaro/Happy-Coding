import React, { PropTypes, Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router';
import { Nav, NavItem, Col } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  createUserRoleRemote,
  deleteUserRoleRemote,
  loadUserRemote,
} from '../../../modules/userRelation/actions';
import { loadRoleRemote } from '../../../modules/roleRelation/actions';
import 'jquery';
import 'bootstrap';
import styles from '../MDAdmin.css';
import 'react-select/dist/react-select.css';
import 'react-bootstrap-table/css/react-bootstrap-table.min.css';
import authUrls from '../../../../common/authUrls';
import {
  SALE_FIN,
  REV_FIN,
} from '../../../../common/roleConstants';

class UserRole extends Component {
  constructor() {
    super();
    this.addUserRole = this.addUserRole.bind(this);
    this.updateUserValue = this.updateUserValue.bind(this);
    this.updateRoleValue = this.updateRoleValue.bind(this);
    this.mapRoleArrayToOptions = this.mapRoleArrayToOptions.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.switchTableOption = this.switchTableOption.bind(this);
    this.updateByTableOption = this.updateByTableOption.bind(this);

    this.state = { tableOption: 'Sale' };   // Initial Table Selection State
  }

  componentDidMount() {
    this.props.actions.loadUserRemote();
    this.props.actions.loadRoleRemote();
  }

  onDeleteRow(rows) {
    rows.forEach((id) => {
      const deleteUserRole = this.userRoleData.find(userRole => userRole.id === id);
      this.props.actions.deleteUserRoleRemote(
        deleteUserRole.username,
        deleteUserRole.roleName,
        deleteUserRole.roleType
      );
    });
    this.refs.table.cleanSelected();
  }

  getCheckBoxList() {
    return (
      <div className={styles.nav} data-toggle="buttons">
        <Nav bsStyle="pills" activeKey={this.state.tableOption}>
          <NavItem eventKey={'Rev'} value="Rev" onClick={this.switchTableOption}>
            收付款序时
          </NavItem>
          <NavItem eventKey={'Sale'} value="Sale" onClick={this.switchTableOption}>
            销售序时
          </NavItem>
        </Nav>
      </div>
    );
  }

  getUserRoleTable() {
    this.updateByTableOption();

    return (
      <div className={styles['role-role-table']}>
        <BootstrapTable
          striped hover pagination deleteRow height="352px" ref="table"
          data={this.userRoleData} selectRow={{ mode: 'checkbox' }}
          options={{ onDeleteRow: this.onDeleteRow, deleteText: '删除', noDataText: '没有数据显示' }}
        >
          <TableHeaderColumn dataField="id" isKey hidden>Relation ID</TableHeaderColumn>
          <TableHeaderColumn dataField="realName" width="320">用户</TableHeaderColumn>
          <TableHeaderColumn dataField="roleName" width="320">部门</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }

  getCreator() {
    this.updateByTableOption();
    this.userOptions = this.props.allUsers.map(user => ({
      ...user,
      value: user._id,
      label: user.realName,
    }));

    return (
      <div className={styles.creator}>
        <div className={styles['select-button-group']}>
          <Select
            name="user"
            value={this.state.selectUserValue}
            placeholder="工作人员"
            clearable={false}
            options={this.userOptions}
            onChange={this.updateUserValue}
            className={styles['select-button']}
          />
          <Select
            name="role"
            value={this.state.selectRoleValue}
            placeholder="部门"
            clearable={false}
            options={this.roleOptions}
            onChange={this.updateRoleValue}
            className={styles['select-button']}
          />
          <div className={styles.button}>
            <button
              type="button"
              className="btn btn-primary btn-block"
              disabled={!(this.state.selectUserValue && this.state.selectRoleValue)}
              onClick={this.addUserRole}
            >
              添加
            </button>
          </div>
        </div>
      </div>
    );
  }

  getReturnButton() {
    return (
      <div>
        <Link to={authUrls.ADMIN_MNG}>
          <button type="button" className="btn btn-info btn-space" >
            返回管理主页
          </button>
        </Link>
      </div>
    );
  }

  updateByTableOption() {
    const {
      revFinRoles,
      saleFinRoles,
      allUserRoles,
    } = this.props;

    this.userRoleData = [].concat.apply(
      [],
      Object.keys(allUserRoles).map(user =>
        allUserRoles[user].map(role => {
          const currUser = this.props.allUsers.find(u => u.username === user);
          return {
            id: user + role.roleName,
            username: user,
            realName: currUser.realName,
            roleName: role.roleName,
            roleType: role.roleType,
          };
        })
      )
    );

    switch (this.state.tableOption) {
      case 'Rev':
        this.roleOptions = this.mapRoleArrayToOptions(revFinRoles);
        this.userRoleData = this.userRoleData.filter(role => role.roleType === REV_FIN);
        break;
      case 'Sale':
        this.roleOptions = this.mapRoleArrayToOptions(saleFinRoles);
        this.userRoleData = this.userRoleData.filter(role => role.roleType === SALE_FIN);
        break;
      default:
    }
  }

  addUserRole() {
    this.props.actions.createUserRoleRemote(
      this.state.selectUserValue.username,
      this.state.selectRoleValue.roleName,
      this.state.selectRoleValue.roleType
    );
  }

  updateRoleValue(role) {
    this.setState({
      selectRoleValue: role,
    });
  }

  updateUserValue(user) {
    this.setState({
      selectUserValue: user,
    });
  }

  switchTableOption(e) {
    this.setState({
      tableOption: e.target.value,
    });
  }

  mapRoleArrayToOptions(roles) {
    return roles.map((role) => ({
      ...role,
      value: role._id,
      label: role.roleName,
    }));
  }

  render() {
    const userRoleTable = this.getUserRoleTable();
    const creator = this.getCreator();
    const tableOptions = this.getCheckBoxList();
    const returnButton = this.getReturnButton();

    return (
      <div className={styles.container}>
        {tableOptions}
        <Col md={8}>
          {userRoleTable}
          {creator}
        </Col>
        {returnButton}
      </div>
    );
  }
}

UserRole.propTypes = {
  actions: PropTypes.object,
  allUsers: PropTypes.array.isRequired,
  allUserRoles: PropTypes.object,
  saleFinRoles: PropTypes.array.isRequired,
  revFinRoles: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    allUsers: state.userLoad.users,
    allUserRoles: state.userRoleLoad.allUserRoles,
    saleFinRoles: state.roleLoad.saleFinRoles,
    revFinRoles: state.roleLoad.revFinRoles,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      createUserRoleRemote,
      deleteUserRoleRemote,
      loadUserRemote,
      loadRoleRemote,
    }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRole);
