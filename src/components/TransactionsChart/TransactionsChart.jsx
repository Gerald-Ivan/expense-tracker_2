import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import css from './TransactionsChart.module.css';
import { useSelector } from 'react-redux';
import { getCategories } from '../../redux/categories/selectors';

Chart.register(ArcElement, Tooltip, Legend);

export const TransactionsChart = ({ expenses }) => {
  const categories = useSelector(getCategories).expenses;

  const calculateExpensePercentage = () => {
    if (expenses.length === 0) return {};
    const categoryTotals = {};
    let totalExpenses = 0;
    expenses.forEach(expense => {
      const { category, sum } = expense;
      totalExpenses += sum;

      if (categoryTotals[category.categoryName]) {
        categoryTotals[category.categoryName] += sum;
      } else {
        categoryTotals[category.categoryName] = sum;
      }
    });

    const categoryPercentages = {};
    for (const category in categoryTotals) {
      categoryPercentages[category] = (categoryTotals[category] / totalExpenses) * 100;
    }

    return categoryPercentages;
  };

  const expensePercentage = calculateExpensePercentage();

  const categoryColors = [
    '#0EF387',
    '#0EBB69',
    '#fafafa',
    '#fafafa80',
    '#ff4000',
    '#ff8000',
    '#ffbf00',
    '#ffff00',
    '#bfff00',
    '#80ff00',
  ];

  const getCategoryColor = index => {
    if (index > categoryColors.length) return generateRandomColor();
    return categoryColors[index];
  };

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
  };

  const data = {
    labels: categories.map(c => c.categoryName),
    datasets: [
      {
        data: categories.map(c => expensePercentage[c.categoryName]),
        backgroundColor: categories
          .map((c, i) => getCategoryColor(i)),
        borderWidth: 0,
        borderRadius: 10,
        spacing: -60,
      },
    ],
  };

  const options = {
    responsive: true,
    rotation: -82,
    circumference: 170,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className={css.container}>
      <h2>Expenses categories</h2>
      <div className={css.data}>
        <div className={css.chart}>
          <Doughnut data={data} options={options} />
          <div className={css.percentage}>
            100%
          </div>
        </div>

        <div className={css.categories}>
          <ul>
            {categories.map((cat, index) => (
                <li key={index}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      background: `${getCategoryColor(index)}`,
                      borderRadius: 9999,
                    }} />
                    {cat.categoryName}
                  </div>
                  <span className={css.expCatPer}>{(expensePercentage[cat.categoryName] || 0).toFixed(0)}%</span></li>
              ),
            )}

          </ul>
        </div>
      </div>
    </div>
  );
};
