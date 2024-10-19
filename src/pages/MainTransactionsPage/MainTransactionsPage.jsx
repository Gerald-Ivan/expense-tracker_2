import React, { useEffect } from 'react';
import { TransactionsTotalAmount } from 'components/TransactionsTotalAmount/TransactionsTotalAmount';
import { TransactionsChart } from 'components/TransactionsChart/TransactionsChart';
import { TransactionForm } from 'components/TransactionForm/TransactionForm';
import css from './MainTransactionsPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/categories/operations';
import { TransactionProvider } from '../../context/TransactionProvider';
import { fetchExpenses, fetchIncomes } from '../../redux/transactions/operations';
import { getTransactions } from '../../redux/transactions/selectors';

const MainTransactionsPage = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(getTransactions);

  const { expenses, incomes } = transactions;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const isCurrentMonth = (date) => {
    const itemDate = new Date(date);
    return itemDate.getMonth() === currentMonth &&
      itemDate.getFullYear() === currentYear;
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchExpenses());
    dispatch(fetchIncomes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentMonthExpenses = expenses
    .filter(e => isCurrentMonth(e.date));
  const currentMonthIncomes = incomes
    .filter(e => isCurrentMonth(e.date));

  return (
    <div className={css.container}>
      <div className={css.headerContainer}>
        <h2>
          Expense Log
        </h2>
        <p>
          Capture and organize every penny spent with ease! A clear view of
          your financial habits at your fingertips.
        </p>
        <div style={{ marginTop: '40px' }}>
          <TransactionsTotalAmount expenses={currentMonthExpenses} incomes={currentMonthIncomes} />
        </div>
      </div>

      <div className={css.formContainer}>
        <TransactionProvider>
          <TransactionForm />
        </TransactionProvider>
      </div>


      <div className={css.chartContainer}>
        <TransactionsChart expenses={currentMonthExpenses} />
      </div>

    </div>
  );
};

export default MainTransactionsPage;