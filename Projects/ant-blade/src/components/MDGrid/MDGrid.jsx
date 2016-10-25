import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  createTableDataRemote,
  updateTableDataRemote,
} from '../../modules/tableData/actions';
import { clearTableMetadata } from '../../modules/tableMetadata/action';
import { AgGridReact } from './ag-grid-react';
import localeText from './localeText';
import {
  addFiltersForAllColumns,
  generateQuery,
  saveToCSV,
  flattenRoles,
} from './utils';

import './ag-grid/main/styles/ag-grid.css';
import './ag-grid/main/styles/theme-blue.css';
import styles from './MDGrid.css';
import classNames from 'classnames';

import {
  readPartOfTableData,
} from '../../utils/fetchApi';
import {
  ROW_COUNT,
  PAGE_SIZE,
  OVERFLOW_SIZE,
  MAX_CONCURRENT_REQUESTS,
  MAX_PAGES_IN_CACHE,
} from './constants';

import _ from 'lodash';
import Mousetrap from 'mousetrap';

class MDGrid extends Component {

  constructor() {
    super();
    this.onGridReady = this.onGridReady.bind(this);
    this.onCellValueChanged = this.onCellValueChanged.bind(this);
    this.getContextMenuItems = this.getContextMenuItems.bind(this);
    this.autoSizeColumns = this.autoSizeColumns.bind(this);
    this.getDataSource = this.getDataSource.bind(this);
    this.query = '';
  }

  componentDidMount() {
    Mousetrap.bind(['command+shift+c', 'ctrl+shift+c'], () => this.copySeletedRange());
    Mousetrap.bind(['command+shift+h', 'ctrl+shift+h'], () => this.addNewLine());
    Mousetrap.bind(['command+shift+s', 'ctrl+shift+s'], () => this.saveTableAsCSV());
  }

  componentWillUnmount() {
    this.api.destroy();
    this.props.actions.clearTableMetadata();
  }

  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
    const dataSource = this.getDataSource();
    this.api.setDatasource(dataSource);
  }

  onCellValueChanged(cell) {
    const { oldValue, newValue, data } = cell;
    const { realName } = this.props;
    if ('修改人员' in data) {
      data['修改人员'] = realName;
    }
    if ('修改时间' in data) {
      data['修改时间'] = new Date();
    }
    const model = this.api.getModel();
    /* eslint-disable eqeqeq */
    if (oldValue != newValue) {
    /* eslint-enable eqeqeq */
      this.props.actions.updateTableDataRemote(
        this.props.tableId,
        [data.id],
        [data],
        model.reloadPage.bind(model)
      );
    }
  }

  getDataSource() {
    const { tableId, roles } = this.props;
    return {
      rowCount: ROW_COUNT,
      pageSize: PAGE_SIZE,
      overflowSize: OVERFLOW_SIZE,
      maxConcurrentRequests: MAX_CONCURRENT_REQUESTS,
      maxPagesInCache: MAX_PAGES_IN_CACHE,
      getRows: async (innerParams) => {
        const columnDefs = this.getCombinedColumnDefs();
        const filterTypes = _.zipObject(
          _.map(columnDefs, 'field'),
          _.map(columnDefs, 'filter')
        );
        const flattenedRoles = flattenRoles(roles, tableId);
        // user without any role will not be allowed to see the table
        if (_.includes(['销售序时', '收付款序时'], tableId) && flattenedRoles.length <= 0) return;
        this.query = generateQuery(
          innerParams.sortModel,
          innerParams.filterModel,
          filterTypes,
          flattenedRoles,
          tableId
        );
        // The -1 here is confusing. Due to the postgrest API
        // In postgrest: startRow -> endRow corresponds to [startRow, endRow]
        // In ag-grid: startRow -> endRow corresponds to [startRow, endRow)
        const rowsThisPage = await readPartOfTableData(
          this.props.tableId,
          this.query,
          innerParams.startRow,
          innerParams.endRow - 1
        );
        let lastRow = -1;
        if (rowsThisPage < PAGE_SIZE) {
          lastRow = innerParams.startRow + rowsThisPage.length;
        }
        innerParams.successCallback(rowsThisPage, lastRow);
        if (rowsThisPage.length > 0) {
          this.autoSizeColumns();
        }
      },
    };
  }

  getCombinedColumnDefs() {
    const { columnDefs } = this.props;
    const combinedColumnDefs = addFiltersForAllColumns(
      this.combineColumnDefs(columnDefs)
    );
    return combinedColumnDefs;
  }

  getContextMenuItems() {
    const result = [
      {
        name: '导出到CSV',
        shortcut: 'Ctrl + Shift + S',
        action: () => this.saveTableAsCSV(),
      },
      {
        name: '复制',
        shortcut: 'Ctrl + Shift + C',
        action: () => this.copySeletedRange(),
      },
      {
        name: '增加一行',
        shortcut: 'Ctrl + Shift + H',
        action: () => this.addNewLine(),
      },
    ];
    return result;
  }

  saveTableAsCSV() {
    const { query, props: { tableId } } = this;
    saveToCSV(tableId, query);
  }

  copySeletedRange() {
    const { api } = this;
    api.copySelectedRangeToClipboard();
  }

  addNewLineRemote(newDatum) {
    const { actions, tableId } = this.props;
    const model = this.api.getModel();
    actions.createTableDataRemote(
      tableId,
      [newDatum],
      model.reloadPage.bind(model)
    );
  }

  addNewLine() {
    const { tableId } = this.props;
    if (tableId === '产品-部门') {
      const newDatum = {
        产品: '',
        项目: '',
        事业部群: '',
      };
      this.addNewLineRemote(newDatum);
    }
    if (tableId === '收付款序时-上年') {
      const newDatum = {
        凭证类型: '',
        客户编码: '',
        摘要: '',
        上年服务费余额: 0,
        上年辅料费余额: 0,
        上年快递费余额: 0,
        本年快递费: 0,
        产品: '',
        '现金/冲抵': '',
      };
      this.addNewLineRemote(newDatum);
    }
  }

  autoSizeColumns() {
    const allColumnIds = _.map(this.props.columnDefs, 'field');
    this.columnApi.autoSizeColumns(allColumnIds);
  }

  combineColumnDefs(columnDefs) {
    const combinedColumnDefs = _.map(columnDefs, columnDef => {
      const { editable, stylable } = columnDef;
      let newColumnDef = { ...columnDef };
      if (editable) {
        newColumnDef = {
          ...newColumnDef,
          onCellValueChanged: this.onCellValueChanged,
        };
      }
      if (stylable) {
        newColumnDef = { ...newColumnDef, cellStyle: this.props.cellStyle };
      }
      return newColumnDef;
    });
    return combinedColumnDefs;
  }

  render() {
    const columnDefs = this.getCombinedColumnDefs();
    return (
      <div className={classNames('ag-blue', styles.container)}>
        <div className={styles.title} >{this.props.tableId}</div>
        <AgGridReact
          onGridReady={this.onGridReady}
          rowModelType="virtual"
          columnDefs={columnDefs}
          getContextMenuItems={this.getContextMenuItems}
          localeText={localeText}
          enableServerSideSorting
          enableServerSideFilter
          enableRangeSelection
          enableColResize
          enableCellChangeFlash
          rowHeight="22"
        />
      </div>
    );
  }
}

MDGrid.propTypes = {
  tableId: PropTypes.string.isRequired,
  columnDefs: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.object,
  cellStyle: PropTypes.func,
  roles: PropTypes.arrayOf(PropTypes.object),
  realName: PropTypes.string,
};

const mapStateToProps = state => ({
  roles: state.user.profile.roles,
  realName: state.user.profile.realName,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      createTableDataRemote,
      updateTableDataRemote,
      clearTableMetadata,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MDGrid);
