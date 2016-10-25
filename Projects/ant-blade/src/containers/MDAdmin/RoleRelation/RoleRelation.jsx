import React, { PropTypes, Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router';
import { Nav, NavItem, Col } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  createRoleRelationRemote,
  loadRoleRelationRemote,
  deleteRoleRelationRemote,
  loadRoleRemote,
} from '../../../modules/roleRelation/actions';
import styles from '../MDAdmin.css';
import authUrls from '../../../../common/authUrls';
import 'jquery';
import 'bootstrap';
import 'react-select/dist/react-select.css';
import 'react-bootstrap-table/css/react-bootstrap-table.min.css';

class RoleRelation extends Component {
  constructor() {
    super();
    this.switchTableOption = this.switchTableOption.bind(this);
    this.createRoleRelation = this.createRoleRelation.bind(this);
    this.updateAccountingDepartment = this.updateAccountingDepartment.bind(this);
    this.updateBusinessDepartment = this.updateBusinessDepartment.bind(this);
    this.mapRoleArrayToOptions = this.mapRoleArrayToOptions.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.getCheckBoxList = this.getCheckBoxList.bind(this);
    this.updateByTableOption = this.updateByTableOption.bind(this);

    this.state = {
      tableOption: 'Sale',
    };

    this.finOptions = [];
    this.entOptions = [];
    this.relations = [];
  }

  componentDidMount() {
    this.props.actions.loadRoleRemote();
  }

  onDeleteRow(rows) {
    rows.forEach((id) => {
      const relation = this.relations.find(element => element.id === id);
      this.props.actions.deleteRoleRelationRemote(
        relation.parentRole,
        relation.parentType,
        relation.childRole,
        relation.childType,
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


  getRoleRelationTable() {
    this.updateByTableOption();

    return (
      <div className={styles['role-role-table']}>
        <BootstrapTable
          striped pagination deleteRow hover height="352px" ref="table"
          data={this.relations} selectRow={{ mode: 'checkbox' }}
          options={{ onDeleteRow: this.onDeleteRow, deleteText: '删除', noDataText: '没有数据显示' }}
        >
          <TableHeaderColumn dataField="id" isKey hidden>Relation ID</TableHeaderColumn>
          <TableHeaderColumn dataField="parentRole" width="320">财务部</TableHeaderColumn>
          <TableHeaderColumn dataField="childRole" width="320">业务部</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }

  getCreator() {
    this.updateByTableOption();
    this.finOptions = this.mapRoleArrayToOptions(this.finOptions);
    this.entOptions = this.mapRoleArrayToOptions(this.entOptions);

    return (
      <div className={styles.creator}>
        <div className={styles['select-button-group']}>
          <Select
            name="accounting"
            value={this.state.selectAccounting}
            placeholder="财务部"
            clearable={false}
            options={this.finOptions}
            onChange={this.updateAccountingDepartment}
            className={styles['select-button']}
          />
          <Select
            name="business"
            value={this.state.selectBusiness}
            placeholder="事业部"
            clearable={false}
            options={this.entOptions}
            onChange={this.updateBusinessDepartment}
            className={styles['select-button']}
          />
          <div className={styles.button}>
            <button
              type="button"
              disabled={!(this.state.selectBusiness && this.state.selectAccounting)}
              className="btn btn-primary btn-block"
              onClick={this.createRoleRelation}
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

  arrayAddId(arr) {
    return arr.map((item, index) => ({ ...item, id: index }));
  }

  updateByTableOption() {
    switch (this.state.tableOption) {
      case 'Rev':
        this.finOptions = this.props.revFinRoles;
        this.entOptions = this.props.revEntRoles;
        this.relations = this.arrayAddId(this.props.revRoleRelations);
        break;
      case 'Sale':
        this.finOptions = this.props.saleFinRoles;
        this.entOptions = this.props.saleEntRoles;
        this.relations = this.arrayAddId(this.props.saleRoleRelations);
        break;
      default:
        this.relations = this.arrayAddId(this.props.saleRoleRelations);
    }
  }

  createRoleRelation() {
    const parentRole = this.state.selectAccounting.label;
    const parentType = this.state.selectAccounting.roleType;
    const childRole = this.state.selectBusiness.label;
    const childType = this.state.selectBusiness.roleType;

    this.props.actions.createRoleRelationRemote(parentRole, parentType, childRole, childType);
  }

  updateAccountingDepartment(department) {
    this.setState({
      selectAccounting: department,
    });
  }

  updateBusinessDepartment(department) {
    this.setState({
      selectBusiness: department,
    });
  }

  switchTableOption(e) {
    this.setState({
      tableOption: e.target.value,
    });
  }

  mapRoleArrayToOptions(roles) {
    return roles.map((role, index) => ({
      ...role,
      value: index,
      label: role.roleName,
    }));
  }

  render() {
    const roleRoleTable = this.getRoleRelationTable();
    const creator = this.getCreator();
    const tableOptions = this.getCheckBoxList();
    const returnButton = this.getReturnButton();

    return (
      <div className={styles.container}>
        {tableOptions}
        <Col md={8}>
          {roleRoleTable}
          {creator}
        </Col>
        {returnButton}
      </div>
    );
  }
}

RoleRelation.propTypes = {
  actions: PropTypes.object.isRequired,
  saleRoleRelations: PropTypes.array.isRequired,
  revRoleRelations: PropTypes.array.isRequired,
  saleFinRoles: PropTypes.array.isRequired,
  saleEntRoles: PropTypes.array.isRequired,
  revFinRoles: PropTypes.array.isRequired,
  revEntRoles: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    saleRoleRelations: state.roleRelationLoad.saleRoleRelations,
    revRoleRelations: state.roleRelationLoad.revRoleRelations,
    saleFinRoles: state.roleLoad.saleFinRoles,
    saleEntRoles: state.roleLoad.saleEntRoles,
    revFinRoles: state.roleLoad.revFinRoles,
    revEntRoles: state.roleLoad.revEntRoles,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      createRoleRelationRemote,
      loadRoleRelationRemote,
      deleteRoleRelationRemote,
      loadRoleRemote,
    }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleRelation);
