import css from './TransactionsSearchTools.module.css';
import icon from '../../assets/images/icons.svg';
import React, { useEffect, useRef, useState } from 'react';
import { setFilter } from '../../redux/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from '../../redux/transactions/selectors';

export const TransactionsSearchTools = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const handleSearch = (field, value) => {
    dispatch(setFilter({
      ...filter,
      [field]: value,
    }));
  };

  const [date, setDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDate(formattedDate);
  }, []);

  const datePicker = useRef(null);
  return (
    <div className={css.container}>
      <input placeholder="Search for anything.."
        onChange={(e) => handleSearch('value', e.target.value)}
      ></input>

      <div className={css.dateContainer}>
        <div style={{ position: 'relative' }}>
          <input
            value={date}
            ref={datePicker}
            type="date"
            onClick={e => e.currentTarget.showPicker()}
            onChange={(e) => {
              handleSearch('date', e.target.value);
              setDate(e.target.value);
            }}
          />
          <svg style={{ color: '#0EF387', fill: '#0EF387' }} onClick={() => datePicker.current?.click()}>
            <use href={`${icon}#calendar-icon`} />
          </svg>
        </div>
      </div>
    </div>
  );
};
