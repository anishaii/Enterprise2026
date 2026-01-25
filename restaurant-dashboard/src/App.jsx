import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './pages/Overview';
import Descriptive from './pages/Descriptive';
import Diagnostic from './pages/Diagnostic';
import Predictive from './pages/Predictive';
import Prescriptive from './pages/Prescriptive';
import { parseCSV } from './utils/dataAnalysis';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState({
    orders: [],
    customers: [],
    orderItems: [],
    menuCatalog: [],
    newFile: []
  });
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load CSV files from public folder
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load CSV files from public folder
        const ordersResponse = await fetch('/Kathmandu Restaurant Orders.csv');
        const customersResponse = await fetch('/Customer Profiles.csv');
        const itemsResponse = await fetch('/Order Items Detail.csv');
        
        if (!ordersResponse.ok || !customersResponse.ok || !itemsResponse.ok) {
          throw new Error('Failed to load CSV files');
        }

        const ordersText = await ordersResponse.text();
        const customersText = await customersResponse.text();
        const itemsText = await itemsResponse.text();

        // Parse CSV data
        const orders = parseCSV(ordersText);
        const customers = parseCSV(customersText);
        const orderItems = parseCSV(itemsText);

        console.log(`Loaded ${orders.length} orders, ${customers.length} customers, ${orderItems.length} order items`);

        setData({ 
          orders, 
          customers, 
          orderItems, 
          menuCatalog: [] 
        });

        // Load logo
        try {
          const logoResponse = await fetch('/Abstract_Chef_Cooking_Restaurant_Free_Logo-removebg-preview.png');
          if (logoResponse.ok) {
            setLogo('/Abstract_Chef_Cooking_Restaurant_Free_Logo-removebg-preview.png');
          }
        } catch (error) {
          console.log('Logo not found');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle file upload for new entry
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvText = e.target.result;
        const parsedData = parseCSV(csvText);
        setData(prevData => ({
          ...prevData,
          newFile: parsedData
        }));
        console.log(`Uploaded new file with ${parsedData.length} entries`);
      };
      reader.readAsText(file);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <Overview orders={data.orders} customers={data.customers} orderItems={data.orderItems} />;
      case 'descriptive':
        return <Descriptive orders={data.orders} customers={data.customers} orderItems={data.orderItems} />;
      case 'diagnostic':
        return <Diagnostic orders={data.orders} customers={data.customers} orderItems={data.orderItems} />;
      case 'predictive':
        return <Predictive orders={data.orders} customers={data.customers} />;
      case 'prescriptive':
        return <Prescriptive orders={data.orders} customers={data.customers} orderItems={data.orderItems} />;
      default:
        return <Overview orders={data.orders} customers={data.customers} orderItems={data.orderItems} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        logo={logo}
        onFileUpload={handleFileUpload}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-0">
        {/* Header */}
        <Header currentPage={currentPage} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
