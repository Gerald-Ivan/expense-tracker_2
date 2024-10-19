import css from './CategoryList.module.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, updateCategory } from '../../redux/categories/operations';
import { CategoryListItem } from '../CategoryListItem/CategoryListItem';
import { getCategories } from '../../redux/categories/selectors';
import clsx from 'clsx';

export const CategoryList = ({ type, onItemClick }) => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const [category, setCategory] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleAddCategory = (e) => {
    dispatch(addCategory({ type, categoryName: category.categoryName }));
    setCategory(null);
  };

  const handleUpdateCategory = (e) => {
    dispatch(updateCategory(category));
    setIsEdit(false);
    setCategory(null);
  };

  return (
    <div className={css.container}>
      <span className={css.categories}>All Category</span>
      <div>
        <ul>
          {categories[type]
            .map((c, i) => (
              <CategoryListItem setCategory={setCategory} setIsEdit={setIsEdit} onItemClick={onItemClick} key={i} category={c} />
            ))}
        </ul>
      </div>
      <div className={css.newCategoryContainer}>
        <span>New Category</span>
        <input type="text"
          value={category?.categoryName || ''} onChange={(e) => setCategory(c => ({...c, categoryName: e.target.value}))} />

        <button disabled={!category}
          onClick={isEdit ? handleUpdateCategory : handleAddCategory}
          className={clsx('primary-button', isEdit ? css.save : '')} type="button">
          {isEdit ? 'Save' : 'Add'}
        </button>

      </div>
    </div>
  );
};
