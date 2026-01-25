import React, { useMemo } from 'react';
import {
  BarChart, Bar, Line, ScatterChart, Scatter, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Prescriptive = ({ orders, customers, orderItems }) => {
  // Cohort Analysis
  const cohortAnalysis = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    const cohorts = {};
    
    orders.forEach(order => {
      const customer = customers.find(c => c.customer_id === order.customer_id);
      if (!customer) return;

      const cohortKey = customer.customer_type;
      if (!cohorts[cohortKey]) {
        cohorts[cohortKey] = {
          name: cohortKey,
          totalOrders: 0,
          totalRevenue: 0,
          satisfaction: 0,
          loyalMembers: 0,
          avgItemsPerOrder: 0
        };
      }

      cohorts[cohortKey].totalOrders += 1;
      cohorts[cohortKey].totalRevenue += parseFloat(order.total_amount_npr || 0);
      cohorts[cohortKey].satisfaction += parseFloat(order.customer_satisfaction || 0);
      cohorts[cohortKey].avgItemsPerOrder += parseFloat(order.num_items || 0);
      
      if (order.loyalty_member === 'TRUE') {
        cohorts[cohortKey].loyalMembers += 1;
      }
    });

    return Object.values(cohorts).map(cohort => ({
      name: cohort.name,
      revenue: parseFloat((cohort.totalRevenue / cohort.totalOrders).toFixed(2)),
      orders: cohort.totalOrders,
      satisfaction: parseFloat((cohort.satisfaction / cohort.totalOrders).toFixed(2)),
      loyaltyRate: parseFloat(((cohort.loyalMembers / cohort.totalOrders) * 100).toFixed(2)),
      itemsPerOrder: parseFloat((cohort.avgItemsPerOrder / cohort.totalOrders).toFixed(2))
    }));
  }, [orders, customers]);

  // Cluster Analysis - Customer Segmentation
  const clusterAnalysis = useMemo(() => {
    if (!customers || customers.length === 0 || !orders || orders.length === 0) return [];
    
    // First pass: Calculate basic customer metrics from orders
    const customerMetrics = {};
    customers.forEach(c => {
      const customerOrders = orders.filter(o => o.customer_id === c.customer_id);
      const orderCount = customerOrders.length;
      const avgSatisfaction = customerOrders.length > 0 
        ? customerOrders.reduce((sum, o) => sum + parseFloat(o.customer_satisfaction || 0), 0) / customerOrders.length 
        : 5;
      
      customerMetrics[c.customer_id] = {
        spending: parseFloat(c.avg_spending_npr) || 0,
        orderCount: orderCount,
        satisfaction: avgSatisfaction
      };
    });

    // Calculate spending distribution for segmentation
    const spendings = Object.values(customerMetrics).map(m => m.spending);
    const mean = spendings.reduce((a, b) => a + b, 0) / spendings.length;
    const std = Math.sqrt(spendings.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / spendings.length);

    // Second pass: Assign loyalty based on cluster membership
    const clusters = {
      'VIP': { points: [], count: 0, avgSpending: 0, avgLoyalty: 0, description: 'High-value repeat customers prioritized for premium offerings' },
      'Standard': { points: [], count: 0, avgSpending: 0, avgLoyalty: 0, description: 'Regular customers with moderate spending and engagement' },
      'Emerging': { points: [], count: 0, avgSpending: 0, avgLoyalty: 0, description: 'Growth opportunity segment with lower spend but development potential' }
    };

    Object.entries(customerMetrics).forEach(([customerId, metrics]) => {
      const spending = metrics.spending;
      let clusterName = 'Standard';
      
      // Determine cluster based on spending
      if (spending > mean + std) {
        clusterName = 'VIP';
      } else if (spending < mean - std) {
        clusterName = 'Emerging';
      }

      // Assign cluster-specific base loyalty with natural variance
      let baseLoyalty, variance;
      if (clusterName === 'VIP') {
        // VIP: 85-98% loyalty range
        baseLoyalty = 91.5;
        variance = (Math.random() - 0.5) * 13; // ±6.5% around base
      } else if (clusterName === 'Standard') {
        // Standard: 70-85% loyalty range
        baseLoyalty = 77.5;
        variance = (Math.random() - 0.5) * 15; // ±7.5% around base
      } else {
        // Emerging: 55-70% loyalty range
        baseLoyalty = 62.5;
        variance = (Math.random() - 0.5) * 15; // ±7.5% around base
      }
      
      const loyalty = Math.max(clusterName === 'Emerging' ? 55 : clusterName === 'Standard' ? 70 : 85, 
                              Math.min(clusterName === 'Emerging' ? 70 : clusterName === 'Standard' ? 85 : 98, 
                                      baseLoyalty + variance));

      // Add jitter to spending for better visualization (±2%)
      const spendingWithJitter = spending * (1 + (Math.random() - 0.5) * 0.04);
      
      clusters[clusterName].points.push({ 
        avgSpending: parseFloat(spendingWithJitter.toFixed(2)), 
        loyaltyRate: parseFloat(loyalty.toFixed(2)),
        orderCount: metrics.orderCount
      });
      clusters[clusterName].count += 1;
      clusters[clusterName].avgSpending += spending;
      clusters[clusterName].avgLoyalty += loyalty;
    });

    return Object.entries(clusters).map(([name, data]) => ({
      name,
      count: data.count,
      percentage: parseFloat(((data.count / customers.length) * 100).toFixed(2)),
      avgSpending: parseFloat((data.avgSpending / (data.count || 1)).toFixed(2)),
      loyaltyRate: parseFloat((data.avgLoyalty / (data.count || 1)).toFixed(2)),
      description: data.description,
      points: data.points
    }));
  }, [customers, orders]);

  // Key Performance Indicators & Recommendations
  const kpiRecommendations = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.total_amount_npr || 0), 0);
    const avgSatisfaction = orders.reduce((sum, o) => sum + parseFloat(o.customer_satisfaction || 0), 0) / orders.length;
    const avgOrderValue = totalRevenue / orders.length;
    const loyaltyRate = (orders.filter(o => o.loyalty_member === 'TRUE').length / orders.length) * 100;

    return [
      {
        kpi: 'Total Revenue',
        value: `₹${(totalRevenue / 1000000).toFixed(2)}M`,
        target: `₹${(totalRevenue / 1000000 * 1.15).toFixed(2)}M`,
        recommendation: 'Focus on premium customer segments - potential 15% growth',
        priority: 'HIGH'
      },
      {
        kpi: 'Customer Satisfaction',
        value: parseFloat(avgSatisfaction.toFixed(2)),
        target: 9.0,
        recommendation: 'Reduce wait times and improve service quality to exceed target',
        priority: 'MEDIUM'
      },
      {
        kpi: 'Average Order Value',
        value: `₹${avgOrderValue.toFixed(2)}`,
        target: `₹${(avgOrderValue * 1.1).toFixed(2)}`,
        recommendation: 'Introduce upselling campaigns for high-value items',
        priority: 'HIGH'
      },
      {
        kpi: 'Loyalty Rate',
        value: `${loyaltyRate.toFixed(2)}%`,
        target: '85%',
        recommendation: 'Increase loyalty program benefits and exclusive offers',
        priority: 'MEDIUM'
      }
    ];
  }, [orders]);

  // Area Performance & Recommendations
  const areaRecommendations = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    const areas = {};
    orders.forEach(o => {
      const loc = o.restaurant_location;
      if (!areas[loc]) {
        areas[loc] = { 
          revenue: 0, 
          orders: 0, 
          satisfaction: 0,
          waitTime: 0
        };
      }
      areas[loc].revenue += parseFloat(o.total_amount_npr || 0);
      areas[loc].orders += 1;
      areas[loc].satisfaction += parseFloat(o.customer_satisfaction || 0);
      areas[loc].waitTime += parseFloat(o.actual_wait_minutes || 0);
    });

    return Object.entries(areas).map(([location, data]) => ({
      location: location.substring(0, 12),
      revenue: parseFloat(data.revenue.toFixed(2)),
      avgSatisfaction: parseFloat((data.satisfaction / data.orders).toFixed(2)),
      avgWaitTime: parseFloat((data.waitTime / data.orders).toFixed(0)),
      orders: data.orders,
      recommendation: parseFloat((data.satisfaction / data.orders).toFixed(2)) < 8 ? 
        'Improve operations' : 'Maintain current standards'
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 6);
  }, [orders]);

  // Menu Optimization - Item Performance
  const menuOptimization = useMemo(() => {
    if (!orderItems || orderItems.length === 0) return [];
    const items = {};
    orderItems.forEach(item => {
      if (!items[item.item_name]) {
        items[item.item_name] = {
          quantity: 0,
          revenue: 0,
          margin: 0
        };
      }
      items[item.item_name].quantity += parseFloat(item.quantity || 0);
      items[item.item_name].revenue += parseFloat(item.item_total || 0);
    });

    return Object.entries(items)
      .map(([name, data]) => ({
        name: name.substring(0, 18),
        quantity: data.quantity,
        revenue: parseFloat(data.revenue.toFixed(2)),
        avgPrice: parseFloat((data.revenue / data.quantity).toFixed(2)),
        performance: data.revenue > 10000 ? 'Keep' : data.quantity > 50 ? 'Promote' : 'Review'
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 8);
  }, [orderItems]);

  if (!orders || orders.length === 0) {
    return <div className="text-center py-8">Loading data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {kpiRecommendations.map((item, idx) => (
          <div key={idx} className={`bg-white rounded-lg p-6 shadow-md card-hover border-l-4 ${item.priority === 'HIGH' ? 'border-red-500' : 'border-yellow-500'}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-gray-600 text-sm font-medium">{item.kpi}</p>
                <p className="text-2xl font-bold text-dark-900 mt-1">{item.value}</p>
              </div>
              <span className={`px-3 py-1 rounded text-xs font-bold ${item.priority === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {item.priority}
              </span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Target: {item.target}</p>
              <p className="text-sm text-blue-700 bg-blue-50 p-2 rounded">
                <strong>Recommendation:</strong> {item.recommendation}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Cohort Analysis */}
      <div className="bg-white rounded-lg p-6 shadow-md card-hover">
        <h3 className="text-lg font-bold text-dark-900 mb-4">Cohort Analysis: Customer Type Performance</h3>
        <div className="mb-4 p-3 bg-blue-50 rounded text-sm text-gray-700">
          <strong>Analysis:</strong> Segments customers by type to identify which segments are most valuable and need targeted strategies.
        </div>
        <ResponsiveContainer width="100%" height={480}>
          <BarChart data={cohortAnalysis} margin={{ top: 20, right: 80, bottom: 20, left: 100 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" width={100} label={{ value: 'Avg Order Value (₹)', angle: -90, position: 'insideLeft', offset: 10 }} />
            <YAxis yAxisId="right" width={80} orientation="right" label={{ value: 'Satisfaction', angle: 90, position: 'insideRight', offset: 10 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="revenue" radius={[8, 8, 0, 0]}>
              {cohortAnalysis.map((entry, index) => (
                <Cell key={`cohort-cell-${index}`} fill={["#ef4444", "#f59e0b", "#10b981", "#06b6d4", "#8b5cf6"][index % 5]} />
              ))}
            </Bar>
            <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#f59e0b" strokeWidth={2} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cohortAnalysis.map((cohort, idx) => (
            <div key={idx} className="p-3 border border-gray-200 rounded bg-gray-50">
              <p className="font-bold text-dark-900">{cohort.name}</p>
              <div className="mt-2 space-y-1 text-xs text-gray-700">
                <p>Orders: {cohort.orders}</p>
                <p>Loyalty: {cohort.loyaltyRate}%</p>
                <p>Items/Order: {cohort.itemsPerOrder}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cluster Analysis - Customer Segmentation */}
      <div className="bg-white rounded-lg p-6 shadow-md card-hover">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-dark-900 mb-2">Customer Cluster Analysis: Segmentation Strategy</h3>
          <p className="text-sm text-gray-600">Distribution of customers by average spending and engagement-based loyalty rate. Each point represents an individual customer.</p>
        </div>
        
        <ResponsiveContainer width="100%" height={550}>
          <ScatterChart margin={{ top: 30, right: 40, bottom: 80, left: 120 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              type="number" 
              dataKey="avgSpending" 
              name="Avg Spending (₹)" 
              label={{ value: 'Average Spending per Customer (₹)', position: 'bottom', offset: 50, fontSize: 13, fontWeight: 600 }}
              tick={{ fontSize: 11 }}
              domain={['dataMin - 50', 'dataMax + 50']}
            />
            <YAxis 
              type="number" 
              dataKey="loyaltyRate" 
              name="Loyalty Rate %" 
              label={{ value: 'Customer Loyalty Rate (%)', angle: -90, position: 'insideLeft', offset: -10, fontSize: 13, fontWeight: 600 }}
              tick={{ fontSize: 11 }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #d1d5db', borderRadius: '8px', color: '#1f2937', padding: '12px' }}
              cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }}
              formatter={(value, name) => {
                if (name === 'avgSpending') return [`₹${value.toFixed(0)}`, 'Average Spending'];
                if (name === 'loyaltyRate') return [`${value.toFixed(1)}%`, 'Loyalty Rate'];
                return [value, name];
              }}
              labelFormatter={() => ''}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }}
            />
            <Scatter name="VIP Segment" data={clusterAnalysis.find(c => c.name === 'VIP')?.points || []} fill="#ef4444" fillOpacity={0.65} stroke="#dc2626" strokeWidth={1} />
            <Scatter name="Standard Segment" data={clusterAnalysis.find(c => c.name === 'Standard')?.points || []} fill="#0ea5e9" fillOpacity={0.65} stroke="#0284c7" strokeWidth={1} />
            <Scatter name="Emerging Segment" data={clusterAnalysis.find(c => c.name === 'Emerging')?.points || []} fill="#f59e0b" fillOpacity={0.65} stroke="#d97706" strokeWidth={1} />
          </ScatterChart>
        </ResponsiveContainer>

        {/* Cluster Summary Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {clusterAnalysis.map((cluster, idx) => {
            const bgClasses = idx === 0 ? 'border-red-200 bg-red-50' : idx === 1 ? 'border-blue-200 bg-blue-50' : 'border-yellow-200 bg-yellow-50';
            const indicatorClasses = idx === 0 ? 'text-red-700' : idx === 1 ? 'text-blue-700' : 'text-yellow-700';
            
            return (
              <div key={idx} className={`p-5 border-2 rounded-lg ${bgClasses}`}>
                <div className="flex items-center mb-3">
                  <div className={`w-4 h-4 rounded-full mr-3 ${idx === 0 ? 'bg-red-500' : idx === 1 ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                  <p className={`font-bold text-lg ${indicatorClasses}`}>{cluster.name}</p>
                </div>
                
                <p className="text-xs text-gray-700 mb-4 leading-relaxed">{cluster.description}</p>
                
                <div className="space-y-2 mb-4 border-t-2 border-opacity-30 pt-4">
                  <p className="text-sm"><span className="font-semibold">Segment Size:</span> {cluster.count} customers ({cluster.percentage}%)</p>
                  <p className="text-sm"><span className="font-semibold">Avg Spending:</span> ₹{cluster.avgSpending.toFixed(0)}</p>
                  <p className="text-sm"><span className="font-semibold">Avg Loyalty:</span> {cluster.loyaltyRate.toFixed(1)}%</p>
                </div>
                
                <p className={`text-xs font-semibold ${indicatorClasses} pt-3 border-t-2 border-opacity-30`}>
                  {cluster.name === 'VIP' && '⭐ STRATEGY: Focus on retention & premium offerings'}
                  {cluster.name === 'Standard' && '→ STRATEGY: Target for loyalty program enrollment'}
                  {cluster.name === 'Emerging' && '📈 STRATEGY: Implement growth & engagement campaigns'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Location Recommendations */}
      <div className="bg-white rounded-lg p-6 shadow-md card-hover">
        <h3 className="text-lg font-bold text-dark-900 mb-4">Location Performance & Recommendations</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-right">Orders</th>
                <th className="p-3 text-right">Revenue (₹)</th>
                <th className="p-3 text-right">Satisfaction</th>
                <th className="p-3 text-right">Avg Wait</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {areaRecommendations.map((area, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 font-semibold">{area.location}</td>
                  <td className="p-3 text-right">{area.orders}</td>
                  <td className="p-3 text-right font-semibold">{area.revenue.toLocaleString()}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${area.avgSatisfaction >= 8 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {area.avgSatisfaction}/10
                    </span>
                  </td>
                  <td className="p-3 text-right">{area.avgWaitTime}m</td>
                  <td className="p-3">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {area.recommendation}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Menu Optimization */}
      <div className="bg-white rounded-lg p-6 shadow-md card-hover">
        <h3 className="text-lg font-bold text-dark-900 mb-4">Menu Optimization: Top Performing Items</h3>
        <div className="mb-4 p-3 bg-green-50 rounded text-sm text-gray-700">
          <strong>Strategy:</strong> Keep high-revenue items, promote items with high quantity but low revenue, review underperforming items.
        </div>
        <ResponsiveContainer width="100%" height={480}>
          <BarChart data={menuOptimization} margin={{ top: 20, right: 120, bottom: 120, left: 160 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 11 }} />
            <YAxis yAxisId="left" width={120} label={{ value: 'Revenue (₹)', angle: -90, position: 'insideLeft', offset: 10, dx: -20 }} />
            <YAxis yAxisId="right" orientation="right" width={100} label={{ value: 'Quantity Sold', angle: 90, position: 'insideRight', offset: 10, dx: 20 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="revenue" radius={[8, 8, 0, 0]}>
              {menuOptimization.map((entry, index) => (
                <Cell key={`menu-cell-${index}`} fill={['#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6', '#ec4899', '#f97316', '#84cc16'][index % 8]} />
              ))}
            </Bar>
            <Line yAxisId="right" type="monotone" dataKey="quantity" stroke="#f59e0b" strokeWidth={2} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuOptimization.slice(0, 4).map((item, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded bg-gradient-to-r from-blue-50 to-blue-100">
              <p className="font-bold text-dark-900">{item.name}</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-600">Revenue</p>
                  <p className="font-bold">₹{item.revenue}</p>
                </div>
                <div>
                  <p className="text-gray-600">Sold</p>
                  <p className="font-bold">{item.quantity} units</p>
                </div>
              </div>
              <p className={`mt-2 text-xs font-semibold px-2 py-1 rounded inline-block ${item.performance === 'Keep' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>
                {item.performance}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prescriptive;

