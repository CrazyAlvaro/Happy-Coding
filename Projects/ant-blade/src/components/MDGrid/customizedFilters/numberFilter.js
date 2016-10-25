/* eslint-disable */
const utils = require('ag-grid').Utils;

function loadTemplate(template) {
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = template;
  return tempDiv;
}

function numberFilter() {}

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

numberFilter.prototype.init = function(params) {
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

numberFilter.prototype.onNewRowsLoaded = function() {
  const keepSelection = this.filterParams && this.filterParams.newRowsAction === 'keep';
  if (!keepSelection) {
    this.api.setType(EQUALS);
    this.api.setFilter(null);
  }
}

numberFilter.prototype.afterGuiAttached = function() {
  this.eFilterTextField.focus();
}

numberFilter.prototype.doesFilterPass = function(node) {
  if (this.filterNumber === null) {
    return true;
  }
  const value = this.valueGetter(node);
  if (!value && value !== 0) {
    return false;
  }
  let valueAsNumber;
  if (typeof value === 'number') {
    valueAsNumber = value;
  } else {
    valueAsNumber = parseFloat(value);
  }

  switch (this.filterType) {
    case EQUALS:
      return valueAsNumber === this.filterNumber;
    case LESS_THAN:
      return valueAsNumber < this.filterNumber;
    case GREATER_THAN:
      return valueAsNumber > this.filterNumber;
    case LESS_THAN_OR_EQUAL:
      return valueAsNumber <= this.filterNumber;
    case GREATER_THAN_OR_EQUAL:
      return valueAsNumber >= this.filterNumber;
    case NOT_EQUAL:
      return valueAsNumber != this.filterNumber;
    case BETWEEN_CLOSED: {
      if (this.filterNumber2 === null) {
        return valueAsNumber >= this.filterNumber;
      } else {
        return (valueAsNumber >= this.filterNumber && valueAsNumber <= this.filterNumber2);
      }
    }
    case BETWEEN_OPENED: {
      if (this.filterNumber2 === null) {
        return valueAsNumber > this.filterNumber;
      } else {
        return (valueAsNumber > this.filterNumber && valueAsNumber < this.filterNumber2);
      }
    }
    default:
      // should never happen
      console.warn('invalid filter type ' + this.filterType);
      return false;
  }
}

numberFilter.prototype.getGui = function() {
  return this.eGui;
}

numberFilter.prototype.isFilterActive = function() {
  return this.filterNumber !== null;
}

numberFilter.prototype.createTemplate = function() {
  return template
    .replace('[FILTER_A...]', this.localeTextFunc('filterOoo', 'from...'))
    .replace('[FILTER_B...]', this.localeTextFunc('filterOoo', 'to...'))
    .replace('[EQUALS]', this.localeTextFunc('equals', 'Equals'))
    .replace('[LESS THAN]', this.localeTextFunc('lessThan', 'Less than'))
    .replace('[GREATER THAN]', this.localeTextFunc('greaterThan', 'Greater than'))
    .replace('[LESS THAN OR EQUAL]', this.localeTextFunc('lessThanOrEqual', 'Less than or equal'))
    .replace('[GREATER THAN OR EQUAL]', this.localeTextFunc('greaterThanOrEqual', 'Greater than or equal'))
    .replace('[NOT EQUAL]', this.localeTextFunc('notEqual', 'Not equal'))
    .replace('[APPLY FILTER]', this.localeTextFunc('applyFilter', 'Apply Filter'))
    .replace('[BETWEEN CLOSED]', this.localeTextFunc('betweenClosed', 'Between Closed'))
    .replace('[BETWEEN OPENED]', this.localeTextFunc('betweenOpened', 'Between Opened'));
}

numberFilter.prototype.createGui = function() {
  this.eGui = loadTemplate(this.createTemplate());
  this.eFilterTextField = this.eGui.querySelector('#filterText');
  this.eFilterTextField2 = this.eGui.querySelector('#filterText2');
  this.eTypeSelect = this.eGui.querySelector('#filterType');

  utils.addChangeListener(this.eFilterTextField, this.onFilterChanged.bind(this));
  utils.addChangeListener(this.eFilterTextField2, this.onFilterChanged.bind(this));
  this.eTypeSelect.addEventListener("change", this.onTypeChanged.bind(this));
  this.setupApply();
}

numberFilter.prototype.setupApply = function() {
  if (this.applyActive) {
    this.eApplyButton = this.eGui.querySelector('#applyButton');
    this.eApplyButton.addEventListener('click', () => {
      this.filterChangedCallback();
    })
  } else {
    utils.removeElement(this.eGui, '#applyPanel');
  }
}

numberFilter.prototype.onTypeChanged = function() {
  this.filterType = parseInt(this.eTypeSelect.value);
  const filterText2 = this.eGui.querySelector('#filterText2');
  if (this.filterType === 7 || this.filterType === 8) {
    filterText2.hidden = false;
  } else {
    filterText2.hidden = true;
  }
  this.filterChanged();
}

numberFilter.prototype.filterChanged = function() {
  this.filterModifiedCallback();
  if (!this.applyActive) {
    this.filterChangedCallback();
  }
}

numberFilter.prototype.onFilterChanged = function() {
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
    newFilter = parseFloat(filterText);
  } else {
    newFilter = null;
  }
  if (filterText2!==null && filterText!==undefined) {
    newFilter2 = parseFloat(filterText2);
  } else {
    newFilter2 = null;
  }
  if (this.filterNumber !== newFilter || this.filterNumber2 !==newFilter2) {
    this.filterNumber = newFilter;
    this.filterNumber2 = newFilter2;
    this.filterChanged();
  }
}

numberFilter.prototype.createApi = function() {
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

      if (filter !== null && !(typeof filter === 'number')) {
        filter = parseFloat(filter);
      }
      that.filterNumber = filter;
      that.eFilterTextField.value = filter;
    },
    getType: function () {
      return that.filterType;
    },
    getFilter: function () {
      return that.filterNumber;
    },
    getModel: function () {
      if (that.isFilterActive()) {
        return {
          type: that.filterType,
          filter: that.filterNumber,
          filter2: that.filterNumber2,
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

numberFilter.prototype.getApi = function() {
  return this.api;
}

export default numberFilter;

/* eslint-enable */
