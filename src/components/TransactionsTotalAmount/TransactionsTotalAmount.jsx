import React from 'react';
import css from './TransactionsTotalAmount.module.css';
import icons from '../../assets/images/icons.svg';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/user/selectors';

export const TransactionsTotalAmount = ({ expenses, incomes }) => {
  const getTotalExpenses = () => expenses.reduce((a, b) => a + b.sum, 0);
  const getTotalIncomes = () => incomes.reduce((a, b) => a + b.sum, 0);
  const user = useSelector(getUser);
  const currencySymbol = {
    UAH: '₴',
    USD: '$',
    EUR: '€',
  };
  return (
    <div className={css.container}>

      <div className={css.totalContainer}>
        <div className={css.arrow}>
          <svg width="15" height="17">
            <use href={`${icons}#arrow-up`} />
          </svg>
        </div>

        <div className={css.dataContainer}>
          <div className={css.description}>Total Income
          </div>
          <div className={css.amount}>{currencySymbol[user?.currency?.toUpperCase()]}{getTotalIncomes().toFixed(2)}</div>
        </div>
      </div>
      <div className={css.totalContainer}>
        <div className={css.arrow}>
          <svg width="15" height="17">
            <use href={`${icons}#arrow-down`} />
          </svg>
        </div>
        <div className={css.dataContainer}>
          <div className={css.description}>Total Expense
          </div>
          <div className={css.amount}>{currencySymbol[user?.currency?.toUpperCase()]}{getTotalExpenses().toFixed(2)}</div>
        </div>
      </div>
    </div>

  );
};
