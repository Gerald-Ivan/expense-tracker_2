import css from './BurgerMenu.module.css';
import { useEffect } from 'react';
import { UserBarBtn } from '../UserBarBtn/UserBarBtn';
import { TransactionsHistoryNav } from '../TransactionsHistoryNav/TransactionsHistoryNav';

export const BurgerMenu = ({ isOpen, onOpen, onClose }) => {
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
    <>
      {isOpen && (
        <div className={css['modal-overlay']} onClick={handleBackdropClick}>
          <div className={css['modal-content']}>
            <button className={css['close-btn']} onClick={onClose}>X</button>
            <div className={css.menu}>
              <UserBarBtn />
            </div>

            <TransactionsHistoryNav activeClass={css.active} className={css.nav} onClick={onClose} />

          </div>
        </div>
      )}
    </>
  );
};
