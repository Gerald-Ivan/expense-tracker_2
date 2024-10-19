import React, { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  if (!isOpen) return null;

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.modalOverlay} onClick={handleBackdropClick}>
      <div className={css.modalContainer}>
        <button className={css.modalCloseButton} onClick={onClose}>
          &times;
        </button>
        <div className={css.modalContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
