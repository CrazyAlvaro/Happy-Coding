import _ from 'lodash';
import numberFilter from './customizedFilters/numberFilter';
import dateFilter from './customizedFilters/dateFilter';
import moment from 'moment';
moment.locale('zh-cn');
import { saveAs } from 'file-saver';
import { readCSVTableApi } from '../../utils/fetchApi';
import { SALE_ENT, REV_ENT } from '../../../common/roleConstants';
import { SALE_TABLE, REV_TABLE } from '../../../common/tableConstants';
import 'text-encoding/lib/encoding-indexes';
import { TextEncoder } from 'text-encoding/lib/encoding';

function getLocaleString(datetime) {
  const year = datetime.getFullYear();
  const month = datetime.getMonth() + 1;
  const day = datetime.getDate();
  return `${year}-${month}-${day}`;
}

function dataType2filter(dataType) {
  switch (dataType) {
    case 'number':
      return numberFilter;
    case 'date':
      return dateFilter;
    case 'string':
      return 'text'; // make lint happy
      // TODO: this should be uncomment when setFilter is done
      // return 'set';
    default:
      return 'text';
  }
}

export function addFiltersForAllColumns(columnDefs) {
  // this function only use one datum piece to infer the
  // corresponding filters for all columns
  const dataTypes = _.map(columnDefs, columnDef => {
    const { type } = columnDef;
    switch (type) {
      case 'numeric':
      case 'bigint':
        return 'number';
      case 'date':
      case 'timestamp without time zone':
        return 'date';
      case 'character varying':
        return 'string';
      default:
        // winston.warn(`The type of ${dataType} is not supported`);
        return '';
    }
  });

  return _.map(columnDefs, (val, key) => ({ ...val, filter: dataType2filter(dataTypes[key]) }));
}

// TODO first customize setFilter then implement this
function generateSetFilterQuery() {
  return '';
}

function generateTextFilterQuery(key, val) {
  const { filter, type } = val;
  switch (type) {
    case 1:
      return `${key}=like.%${filter}%`;
    case 2:
      return `${key}=like.${filter}`;
    case 3:
      return `${key}=ilike.${filter}`;
    case 4:
      return `${key}=like.${filter}%`;
    case 5:
      return `${key}=like.%${filter}`;
    default:
      // winston.warn('this type of date filter is not supported');
      return '';
  }
}

function generateNumberFilterQuery(key, val) {
  const { filter, filter2, type } = val;
  switch (type) {
    case 1:
      return `${key}=eq.${filter}`;
    case 2:
      return `${key}=neq.${filter}`;
    case 3:
      return `${key}=lt.${filter}`;
    case 4:
      return `${key}=lte.${filter}`;
    case 5:
      return `${key}=gt.${filter}`;
    case 6:
      return `${key}=gte.${filter}`;
    case 7:
      return `${key}=gte.${filter}&${key}=lte.${filter2}`;
    case 8:
      return `${key}=gt.${filter}&${key}=lt.${filter2}`;
    default:
      // winston.warn('this type of number filter is not supported');
      return '';
  }
}

function generateDateFilterQuery(key, val) {
  const { filter, filter2, type } = val;
  const localeFilter = getLocaleString(new Date(filter));
  const localeFilter2 = getLocaleString(new Date(filter2));

  switch (type) {
    case 1:
      return `${key}=eq.${localeFilter}`;
    case 2:
      return `${key}=neq.${localeFilter}`;
    case 3:
      return `${key}=lt.${localeFilter}`;
    case 4:
      return `${key}=lte.${localeFilter}`;
    case 5:
      return `${key}=gt.${localeFilter}`;
    case 6:
      return `${key}=gte.${localeFilter}`;
    case 7:
      return `${key}=gte.${localeFilter}&${key}=lte.${localeFilter2}`;
    case 8:
      return `${key}=gt.${localeFilter}&${key}=lt.${localeFilter2}`;
    default:
      // winston.warn('this type of number filter is not supported');
      return '';
  }
}

function generateFilterQuery(
  filterModel,
  filterTypes,
  flattenedRoles,
  tableId
) {
  let query = _.reduce(filterModel, (res, val, key) => {
    const filterType = filterTypes[key].name || filterTypes[key];
    let subQuery = '';
    switch (filterType) {
      case 'set':
        subQuery = generateSetFilterQuery(key, val);
        break;
      case 'text':
        subQuery = generateTextFilterQuery(key, val);
        break;
      case 'numberFilter':
        subQuery = generateNumberFilterQuery(key, val);
        break;
      case 'dateFilter':
        subQuery = generateDateFilterQuery(key, val);
        break;
      default:
        // winston.warn('this filter is not supported');
        break;
    }
    if (!!subQuery) {
      return !!res ? `${res}&${subQuery}` : subQuery;
    }
    return res;
  }, '');

  switch (tableId) {
    case '销售序时':
      query = `${query}&用友校对事业部=in.${flattenedRoles.join(',')}`;
      break;
    case '收付款序时':
      // TODOs
      // should have a column to filter 收付款序时,
      // which is not clear now
      break;
    default:
      break;
  }

  return query;
}

function generateSortQuery(sortModel) {
  const query = _.reduce(sortModel, (res, val) => {
    const { colId, sort } = val;
    return !!res ? `${res},${colId}.${sort}` : `order=${colId}.${sort}`;
  }, '');
  return query;
}

export function generateQuery(
  sortModel,
  filterModel,
  filterTypes,
  flattenedRoles,
  tableId
) {
  const filterQuery = generateFilterQuery(
    filterModel,
    filterTypes,
    flattenedRoles,
    tableId
  );
  const sortQuery = generateSortQuery(sortModel);
  if (!!filterQuery && !!sortQuery) {
    return `?${filterQuery}&${sortQuery}`;
  } else if (!!filterQuery) {
    return `?${filterQuery}`;
  } else if (!!sortQuery) {
    return `?${sortQuery}`;
  }
  return '';
}

export async function saveToCSV(tableId, query) {
  // this is to support Windows only, so it might just break in Mac, which is
  // fine for us
  const encoding = 'GB18030';
  const csv = await readCSVTableApi(tableId, query);
  const arr = new TextEncoder(encoding, { NONSTANDARD_allowLegacyEncoding: true }).encode(csv);
  const blob = new Blob([arr], { type: `text/csv;charset=${encoding}` });
  saveAs(blob, `${tableId}-导出-${moment().format('llll')}.csv`);
}


export function getValidRoleSet(roles, roleType) {
  const validRoles = _(roles)
    .filter({ roleType })
    .map('roleType');
  return new Set(validRoles);
}

export function flattenRoles(roles, tableId) {
  const result = _.reduce(roles, (res, role) => {
    if (role.childRoles.length > 0) {
      _.forEach(role.childRoles, childRole => {
        switch (tableId) {
          case SALE_TABLE:
            if (childRole.roleType === SALE_ENT) {
              res.push(childRole.roleName);
            }
            break;
          case REV_TABLE:
            if (childRole.roleType === REV_ENT) {
              res.push(childRole.roleName);
            }
            break;
          default:
            break;
        }
      });
    }
    return res;
  }, []);
  return result;
}
