import { useParams } from 'react-router-dom';
import React from 'react';
import css from '../TransactionsHistoryPage/TransactionsHistoryPage.module.css';
import { TransactionsTotalAmount } from '../../components/TransactionsTotalAmount/TransactionsTotalAmount';
import { useSelector } from 'react-redux';
import { getTransactions } from '../../redux/transactions/selectors';
import { TransactionList } from '../../components/TransactionList/TransactionList';
import { TransactionProvider } from '../../context/TransactionProvider';

const TransactionsHistoryPage = () => {
  const params = useParams();
  const { transactionType } = params;
  const transactions = useSelector(getTransactions);

  const { expenses, incomes } = transactions;

  const isExpenses = transactionType === 'expenses';

  return (
    <div className={css.container}>
      <div className={css.topContainer}>
        <div className={css.headerContainer}>
          <h2>
            All {isExpenses ? 'Expense' : 'Income'}
          </h2>
          <p>
            {isExpenses ? `Capture and organize every penny spent with ease! A clear view of
          your financial habits at your fingertips.` :
              `Track and celebrate every bit of earnings effortlessly! Gain insights into your total revenue in a snap.`}
          </p>
        </div>
        <TransactionsTotalAmount expenses={expenses} incomes={incomes} />
      </div>

      <TransactionProvider>
        <TransactionList transactions={isExpenses ? expenses : incomes} />
      </TransactionProvider>

    </div>

  );
};

export default TransactionsHistoryPage;
