import React from 'react';
import { convertCurrency, formatCurrency } from '../utils/convert'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { ArrowRightLeft, TrendingUp, Activity } from 'lucide-react';

const Insights = ({ accounts, transactions }) => {
  // Calculate analytics data
  const totalVolumeByCurrency = transactions.reduce((acc, tx) => {
    acc[tx.currency] = (acc[tx.currency] || 0) + tx.amount;
    return acc;
  }, {});

  const monthlyData = transactions.reduce((acc, tx) => {
    const month = tx.date.substring(0, 7); // YYYY-MM
    if (!acc[month]) acc[month] = 0;
    acc[month] += convertCurrency(tx.amount, tx.currency, 'USD');
    return acc;
  }, {});

  const volumeChartData = Object.entries(totalVolumeByCurrency).map(([currency, volume]) => ({
    currency,
    volume,
    fill: currency === 'KES' ? '#3B82F6' : currency === 'USD' ? '#10B981' : '#F59E0B'
  }));

  const monthlyChartData = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, volume]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      volume: Math.round(volume)
    }));

  const accountActivityData = accounts.map(acc => {
    const activity = transactions.filter(tx => 
      tx.fromAccount === acc.name || tx.toAccount === acc.name
    ).length;
    return {
      name: acc.name.split('_')[0],
      activity,
      balance: Math.round(convertCurrency(acc.balance, acc.currency, 'USD'))
    };
  }).sort((a, b) => b.activity - a.activity);

  const fxData = transactions.reduce((acc, tx) => {
    if (tx.fxApplied) {
      const key = `${tx.fromCurrency}→${tx.toCurrency}`;
      acc[key] = (acc[key] || 0) + 1;
    }
    return acc;
  }, {});

  const fxChartData = Object.entries(fxData).map(([pair, count]) => ({
    pair,
    count
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Insights</h1>
          <p className="text-gray-600 dark:text-gray-400">Analytics and performance metrics</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Currency</h3>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-2">
            {Object.entries(totalVolumeByCurrency)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 3)
              .map(([currency, volume]) => (
                <div key={currency} className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">{currency}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(volume, currency)}
                  </span>
                </div>
              ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Most Active Account</h3>
            <Activity className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-2">
            {accountActivityData.slice(0, 3).map((acc) => (
              <div key={acc.name} className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{acc.name}</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {acc.activity} transfers
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">FX Conversions</h3>
            <ArrowRightLeft className="w-5 h-5 text-purple-500" />
          </div>
          <div className="space-y-2">
            {fxChartData.slice(0, 3).map((fx) => (
              <div key={fx.pair} className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{fx.pair}</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {fx.count} times
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transfer Volume by Currency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volumeChartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="currency" />
              <YAxis />
              <Tooltip formatter={(value) => [value.toLocaleString(), 'Volume']} />
              <Bar dataKey="volume" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Transfer Volume (USD)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value.toLocaleString()}`, 'Volume']} />
              <Area type="monotone" dataKey="volume" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Activity vs Balance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accountActivityData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="activity" fill="#10B981" name="Activity" />
              <Bar yAxisId="right" dataKey="balance" fill="#F59E0B" name="Balance (USD)" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {fxChartData.length > 0 && (
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">FX Conversion Patterns</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fxChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ pair, count }) => `${pair}: ${count}`}
                >
                  {fxChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Insights;