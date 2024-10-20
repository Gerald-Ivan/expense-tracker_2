import React, { useState, useRef, useEffect } from 'react';
import icon from '../../assets/images/icons.svg';
import css from './TransactionForm.module.css';
import { useSelector } from 'react-redux';
import { useTransactionForm } from '../../context/TransactionProvider';
import { CategoriesModal } from '../CategoriesModal/CategoriesModal';
import { getUser } from '../../redux/user/selectors';

export const TransactionForm = ({ onSave }) => {
  const user = useSelector(getUser);
  const { validateForm, errors, formData, handleChange, handleSubmit } = useTransactionForm();

  const datePicker = useRef(null);
  const timePicker = useRef(null);

  const [category, setCategory] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (category) validateForm();
  }, [category, validateForm]);

  return (
    <>
      <CategoriesModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        type={formData.type}
        onItemClick={(category) => {
          setCategory(category);
          handleChange('category', category._id);
          closeModal();
        }}
        title={formData.type}
      />

      <form className={css.container} onSubmit={(e) => { handleSubmit(e); (onSave && onSave());}}>
        <div className={css.typeContainer}>
          <div className={css.radioContainer}>
            <input
              type="radio"
              id="expense"
              name="transaction"
              value="expenses"
              onChange={(e) => {
                setCategory(null); handleChange('type', e.target.value);
              }}
              defaultChecked
            />
            <label
              htmlFor="expense"
            >
              Expense
            </label>
          </div>
          <div className={css.radioContainer}>
            <input
              type="radio"
              id="income"
              name="transaction"
              value="incomes"
              onChange={(e) => {
                setCategory(null);
                handleChange('type', e.target.value)
              }}
              required
            />
            <label
              htmlFor="income"
            >
              Income
            </label>
          </div>
        </div>

        <div className={css.dateTimeContainer}>
          <div className={css.dateContainer}>
            <label htmlFor="date">
              Date
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className={errors.date && 'invalid'}
                name="date"
                ref={datePicker}
                value={formData.date || ''}
                type="date"
                onClick={e => e.currentTarget.showPicker()}
                onChange={e => handleChange('date', e.target.value)}
              />
              <svg onClick={() => datePicker.current?.click()}>
                <use href={`${icon}#calendar-icon`} />
              </svg>
              {errors.date && <span className={css.error}>{errors.date}</span>}
            </div>
          </div>
          <div className={css.dateContainer}>
            <label htmlFor="time">
              Time
            </label>
            <div className={css.timeContainer} style={{ position: 'relative' }}>
              <input
                className={css.timeInput}
                ref={timePicker}
                value={formData.time || ''}
                type="time"
                onClick={e => e.currentTarget.showPicker()}
                onChange={e => handleChange('time', e.target.value)}
              />
              <svg  onClick={() => timePicker.current?.click()}>
                <use href={`${icon}#clock-icon`} />
              </svg>
            </div>
          </div>
        </div>

        <div className={css.fieldContainer}>
          <label
            htmlFor="category"
          >
            Category
          </label>
          <input
            name="category"
            readOnly
            onClick={openModal}
            type="text"
            placeholder="Enter the category"
            value={formData.category ? category?.categoryName || '' : ''}
            className={errors.category && 'invalid'}
          />
          {errors.category && <span className={css.error}>{errors.category}</span>}
        </div>

        <div className={css.fieldContainer}>
          <label
            htmlFor="sum"
          >
            Sum
          </label>
          <div className={css.sumContainer}>
            <input
              name="sum"
              type="number"
              placeholder="Enter the sum"
              value={formData.sum || ''}
              onChange={(e) => handleChange('sum', e.target.value)}
              className={errors.sum && 'invalid'}
            />
            <span className={css.currency}>
              {user.currency}
            </span>
            {errors.category && <span className={css.error}>{errors.sum}</span>}
          </div>
        </div>

        <div className={css.fieldContainer}>
          <label
            htmlFor="comment"
          >
            Comment
          </label>
          <textarea
            name="comment"
            className={errors.comment && 'invalid'}
            style={{ height: '97px', resize: 'none' }}
            placeholder="Enter the text"
            value={formData.comment || ''}
            onChange={(e) => handleChange('comment', e.target.value)}
          />
          {errors.comment && <span className={css.error}>{errors.comment}</span>}
        </div>

        <button
          type="submit"
          className="primary-button"
        >
          {formData._id ? 'Save' : 'Add'}
        </button>

      </form>
    </>
  );
};
