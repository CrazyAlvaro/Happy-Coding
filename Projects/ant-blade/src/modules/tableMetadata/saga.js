import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from './action';
import { readMetaApi } from '../../utils/fetchApi';
import _ from 'lodash';
import moment from 'moment';
moment.locale('zh-cn');

const editables = {
  贴牌对照表: ['产品'],
  销售序时: ['备注', '发票日期', '发票号码', '产品-手工'],
  收付款序时: ['产品', '服务费发票号码', '辅料费发票号码'],
  '收付款序时-上年': ['凭证类型', '客户编码', '摘要', '上年服务费余额', '上年辅料费余额', '上年快递费余额', '本年快递费', '产品', '现金/冲抵'],
  '产品-部门': ['产品', '项目', '事业部群'],
};

function isEditable(id, itemName) {
  return _.includes(_.get(editables, id, []), itemName);
}

function isDate(itemName) {
  return _.endsWith(itemName, '日期') || _.endsWith(itemName, '时间');
}

function isPrice(itemName) {
  return _.endsWith(itemName, '单价') || _.endsWith(itemName, '金额')
    || _.endsWith(itemName, '费') || _.endsWith(itemName, '余额');
}

function isRate(itemName) {
  return _.endsWith(itemName, '费率');
}

function isQty(itemName) {
  return _.endsWith(itemName, '数量') || _.endsWith(itemName, '数') || _.endsWith(itemName, '合计');
}

function* loadTableMetadata(action) {
  const { id } = action;
  try {
    const data = yield call(readMetaApi, { tableId: id });
    const metadata = _.map(_.get(data, 'columns'), item => {
      let meta = {
        headerName: item.name,
        field: item.name,
        editable: false,
        stylable: false,
        minWidth: 70,
        type: item.type,
      };
      if (isEditable(id, item.name)) {
        meta = {
          ...meta,
          editable: true,
          cellStyle: { 'background-color': '#CAFCD8' },
        };
      }
      // not else, because not exclusive
      if (isDate(item.name)) {
        meta = {
          ...meta,
          sort: 'desc',
          cellRenderer: ({ value }) => {
            if (!_.isNil(value)) {
              return moment(value).format('YYYY-MM-DD HH:mm');
            }
            return '';
          },
          cellClass: () => ['date-cell'],
        };
      } else if (isQty(item.name)) {
        meta = {
          ...meta,
          cellRenderer: ({ value }) => {
            if (_.isFinite(Number.parseFloat(value))) {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            return '';
          },
          cellClass: () => ['qty-cell'],
          cellStyle: () => ({
            'text-align': 'right',
          }),
        };
      } else if (isRate(item.name)) {
        meta = {
          ...meta,
          cellRenderer: ({ value }) => {
            if (_.isFinite(Number.parseFloat(value))) {
              return `${_.round(value * 100, 2)}%`;
            }
            return '';
          },
          cellClass: () => ['rate-cell'],
          cellStyle: () => ({
            'text-align': 'right',
          }),
        };
      } else if (isPrice(item.name)) {
        meta = {
          ...meta,
          cellRenderer: ({ value }) => {
            if (_.isFinite(Number.parseFloat(value))) {
              return _.round(value, 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            return '';
          },
          cellClass: () => ['price-cell'],
          cellStyle: () => ({
            'text-align': 'right',
          }),
        };
      }
      return meta;
    });
    yield put(actions.loadTableMetadataSuccess({ metadata, name: id }));
  } catch (error) {
    yield put(actions.loadTableMetadataFail(error));
  }
}

export default function* watchLoadTableMetadata() {
  yield* takeEvery(actions.LOAD_TABLE_METADATA, loadTableMetadata);
}
