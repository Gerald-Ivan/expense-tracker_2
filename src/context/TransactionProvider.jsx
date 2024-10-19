import React, { createContext, useContext, useEffect, useState } from 'react';
import { addTransaction, updateTransaction } from '../redux/transactions/operations';
import { useDispatch } from 'react-redux';

const TransactionContext = createContext({
  formData: {
    type: 'incomes',
  }, setFormData: () => {
  },
});

export const useTransactionForm = () => useContext(TransactionContext);

export const TransactionProvider = ({ children, transaction }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(transaction || {
    type: 'expenses',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({ category: '', password: '' });

  const validateForm = () => {
    let valid = true;
    const newErrors = { category: '', password: '' };

    if (!formData.date ) {
      newErrors.date = 'Date is required.';
      valid = false;
    }

    if (!formData.category ) {
      newErrors.category = 'Category is required.';
      valid = false;
    }

    if (!formData.sum || +formData.sum === 0) {
      newErrors.sum = 'Sum is required.';
      valid = false;
    }

    if (!formData.comment) {
      newErrors.comment = 'Comment is required.';
      valid = false;
    }

    setErrors(newErrors);
    setIsFormValid(valid);
    return valid;
  };

  useEffect(() => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0].slice(0, 5);

    setFormData(prev => ({
      type: prev.type,
      date,
      time,
    }));

  }, []);


  const handleSubmit = event => {
    event.preventDefault();

    if (!validateForm()) return;

    if (formData._id) {
      dispatch(updateTransaction(formData));
    } else {
      dispatch(addTransaction(formData));
    }

    setFormData(prev => ({
      type: prev.type,
      date: prev.date,
      time: prev.time,
    }));
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <TransactionContext.Provider
      value={{ validateForm, errors, isValid: isFormValid, formData, setFormData, handleChange, handleSubmit }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
