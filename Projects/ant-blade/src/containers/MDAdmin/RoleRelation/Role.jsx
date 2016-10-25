import React, { PropTypes, Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Nav, NavItem, Col } from 'react-bootstrap';
import {
  createRoleRemote,
  loadRoleRemote,
  deleteRoleRemote,
} from '../../../modules/roleRelation/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from '../MDAdmin.css';
import authUrls from '../../../../common/authUrls';
import 'jquery';
import 'bootstrap';
import 'react-select/dist/react-select.css';
import 'react-bootstrap-table/css/react-bootstrap-table.min.css';
import {
  SALE_FIN,
  SALE_ENT,
  REV_FIN,
  REV_ENT,
} from '../../../../common/roleConstants';

class Role extends Component {
  constructor() {
    super();
    this.switchTableOption = this.switchTableOption.bind(this);
    this.onCreateRole = this.onCreateRole.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleRoleNameInput = this.handleRoleNameInput.bind(this);
    this.updateDepartment = this.updateDepartment.bind(this);
    this.convertRoleType = this.convertRoleType.bind(this);
    this.updateByTableOption = this.updateByTableOption.bind(this);

    this.state = {
      tableOption: 'Sale',
      newRoleName: '',
    };
  }

  componentDidMount() {
    this.props.actions.loadRoleRemote();
  }

  onCreateRole() {
    const roleType = this.convertRoleType(
      `${this.state.tableOption}_${this.state.selectDepartment.value}`.toUpperCase()
    );
    const roleName = this.state.newRoleName;
    this.props.actions.createRoleRemote(roleName, roleType);
    this.setState({ newRoleName: '' });
  }

  onDeleteRow(rows) {
    rows.forEach((id) => {
      const role = this.roles.find(element => element._id === id);
      this.props.actions.deleteRoleRemote(role.roleName, role.roleType);
    });
    this.refs.table.cleanSelected();
  }

  getRoleTable() {
    this.updateByTableOption();

    return (
      <div className={styles['role-table']}>
        <BootstrapTable
          striped pagination deleteRow hover height="352px" ref="table"
          data={this.roles} selectRow={{ mode: 'checkbox' }}
          options={{ onDeleteRow: this.onDeleteRow, deleteText: '删除部门', noDataText: '没有部门数据显示' }}
        >
          <TableHeaderColumn dataField="_id" isKey hidden>Relation ID</TableHeaderColumn>
          <TableHeaderColumn dataField="roleType" width="320">部门类型</TableHeaderColumn>
          <TableHeaderColumn dataField="roleName" width="320">部门名称</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
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

  getCreator() {
    return (
      <div className={styles.creator}>
        <div className={styles['select-button-group']}>
          <Select
            value={this.state.selectDepartment}
            placeholder="部门类型"
            clearable={false}
            options={[
              { value: 'Fin', label: '财务部' },
              { value: 'Ent', label: '业务部' },
            ]}
            onChange={this.updateDepartment}
            className={styles['select-button']}
          />
          <div>
            <input
              value={this.state.newRoleName}
              onChange={this.handleRoleNameInput}
              className={styles.input}
            />
          </div>
          <div className={styles.button}>
            <button
              type="button"
              disabled={!(this.state.newRoleName && this.state.selectDepartment)}
              className="btn btn-primary btn-block"
              onClick={this.onCreateRole}
            >
              添加
            </button>
          </div>
        </div>
      </div>
    );
  }

  convertRoleType(roleType) {
    switch (roleType) {
      case 'SALE_FIN':
        return SALE_FIN;
      case 'SALE_ENT':
        return SALE_ENT;
      case 'REV_FIN':
        return REV_FIN;
      case 'REV_ENT':
        return REV_ENT;
      default:
        return 'ERROR';
    }
  }

  updateDepartment(department) {
    this.setState({ selectDepartment: department });
  }

  handleRoleNameInput(event) {
    this.setState({ newRoleName: event.target.value.substr(0, 140) });
  }

  switchTableOption(e) {
    this.setState({
      tableOption: e.target.value,
    });
  }

  updateByTableOption() {
    switch (this.state.tableOption) {
      case 'Rev':
        this.roles = this.props.revFinRoles.concat(this.props.revEntRoles);
        break;
      case 'Sale':
        this.roles = this.props.saleFinRoles.concat(this.props.saleEntRoles);
        break;
      default:
        this.roles = [];
    }
  }

  render() {
    const roleTable = this.getRoleTable();
    const tableOptions = this.getCheckBoxList();
    const creator = this.getCreator();
    const returnButton = this.getReturnButton();

    return (
      <div className={styles.container}>
        {tableOptions}
        <Col md={8}>
          {roleTable}
          {creator}
        </Col>
        {returnButton}
      </div>
    );
  }
}

Role.propTypes = {
  actions: PropTypes.object,
  saleFinRoles: PropTypes.array.isRequired,
  saleEntRoles: PropTypes.array.isRequired,
  revFinRoles: PropTypes.array.isRequired,
  revEntRoles: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    saleFinRoles: state.roleLoad.saleFinRoles,
    saleEntRoles: state.roleLoad.saleEntRoles,
    revFinRoles: state.roleLoad.revFinRoles,
    revEntRoles: state.roleLoad.revEntRoles,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      createRoleRemote,
      loadRoleRemote,
      deleteRoleRemote,
    }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Role);
