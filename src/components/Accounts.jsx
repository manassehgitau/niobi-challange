import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { formatCurrency } from '../utils/convert';

const Accounts = ({ accounts }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Accounts</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your treasury accounts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account, index) => (
          <motion.div
            key={account.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                account.currency === 'KES' ? 'bg-blue-100 dark:bg-blue-900' :
                account.currency === 'USD' ? 'bg-green-100 dark:bg-green-900' :
                'bg-orange-100 dark:bg-orange-900'
              }`}>
                <DollarSign className={`w-6 h-6 ${
                  account.currency === 'KES' ? 'text-blue-600 dark:text-blue-400' :
                  account.currency === 'USD' ? 'text-green-600 dark:text-green-400' :
                  'text-orange-600 dark:text-orange-400'
                }`} />
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                account.currency === 'KES' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                account.currency === 'USD' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
              }`}>
                {account.currency}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{account.name}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(account.balance, account.currency)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Accounts;
