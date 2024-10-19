import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/authOperations';
import { isRefreshing } from '../../redux/auth/authSelectors';
import Modal from '../Modal/Modal';
import css from './LogOutModal.module.css';

export const LogOutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isRefreshing);

  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className={css.container}>
        <p>Are you sure you want to log out?</p>

        <div className={css.buttonContainer}>
          <button
            onClick={() => dispatch(logOut())}
            disabled={isLoading}
            className="primary-button"
          >
            {isLoading ? <div>Logging out...</div> : 'Logout'}
          </button>
          <button
            onClick={onClose}
            className="primary-button"
          >
            Cancel
          </button>
        </div>
        </div>
      </Modal>

  );
}
