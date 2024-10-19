import icon from '../../assets/images/icons.svg';
import React from 'react';
import css from './CategoryListItem.module.css';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../redux/categories/operations';

export const CategoryListItem = ({ category, onItemClick, setCategory, setIsEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deleteCategory(category._id));
  };

  return (
    <li>
      {category.categoryName}
      <div className={css.actionButtons}>
        <svg onClick={() => onItemClick(category)}>
          <use href={`${icon}#check`} />
        </svg>
        <svg onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsEdit(true);
          setCategory(category);
        }}>
          <use href={`${icon}#edit`} />
        </svg>
        <svg onClick={(e) => handleDelete(e)}>
          <use href={`${icon}#trash`} />
        </svg>

      </div>
    </li>
  );
};
