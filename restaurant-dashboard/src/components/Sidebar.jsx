import React from 'react';
import { Menu, X, Plus } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, currentPage, setCurrentPage, logo }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'descriptive', label: 'Descriptive', icon: '📈' },
    { id: 'diagnostic', label: 'Diagnostic', icon: '🔍' },
    { id: 'predictive', label: 'Predictive', icon: '🔮' },
    { id: 'prescriptive', label: 'Prescriptive', icon: '💡' }
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-primary-600 text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static top-0 left-0 w-64 h-screen bg-gradient-to-b from-dark-800 to-dark-900 text-white shadow-lg transition-transform duration-300 z-40 flex flex-col`}
      >
        {/* Logo Section */}
        <div className="p-8 border-b border-dark-700">
          <div className="flex flex-col items-center gap-4">
            {logo && (
              <img src={logo} alt="Restaurant Logo" className="h-40 w-40 object-contain drop-shadow-lg" />
            )}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">Restaurant</h1>
              <p className="text-sm text-primary-400">Analytics</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                currentPage === item.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-dark-700 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Add New Entry Button */}
        <div className="p-4 border-t border-dark-700">
          <button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl">
            <Plus size={20} />
            <span>Add New Entry</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
