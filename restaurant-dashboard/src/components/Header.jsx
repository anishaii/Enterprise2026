import React from 'react';
import { Bell, Settings, LogOut } from 'lucide-react';

const Header = ({ currentPage }) => {
  const pageTitle = {
    overview: 'Overview',
    descriptive: 'Descriptive Analytics',
    diagnostic: 'Diagnostic Analytics',
    predictive: 'Predictive Analytics',
    prescriptive: 'Prescriptive Analytics'
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left section - Title */}
        <div>
          <h2 className="text-2xl font-bold text-dark-900">
            {pageTitle[currentPage] || 'Dashboard'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Customer Ordering Pattern Analysis
          </p>
        </div>

        {/* Right section - User info and actions */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-gray-100">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-gray-100">
            <Settings size={20} />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-semibold text-dark-900">Admin</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>

          {/* Logout */}
          <button className="p-2 text-gray-600 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
