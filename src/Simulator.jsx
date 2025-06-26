import React, { useState, useEffect, createContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { initialAccounts } from './data/initialAccounts';
import { convertCurrency } from './utils/convert';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Accounts from './components/Accounts';
import Transfers from './components/Transfers';
import Insights from './components/Insights';
import Settings from './components/Settings';

const ThemeContext = createContext();

const Simulator = () => {
  const [isDark, setIsDark] = useState(false);
  const [accounts, setAccounts] = useState(initialAccounts);
  const [transactions, setTransactions] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false); 

  // Toggle theme
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Handle transfer
  const handleTransfer = (formData) => {
    const fromAccount = accounts.find(acc => acc.id === parseInt(formData.fromAccount));
    const toAccount = accounts.find(acc => acc.id === parseInt(formData.toAccount));
    const amount = parseFloat(formData.amount);

    // Check if FX conversion is needed
    const fxApplied = fromAccount.currency !== toAccount.currency;
    let convertedAmount = amount;
    
    if (fxApplied) {
      convertedAmount = convertCurrency(amount, fromAccount.currency, toAccount.currency);
    }

    // Create transaction
    const newTransaction = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      fromAccount: fromAccount.name,
      toAccount: toAccount.name,
      amount: amount,
      currency: fromAccount.currency,
      convertedAmount: fxApplied ? convertedAmount : null,
      toCurrency: fxApplied ? toAccount.currency : null,
      fromCurrency: fromAccount.currency,
      fxApplied,
      note: formData.note,
      status: formData.futureDate ? 'pending' : 'completed',
      futureDate: formData.futureDate
    };

    // Update account balances if not future-dated
    if (!formData.futureDate) {
      setAccounts(prevAccounts => 
        prevAccounts.map(acc => {
          if (acc.id === fromAccount.id) {
            return { ...acc, balance: acc.balance - amount };
          }
          if (acc.id === toAccount.id) {
            return { ...acc, balance: acc.balance + convertedAmount };
          }
          return acc;
        })
      );
    }

    // Add transaction
    setTransactions(prev => [newTransaction, ...prev]);
  };

  // Theme classes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
        <div className="flex">
          <Sidebar
            isDark={isDark}
            toggleTheme={toggleTheme}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
          <main
            className={`flex-1 p-6 overflow-auto transition-all duration-300 ${
              isCollapsed ? 'ml-20' : 'ml-50'
            }`}
            style={{ minHeight: '100vh' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-8xl mx-auto"
              >
                <Routes>
                  <Route path="/" element={<Dashboard accounts={accounts} transactions={transactions} />} />
                  <Route path="/dashboard" element={<Dashboard accounts={accounts} transactions={transactions} />} />
                  <Route path="/accounts" element={<Accounts accounts={accounts} />} />
                  <Route path="/transfers" element={<Transfers accounts={accounts} transactions={transactions} onTransfer={handleTransfer} />} />
                  <Route path="/insights" element={<Insights accounts={accounts} transactions={transactions} />} />
                  <Route path="/settings" element={<Settings isDark={isDark} toggleTheme={toggleTheme} />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Simulator;