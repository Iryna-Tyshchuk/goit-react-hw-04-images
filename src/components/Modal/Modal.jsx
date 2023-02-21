import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { StyledModal, StyledOverlay } from './Modal.styled';

export function Modal({ largeImageURL, closeModal }) {
  useEffect(() => {
    const onEscClose = e => {
      if (e.code === 'Escape') closeModal();
    };

    window.addEventListener('keydown', onEscClose);
    return () => window.removeEventListener('keydown', onEscClose);
  }, [closeModal]);

  const closeImage = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <StyledOverlay onClick={closeImage}>
      <StyledModal>
        <img src={largeImageURL} alt="" />
      </StyledModal>
    </StyledOverlay>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
