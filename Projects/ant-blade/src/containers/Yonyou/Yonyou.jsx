import React, { Component, PropTypes } from 'react';
import { MDLoadingIndicator } from '../../components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { etlStatusSelector } from '../../modules/etl/selector';
import { runEtl } from '../../modules/etl/action';

import styles from './Yonyou.css';

class Yonyou extends Component {

  constructor() {
    super();
    this.handleStartEtl = this.handleStartEtl.bind(this);
  }

  handleStartEtl(e) {
    e.preventDefault();
    this.props.actions.runEtl();
  }

  render() {
    let indicator = this.props.isRunning ? <MDLoadingIndicator /> : null;
    return (
      <div className={styles.container}>
        <button
          type="button"
          onClick={this.handleStartEtl}
          className="btn btn-default"
        >
          同步用友数据库
        </button>
        {indicator}
      </div>
    );
  }
}

Yonyou.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  actions: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isRunning: etlStatusSelector,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ runEtl }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Yonyou);
