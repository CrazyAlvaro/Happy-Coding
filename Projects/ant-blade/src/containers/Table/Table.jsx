import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadTableMetadata } from '../../modules/tableMetadata/action';
import { openModal, closeModal, changeModalData } from '../../modules/modal/action';
import {
  tableMetadataSelector,
  tableMetadataFetchingStatusSelector,
  tableMetadataFetchingErrorSelector,
} from '../../modules/tableMetadata/selector';
import {
  addColumnModalStatusSelector,
  addColumnModalDataFormulaSelector,
} from '../../modules/modal/selector';
import {
  MDGrid,
  MDLoadingIndicator,
  MDErrorIndicator,
  MDModal,
  MDFormulaEditor,
} from '../../components';
import styles from './Table.css';

class Table extends Component {

  componentDidMount() {
    const id = this.props.params.id;
    this.props.actions.loadTableMetadata(id);
  }

  render() {
    const {
      actions,
      metadata,
      metadataFetchingStatus,
      metadataFetchingError,
      addColumnModalStatus,
      addColumnModalDataFormula,
    } = this.props;

    let content;
    if (metadataFetchingStatus) {
      content = <MDLoadingIndicator />;
    } else if (metadataFetchingError) {
      content = <MDErrorIndicator />;
    } else if (metadata) {
      content = (
        <div className={styles.table}>
          <MDGrid
            columnDefs={metadata}
            onAddColumn={() => { actions.openModal('addColumn'); }}
            tableId={this.props.params.id}
          />
          <MDModal
            isOpen={addColumnModalStatus}
            onCloseModal={() => { actions.closeModal({ id: 'addColumn', save: false }); }}
          >
            <h1>新增列</h1>
            <input
              value={addColumnModalDataFormula}
              onChange={(event) => {
                actions.changeModalData('addColumn.formula', event.target.value);
              }}
            />
            <MDFormulaEditor />
            <button
              onClick={() => {
                actions.closeModal({ id: 'addColumn', save: true });
              }}
            >OK</button>
          </MDModal>
        </div>
      );
    }
    return <div className={styles.container}>{content}</div>;
  }
}

Table.propTypes = {
  params: PropTypes.object,
  actions: PropTypes.object,
  metadata: PropTypes.array,
  metadataFetchingStatus: PropTypes.bool,
  metadataFetchingError: PropTypes.object,
  history: PropTypes.object,
  addColumnModalStatus: PropTypes.bool,
  addColumnModalDataFormula: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  metadata: tableMetadataSelector,
  metadataFetchingStatus: tableMetadataFetchingStatusSelector,
  metadataFetchingError: tableMetadataFetchingErrorSelector,
  addColumnModalStatus: addColumnModalStatusSelector,
  addColumnModalDataFormula: addColumnModalDataFormulaSelector,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      loadTableMetadata,
      openModal,
      closeModal,
      changeModalData,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
