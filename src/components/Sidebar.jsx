import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  Menu, X, Sun, Moon, DollarSign, Settings,
  ArrowRightLeft,PieChart as PieChartIcon, BarChart3, Wallet
} from 'lucide-react';

const Sidebar = ({ isDark, toggleTheme, isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { id: 'accounts', label: 'Accounts', icon: Wallet, path: '/accounts' },
    { id: 'transfers', label: 'Transfers', icon: ArrowRightLeft, path: '/transfers' },
    { id: 'insights', label: 'Insights', icon: PieChartIcon, path: '/insights' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
  ];

  return (
    <motion.div 
      className={`h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col fixed top-0 left-0 z-40 ${
        isCollapsed ? 'w-20' : 'w-50'
      } transition-all duration-300`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center">
              <img src="/TSM.png" alt="logo"/>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {!isCollapsed && <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;