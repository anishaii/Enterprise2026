import React, { useMemo } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const Descriptive = ({ orders, customers, orderItems }) => {
  const areaColors = ['#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#eab308', '#6366f1', '#14b8a6', '#f87171'];
  const prefColors = ['#06b6d4', '#f87171', '#10b981']; // Teal, Coral, Green
  const segmentColors = ['#06b6d4', '#f87171', '#10b981', '#fbbf24', '#8b5cf6']; // Teal, Coral, Green, Amber, Purple
  const paymentColors = ['#f87171', '#10b981', '#06b6d4']; // Coral, Green, Teal
  const orderTypeColors = ['#10b981', '#06b6d4', '#f87171']; // Green, Teal, Coral
  // Market Basket Analysis
  const marketBasketData = useMemo(() => {
    if (!orderItems || orderItems.length === 0) return [];
    const itemFreq = {};
    orderItems.forEach(item => {
      itemFreq[item.item_name] = (itemFreq[item.item_name] || 0) + 1;
    });
    const data = Object.entries(itemFreq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([name, count]) => ({ name: name.substring(0, 15), count }));
    return data;
  }, [orderItems]);

  // KPI Donuts - Customer Segments
  const customerSegments = useMemo(() => {
    if (!customers || customers.length === 0) return [];
    const segments = {};
    customers.forEach(c => {
      const type = c.customer_type;
      if (!segments[type]) segments[type] = 0;
      segments[type] += 1;
    });
    return Object.entries(segments).map(([name, value]) => ({ name, value }));
  }, [customers]);

  // Payment Method Distribution
  const paymentData = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    const payment = {};
    orders.forEach(o => {
      const method = o.payment_method;
      payment[method] = (payment[method] || 0) + 1;
    });
    return Object.entries(payment).map(([name, value]) => ({ name, value }));
  }, [orders]);

  // Order Type Distribution
  const orderTypeData = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    const types = {};
    orders.forEach(o => {
      const type = o.order_type;
      types[type] = (types[type] || 0) + 1;
    });
    return Object.entries(types).map(([name, value]) => ({ name, value }));
  }, [orders]);

  // Spice Preference Distribution
  const spiceData = useMemo(() => {
    if (!customers || customers.length === 0) return [];
    const spice = {};
    customers.forEach(c => {
      const pref = c.spice_preference;
      if (!spice[pref]) spice[pref] = 0;
      spice[pref] += 1;
    });
    return Object.entries(spice).map(([name, value]) => ({ name, value }));
  }, [customers]);

  // Average Spending by Location
  const locationData = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    const loc = {};
    orders.forEach(o => {
      const location = o.restaurant_location;
      if (!loc[location]) loc[location] = { sum: 0, count: 0 };
      loc[location].sum += parseFloat(o.total_amount_npr || 0);
      loc[location].count += 1;
    });
    return Object.entries(loc)
      .map(([name, { sum, count }]) => ({
        name: name,
        avg: parseFloat((sum / count).toFixed(2))
      }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 8);
  }, [orders]);

  // Customer Distribution by Area
  const areaData = useMemo(() => {
    if (!customers || customers.length === 0) return [];
    const area = {};
    customers.forEach(c => {
      if (!area[c.area]) area[c.area] = 0;
      area[c.area] += 1;
    });
    return Object.entries(area)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [customers]);

  // Dietary Preference
  const dietaryData = useMemo(() => {
    if (!customers || customers.length === 0) return [];
    const diet = {};
    customers.forEach(c => {
      const pref = c.dietary_preference;
      if (!diet[pref]) diet[pref] = 0;
      diet[pref] += 1;
    });
    return Object.entries(diet).map(([name, value]) => ({ name, value }));
  }, [customers]);

  if (!orders || orders.length === 0) {
    return <div className="text-center py-8">Loading data...</div>;
  }

  const colors = ['#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6', '#ec4899', '#f97316', '#84cc16'];

  return (
    <div className="space-y-6">
      {/* Market Basket Analysis */}
      <div className="bg-white rounded-lg p-6 shadow-md card-hover">
        <h3 className="text-lg font-bold text-dark-900 mb-4">Top 10 Most Popular Items (Market Basket Analysis)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={marketBasketData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 15 }} />
            <YAxis tick={{ fontSize: 15 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }}
              cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {marketBasketData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={areaColors[index % areaColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-blue-50 rounded text-sm text-gray-700">
          <strong>Analysis:</strong> Shows the frequency of each menu item purchased. Understanding top items helps with inventory management and menu optimization.
        </div>
      </div>

      {/* KPI Donuts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Customer Type Segments */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4 text-center">Customer Segments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerSegments}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {customerSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={segmentColors[index % segmentColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 text-sm">
            {customerSegments.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-gray-600">{item.name}:</span>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4 text-center">Payment Methods</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {paymentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={paymentColors[index % paymentColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 text-sm">
            {paymentData.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-gray-600">{item.name}:</span>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Types */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4 text-center">Order Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {orderTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={orderTypeColors[index % orderTypeColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 text-sm">
            {orderTypeData.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-gray-600">{item.name}:</span>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Analysis */}
      <div className="bg-white rounded-lg p-6 shadow-md card-hover">
        <h3 className="text-lg font-bold text-dark-900 mb-4">Average Order Value by Location</h3>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={locationData} margin={{ bottom: 90 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={110} tick={{ fontSize: 17 }} interval={0} />
            <YAxis tick={{ fontSize: 17 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }}
              formatter={(value) => `₹${value}`}
            />
              <Bar dataKey="avg" radius={[8, 8, 0, 0]}>
                {locationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Row - Customer Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spice Preference */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4">Customer Spice Preference</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={spiceData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {spiceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={prefColors[index % prefColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 text-sm">
            {spiceData.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-gray-600">{item.name}:</span>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dietary Preference */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4">Customer Dietary Preferences</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dietaryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {dietaryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={prefColors[index % prefColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 text-sm">
            {dietaryData.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-gray-600">{item.name}:</span>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Area Distribution */}
      <div className="bg-white rounded-lg p-6 shadow-md card-hover">
        <h3 className="text-lg font-bold text-dark-900 mb-4">Customers by Area</h3>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={areaData} layout="vertical" margin={{ left: 130, right: 40, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tick={{ fontSize: 16 }} />
            <YAxis dataKey="name" type="category" width={125} tick={{ fontSize: 16 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }}
            />
            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
              {areaData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={areaColors[index % areaColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Descriptive;

