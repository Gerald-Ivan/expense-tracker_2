import Modal from '../Modal/Modal';
import { CategoryList } from '../CategoryList/CategoryList';
import React from 'react';
import css from './CategoriesModal.module.css';

export const CategoriesModal = ({ title, type, isModalOpen, closeModal, onItemClick }) => {
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className={css.container}>
        <h2>{title}</h2>
        <CategoryList
          onItemClick={onItemClick}
          type={type}/>
      </div>
    </Modal>
  );
};
