import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { formatCurrency } from '../utils/convert';

const TransferForm = ({ accounts, onTransfer }) => {
  const [formData, setFormData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    note: '',
    futureDate: ''
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.fromAccount) newErrors.fromAccount = 'Required';
    if (!formData.toAccount) newErrors.toAccount = 'Required';
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Amount must be greater than 0';
    if (formData.fromAccount === formData.toAccount) newErrors.toAccount = 'Cannot transfer to same account';

    // Check sufficient balance
    if (formData.fromAccount && formData.amount) {
      const fromAcc = accounts.find(acc => acc.id === parseInt(formData.fromAccount));
      if (fromAcc && parseFloat(formData.amount) > fromAcc.balance) {
        newErrors.amount = 'Insufficient balance';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onTransfer(formData);
      setFormData({
        fromAccount: '',
        toAccount: '',
        amount: '',
        note: '',
        futureDate: ''
      });
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">New Transfer</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From Account
            </label>
            <select
              value={formData.fromAccount}
              onChange={(e) => setFormData({...formData, fromAccount: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select account</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} - {formatCurrency(acc.balance, acc.currency)}
                </option>
              ))}
            </select>
            {errors.fromAccount && <p className="text-red-500 text-sm mt-1">{errors.fromAccount}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To Account
            </label>
            <select
              value={formData.toAccount}
              onChange={(e) => setFormData({...formData, toAccount: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select account</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} - {acc.currency}
                </option>
              ))}
            </select>
            {errors.toAccount && <p className="text-red-500 text-sm mt-1">{errors.toAccount}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter amount"
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Note (Optional)
          </label>
          <input
            type="text"
            value={formData.note}
            onChange={(e) => setFormData({...formData, note: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Add a note"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Future Date (Optional)
          </label>
          <input
            type="datetime-local"
            value={formData.futureDate}
            onChange={(e) => setFormData({...formData, futureDate: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <motion.button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Transfer Funds
        </motion.button>
      </form>
    </motion.div>
  );
};

export default TransferForm;