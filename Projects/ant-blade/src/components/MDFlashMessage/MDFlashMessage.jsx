import React, { Component, PropTypes } from 'react';
import Crouton from 'react-crouton';

import './crouton.css';
import styles from './MDFlashMessage.css';

class MDFlashMessage extends Component {

  constructor() {
    super();
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      hidden: false,
    };
  }

  handleClose(e) {
    e.preventDefault();
    this.setState({
      hidden: !this.state.hidden,
    });
  }

  render() {
    const { message, type } = this.props;
    const croutonProps = {
      type,
      message,
      id: Date.now(),
      autoMiss: false,
      buttons: [{
        name: '✕',
        listener: this.handleClose,
      }],
    };
    return (
      <div>
        <div className={styles['flash-message']}>
          <Crouton
            { ...croutonProps }
            hidden={this.state.hidden}
          />
        </div>
      </div>
    );
  }
}

MDFlashMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MDFlashMessage;
