import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

const Modal = ({ toggleModal, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // componentDidMount() {
  //   window.addEventListener('keydown', handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', handleKeyDown);
  // }

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default Modal;
