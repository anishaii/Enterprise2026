import React from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart
} from 'recharts';
import { TrendingUp, Users, DollarSign, Smile, Clock, ShoppingCart } from 'lucide-react';

const Overview = ({ orders, customers, orderItems }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Loading data...</p>
      </div>
    );
  }

  // Calculate KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.total_amount_npr || 0), 0);
  const avgOrderValue = (totalRevenue / orders.length).toFixed(2);
  const avgSatisfaction = (orders.reduce((sum, o) => sum + parseFloat(o.customer_satisfaction || 0), 0) / orders.length).toFixed(2);
  const loyalCustomers = orders.filter(o => o.loyalty_member === 'TRUE').length;
  const loyaltyRate = ((loyalCustomers / orders.length) * 100).toFixed(2);

  // Hourly distribution
  const hourly = {};
  orders.forEach(order => {
    const hour = order.hour_of_day;
    hourly[hour] = (hourly[hour] || 0) + 1;
  });
  const hourlyData = Object.entries(hourly)
    .map(([hour, count]) => {
      const hourNum = parseInt(hour);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const displayHour = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
      return { hour: `${displayHour}:00 ${ampm}`, orders: count };
    })
    .sort((a, b) => parseInt(a.hour.split(':')[0]) - parseInt(b.hour.split(':')[0]))
    .slice(0, 12);

  // Category distribution
  const categories = {};
  orderItems.forEach(item => {
    categories[item.category] = (categories[item.category] || 0) + parseFloat(item.item_total || 0);
  });
  const categoryData = Object.entries(categories)
    .map(([category, revenue]) => ({ name: category, value: parseFloat(revenue.toFixed(2)) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  // Meal period distribution
  const mealPeriods = {};
  orders.forEach(order => {
    const meal = order.meal_period;
    mealPeriods[meal] = (mealPeriods[meal] || 0) + 1;
  });
  const mealData = Object.entries(mealPeriods)
    .map(([meal, count]) => ({ name: meal, value: count }));

  // Payment method distribution
  const paymentMethods = {};
  orders.forEach(order => {
    const method = order.payment_method || 'Unknown';
    paymentMethods[method] = (paymentMethods[method] || 0) + 1;
  });
  const paymentData = Object.entries(paymentMethods)
    .map(([method, count]) => ({ name: method, value: count }))
    .sort((a, b) => b.value - a.value);

  // Order type distribution
  const orderTypes = {};
  orders.forEach(order => {
    const type = order.order_type || 'Unknown';
    orderTypes[type] = (orderTypes[type] || 0) + 1;
  });
  const orderTypeData = Object.entries(orderTypes)
    .map(([type, count]) => ({ name: type, value: count }));

  // Day of week analysis
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayAnalysis = {};
  orders.forEach(order => {
    const day = days[parseInt(order.day_of_week) || 0];
    if (!dayAnalysis[day]) dayAnalysis[day] = 0;
    dayAnalysis[day] += 1;
  });
  const dayData = days.map(day => ({ day, orders: dayAnalysis[day] || 0 }));

  // Top customers by spending
  const customerSpending = {};
  orders.forEach(order => {
    const cid = order.customer_id;
    customerSpending[cid] = (customerSpending[cid] || 0) + parseFloat(order.total_amount_npr || 0);
  });

  // Dummy customer names for display
  const dummyNames = ["John Smith", "Sarah Johnson", "Mike Davis", "Emily Wilson", "David Brown"];

  const topCustomers = Object.entries(customerSpending)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, spending], idx) => ({ rank: idx + 1, customer: dummyNames[idx] || `Customer ${idx + 1}`, spending: parseFloat(spending.toFixed(0)) }));

  // Location analysis
  const locations = {};
  orders.forEach(order => {
    const loc = order.restaurant_location || 'Unknown';
    if (!locations[loc]) locations[loc] = { orders: 0, revenue: 0 };
    locations[loc].orders += 1;
    locations[loc].revenue += parseFloat(order.total_amount_npr || 0);
  });
  const locationData = Object.entries(locations)
    .map(([loc, data]) => ({
      location: `${loc} Branch`,
      orders: data.orders,
      revenue: parseFloat(data.revenue.toFixed(0))
    }))
    .sort((a, b) => b.revenue - a.revenue)

  const colors = ['#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c3d66', '#f59e0b', '#ec4899', '#8b5cf6'];
  const pieColors = ['#0284c7', '#f59e0b', '#eab308']; // Blue, Orange, Yellow

  const KPICard = ({ icon: Icon, label, value, unit, color }) => (
    <div className={`bg-white rounded-lg p-6 shadow-md border-l-4 ${color} card-hover`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className={`text-2xl font-bold mt-2 ${color.replace('border', 'text')}`}>
            {value}
            <span className="text-lg ml-2 text-gray-500">{unit}</span>
          </p>
        </div>
        <div className={`p-3 rounded-full ${color.replace('border', 'bg')} bg-opacity-10`}>
          <Icon className={`${color.replace('border', 'text')}`} size={28} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={DollarSign}
          label="Total Revenue"
          value={`₹${totalRevenue.toFixed(0)}`}
          unit=""
          color="border-blue-600"
        />
        <KPICard
          icon={TrendingUp}
          label="Avg Order Value"
          value={`₹${avgOrderValue}`}
          unit=""
          color="border-green-600"
        />
        <KPICard
          icon={Users}
          label="Loyalty Rate"
          value={`${loyaltyRate}%`}
          unit=""
          color="border-purple-600"
        />
        <KPICard
          icon={Smile}
          label="Satisfaction"
          value={avgSatisfaction}
          unit="/10"
          color="border-orange-600"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Orders */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4 flex items-center gap-2">
            <Clock size={20} /> Orders by Hour
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" tick={{ fontSize: 16 }} />
              <YAxis tick={{ fontSize: 16 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', fontSize: 13 }}
                cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }}
              />
              <Area type="monotone" dataKey="orders" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorOrders)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4 flex items-center gap-2">
            <ShoppingCart size={20} /> Revenue by Category
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={categoryData}
              layout="vertical"
              margin={{ left: 20, right: 40, top: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fontSize: 16 }} />
              <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 16 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', fontSize: 13 }}
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meal Period */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4">Meal Period</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={mealData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={{ fontSize: 16, fontWeight: 'bold' }}
              >
                {mealData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', fontSize: 13 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-2">Distribution of orders across different meal periods (Breakfast, Lunch, Dinner, etc.)</p>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4">Payment Methods</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={{ fontSize: 16, fontWeight: 'bold' }}
              >
                {paymentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', fontSize: 13 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-2">Breakdown of payment methods used by customers (Cash, Card, Digital Wallet, etc.)</p>
        </div>

        {/* Order Types */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4">Order Types</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={orderTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={{ fontSize: 16, fontWeight: 'bold' }}
              >
                {orderTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', fontSize: 13 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-2">Breakdown of order types (Dine-in, Takeout, Delivery, etc.)</p>
        </div>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Day of Week Orders */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4">Orders by Day of Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={dayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 16 }} />
              <YAxis tick={{ fontSize: 16 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', fontSize: 13 }}
              />
              <Bar dataKey="orders" radius={[8, 8, 0, 0]}>
                {dayData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
              <Line type="monotone" dataKey="orders" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Location Performance */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4">Revenue by Location</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={locationData} margin={{ left: 20, right: 30, top: 10, bottom: 60 }} barCategoryGap={15}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" tick={{ fontSize: 16 }} angle={-45} textAnchor="end" height={120} />
              <YAxis yAxisId="left" tick={{ fontSize: 16 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 16 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', fontSize: 13 }}
              />
              <Legend wrapperStyle={{ fontSize: 16, paddingTop: 20 }} />
              <Bar yAxisId="left" dataKey="revenue" radius={[8, 8, 0, 0]}>
                {locationData.map((entry, index) => (
                  <Cell key={`revenue-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
              <Bar yAxisId="right" dataKey="orders" radius={[8, 8, 0, 0]}>
                {locationData.map((entry, index) => (
                  <Cell key={`orders-${index}`} fill={colors[(index + 2) % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4">Top 5 Customers by Spending</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topCustomers}
              layout="vertical"
              margin={{ left: 100, right: 30, top: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fontSize: 16 }} />
              <YAxis dataKey="customer" type="category" width={100} tick={{ fontSize: 15 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', fontSize: 13 }}
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Bar dataKey="spending" radius={[0, 8, 8, 0]}>
                {topCustomers.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4">Summary Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Total Orders</span>
              <span className="font-bold text-dark-900 text-lg">{orders.length.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Unique Customers</span>
              <span className="font-bold text-dark-900 text-lg">{new Set(orders.map(o => o.customer_id)).size}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Avg Items per Order</span>
              <span className="font-bold text-dark-900 text-lg">
                {(orders.reduce((sum, o) => sum + parseFloat(o.num_items || 0), 0) / orders.length).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Loyal Customers</span>
              <span className="font-bold text-dark-900 text-lg">{loyalCustomers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Total Items Sold</span>
              <span className="font-bold text-dark-900 text-lg">{orderItems.length.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
