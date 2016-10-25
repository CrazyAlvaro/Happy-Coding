import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';

class MDModal extends Component {
  constructor() {
    super();
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onCloseModal() {
    this.props.onCloseModal();
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
        >
          {this.props.children}
          <button onClick={this.onCloseModal}>✕</button>
        </Modal>
      </div>
    );
  }

}

MDModal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.array,
  onCloseModal: PropTypes.func,
};

export default MDModal;
