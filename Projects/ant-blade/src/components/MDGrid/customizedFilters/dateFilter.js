/* eslint-disable */
const utils = require('ag-grid').Utils;

function loadTemplate(template) {
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = template;
  return tempDiv;
}

function dateFilter() {}

const template = `
  <div>
    <div>
      <select class="ag-filter-select" id="filterType">
        <option value="1">[EQUALS]</option>
        <option value="2">[NOT EQUAL]</option>
        <option value="3">[LESS THAN]</option>
        <option value="4">[LESS THAN OR EQUAL]</option>
        <option value="5">[GREATER THAN]</option>
        <option value="6">[GREATER THAN OR EQUAL]</option>
        <option value="7">[BETWEEN CLOSED]</option>
        <option value="8">[BETWEEN OPENED]</option>
      </select>
    </div>
    <div>
      <input class="ag-filter-filter" id="filterText" type="text" placeholder="[FILTER_A...]" />
    </div>
    <div>
      <input class="ag-filter-filter" id="filterText2" type="text" placeholder="[FILTER_B...]" hidden="true" />
    </div>
    <div class="ag-filter-apply-panel" id="applyPanel">
      <button type="button" id="applyButton">[APPLY FILTER]</button>
    </div>
  </div>
`;

const EQUALS = 1;
const NOT_EQUAL = 2;
const LESS_THAN = 3;
const LESS_THAN_OR_EQUAL = 4;
const GREATER_THAN = 5;
const GREATER_THAN_OR_EQUAL = 6;
const BETWEEN_CLOSED = 7;
const BETWEEN_OPENED = 8;

dateFilter.prototype.init = function(params) {
  this.filterParams = params.filterParams;
  this.applyActive = this.filterParams && this.filterParams.apply === true;
  this.filterChangedCallback = params.filterChangedCallback;
  this.filterModifiedCallback = params.filterModifiedCallback;
  this.localeTextFunc = params.localeTextFunc;
  this.valueGetter = params.valueGetter;
  this.createGui();
  this.filterText = null;
  this.filterType = EQUALS;
  this.createApi();
}

dateFilter.prototype.onNewRowsLoaded = function() {
  const keepSelection = this.filterParams && this.filterParams.newRowsAction === 'keep';
  if (!keepSelection) {
    this.api.setType(EQUALS);
    this.api.setFilter(null);
  }
}

dateFilter.prototype.afterGuiAttached = function() {
  this.eFilterTextField.focus();
}

dateFilter.prototype.doesFilterPass = function(node) {
  if (this.filterDate === null) {
    return true;
  }
  const value = this.valueGetter(node);
  if (!value) {
    return false;
  }
  const valueAsDate = Date.parse(value);

  switch (this.filterType) {
    case EQUALS:
      return valueAsDate === this.filterDate;
    case LESS_THAN:
      return valueAsDate < this.filterDate;
    case GREATER_THAN:
      return valueAsDate > this.filterDate;
    case LESS_THAN_OR_EQUAL:
      return valueAsDate <= this.filterDate;
    case GREATER_THAN_OR_EQUAL:
      return valueAsDate >= this.filterDate;
    case NOT_EQUAL:
      return valueAsDate != this.filterDate;
    case BETWEEN_CLOSED: {
      if (this.filterDate2 === null) {
        return valueAsDate >= this.filterDate;
      } else {
        return (valueAsDate >= this.filterDate && valueAsDate <= this.filterDate2);
      }
    }
    case BETWEEN_OPENED: {
      if (this.filterDate2 === null) {
        return valueAsDate > this.filterDate;
      } else {
        return (valueAsDate > this.filterDate && valueAsDate < this.filterDate2);
      }
    }
    default:
      // should never happen
      console.warn('invalid filter type ' + this.filterType);
      return false;
  }
}

dateFilter.prototype.getGui = function() {
  return this.eGui;
}

dateFilter.prototype.isFilterActive = function() {
  return this.filterDate !== null;
}

dateFilter.prototype.createTemplate = function() {
  return template
    .replace('[FILTER_A...]', this.localeTextFunc('filterOoo', 'from...'))
    .replace('[FILTER_B...]', this.localeTextFunc('filterOoo', 'to...'))
    .replace('[EQUALS]', this.localeTextFunc('timeEquals', 'Time equals'))
    .replace('[LESS THAN]', this.localeTextFunc('timeBefore', 'Time before'))
    .replace('[GREATER THAN]', this.localeTextFunc('timeAfter', 'Time after'))
    .replace('[LESS THAN OR EQUAL]', this.localeTextFunc('timeBeforeOrEquals', 'Time before or equals'))
    .replace('[GREATER THAN OR EQUAL]', this.localeTextFunc('timeAfterOrEquals', 'Time after or equals'))
    .replace('[NOT EQUAL]', this.localeTextFunc('timeNotEquals', 'Time not equals'))
    .replace('[APPLY FILTER]', this.localeTextFunc('applyFilter', 'Apply Filter'))
    .replace('[BETWEEN CLOSED]', this.localeTextFunc('timeBetweenClosed', 'Time between closed'))
    .replace('[BETWEEN OPENED]', this.localeTextFunc('timeBetweenOpened', 'Time between opened'));
}

dateFilter.prototype.createGui = function() {
  this.eGui = loadTemplate(this.createTemplate());
  this.eFilterTextField = this.eGui.querySelector('#filterText');
  this.eFilterTextField2 = this.eGui.querySelector('#filterText2');
  this.eTypeSelect = this.eGui.querySelector('#filterType');

  utils.addChangeListener(this.eFilterTextField, this.onFilterChanged.bind(this));
  utils.addChangeListener(this.eFilterTextField2, this.onFilterChanged.bind(this));
  this.eTypeSelect.addEventListener("change", this.onTypeChanged.bind(this));
  this.setupApply();
}

dateFilter.prototype.setupApply = function() {
  if (this.applyActive) {
    this.eApplyButton = this.eGui.querySelector('#applyButton');
    this.eApplyButton.addEventListener('click', () => {
      this.filterChangedCallback();
    })
  } else {
    utils.removeElement(this.eGui, '#applyPanel');
  }
}

dateFilter.prototype.onTypeChanged = function() {
  this.filterType = parseInt(this.eTypeSelect.value);
  const filterText2 = this.eGui.querySelector('#filterText2');
  if (this.filterType === 7 || this.filterType === 8) {
    filterText2.hidden = false;
  } else {
    filterText2.hidden = true;
  }
  this.filterChanged();
}

dateFilter.prototype.filterChanged = function() {
  this.filterModifiedCallback();
  if (!this.applyActive) {
    this.filterChangedCallback();
  }
}

dateFilter.prototype.onFilterChanged = function() {
  let filterText = utils.makeNull(this.eFilterTextField.value);
  let filterText2 = utils.makeNull(this.eFilterTextField2.value);
  if (filterText && filterText.trim() === '') {
    filterText = null;
  }
  if (filterText2 && filterText2.trim() === '') {
    filterText2 = null;
  }
  let newFilter;
  let newFilter2;
  if (filterText!==null && filterText!==undefined) {
    newFilter = Date.parse(filterText);
  } else {
    newFilter = null;
  }
  if (filterText2!==null && filterText!==undefined) {
    newFilter2 = Date.parse(filterText2);
  } else {
    newFilter2 = null;
  }
  if (this.filterDate !== newFilter || this.filterDate2 !==newFilter2) {
    this.filterDate = newFilter;
    this.filterDate2 = newFilter2;
    this.filterChanged();
  }
}

dateFilter.prototype.createApi = function() {
  const that = this;
  this.api = {
    EQUALS: EQUALS,
    NOT_EQUAL: NOT_EQUAL,
    LESS_THAN: LESS_THAN,
    GREATER_THAN: GREATER_THAN,
    LESS_THAN_OR_EQUAL: LESS_THAN_OR_EQUAL,
    GREATER_THAN_OR_EQUAL: GREATER_THAN_OR_EQUAL,
    setType: function (type) {
      that.filterType = type;
      that.eTypeSelect.value = type;
    },
    setFilter: function (filter) {
      filter = utils.makeNull(filter);

      if (filter !== null) {
        filter = Date.parse(filter);
      }
      that.filterDate = filter;
      that.eFilterTextField.value = filter;
    },
    getType: function () {
      return that.filterType;
    },
    getFilter: function () {
      return that.filterDate;
    },
    getModel: function () {
      if (that.isFilterActive()) {
        return {
          type: that.filterType,
          filter: that.filterDate,
          filter2: that.filterDate2,
        };
      } else {
        return null;
      }
    },
    setModel: function (dataModel) {
      if (dataModel) {
        this.setType(dataModel.type);
        this.setFilter(dataModel.filter);
      } else {
        this.setFilter(null);
      }
    }
  };
}

dateFilter.prototype.getApi = function() {
  return this.api;
}

export default dateFilter;

/* eslint-enable */
