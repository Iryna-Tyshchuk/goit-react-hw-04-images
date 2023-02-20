import { Component } from 'react';
import PropTypes from 'prop-types';

import { StyledModal, StyledOverlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClose);
  }

  onEscClose = e => {
    if (e.code === 'Escape') this.props.closeModal();
  };

  closeImage = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL } = this.props;
    return (
      <StyledOverlay onClick={this.closeImage}>
        <StyledModal>
          <img src={largeImageURL} alt="" />
        </StyledModal>
      </StyledOverlay>
    );
  }
}
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
