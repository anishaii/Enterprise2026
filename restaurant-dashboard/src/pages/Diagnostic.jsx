import React, { useMemo } from 'react';
import {
  BarChart, Bar, ScatterChart, Scatter, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const Diagnostic = ({ orders, customers, orderItems }) => {
  // Correlation Analysis - Satisfaction vs Spending
  const correlationData = useMemo(() => {
    if (!orders || orders.length === 0) return { data: [], correlation: 0 };
    const customerSpending = {};
    orders.forEach(o => {
      const id = o.customer_id;
      if (!customerSpending[id]) {
        customerSpending[id] = { spending: 0, satisfaction: 0, count: 0 };
      }
      customerSpending[id].spending += parseFloat(o.total_amount_npr || 0);
      customerSpending[id].satisfaction += parseFloat(o.customer_satisfaction || 0);
      customerSpending[id].count += 1;
    });

    const data = Object.values(customerSpending).map(d => ({
      spending: parseFloat((d.spending / d.count).toFixed(2)),
      satisfaction: parseFloat((d.satisfaction / d.count).toFixed(2))
    }));

    // Calculate correlation coefficient
    const mean1 = data.reduce((sum, d) => sum + d.spending, 0) / data.length;
    const mean2 = data.reduce((sum, d) => sum + d.satisfaction, 0) / data.length;
    const covariance = data.reduce((sum, d) => sum + (d.spending - mean1) * (d.satisfaction - mean2), 0) / data.length;
    const std1 = Math.sqrt(data.reduce((sum, d) => sum + Math.pow(d.spending - mean1, 2), 0) / data.length);
    const std2 = Math.sqrt(data.reduce((sum, d) => sum + Math.pow(d.satisfaction - mean2, 2), 0) / data.length);
    const correlation = (covariance / (std1 * std2)).toFixed(3);

    return { data: data.slice(0, 200), correlation };
  }, [orders]);

  // Pareto Analysis - Top Revenue Categories
  const paretoData = useMemo(() => {
    if (!orderItems || orderItems.length === 0) return [];
    const categories = {};
    orderItems.forEach(item => {
      const cat = item.category;
      categories[cat] = (categories[cat] || 0) + parseFloat(item.item_total || 0);
    });

    const sorted = Object.entries(categories)
      .sort(([, a], [, b]) => b - a);

    const total = sorted.reduce((sum, [, val]) => sum + val, 0);
    let cumulative = 0;
    const paretoList = [];

    sorted.forEach(([name, value]) => {
      cumulative += value;
      paretoList.push({
        name: name,
        revenue: parseFloat(value.toFixed(2)),
        cumulative: parseFloat(cumulative.toFixed(2)),
        percentage: parseFloat(((cumulative / total) * 100).toFixed(2))
      });
    });

    return paretoList;
  }, [orderItems]);

  // Day of week vs satisfaction
  const dayAnalysis = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayData = {};

    orders.forEach(o => {
      const day = days[parseInt(o.day_of_week) || 0];
      if (!dayData[day]) {
        dayData[day] = { satisfaction: 0, count: 0, revenue: 0 };
      }
      dayData[day].satisfaction += parseFloat(o.customer_satisfaction || 0);
      dayData[day].revenue += parseFloat(o.total_amount_npr || 0);
      dayData[day].count += 1;
    });

    return days.map(day => {
      if (!dayData[day] || dayData[day].count === 0) {
        return {
          day,
          avgSatisfaction: 0,
          avgRevenue: 0
        };
      }
      return {
        day,
        avgSatisfaction: parseFloat((dayData[day].satisfaction / dayData[day].count).toFixed(2)),
        avgRevenue: parseFloat((dayData[day].revenue / dayData[day].count).toFixed(2))
      };
    });
  }, [orders]);

  // Wait time vs satisfaction
  const waitTimeAnalysis = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    const bins = {
      '0-10': { satisfaction: 0, count: 0 },
      '11-20': { satisfaction: 0, count: 0 },
      '21-30': { satisfaction: 0, count: 0 },
      '31-40': { satisfaction: 0, count: 0 },
      '40+': { satisfaction: 0, count: 0 }
    };

    orders.forEach(o => {
      const wait = parseInt(o.actual_wait_minutes || 0);
      const sat = parseFloat(o.customer_satisfaction || 0);
      
      if (wait <= 10) {
        bins['0-10'].satisfaction += sat;
        bins['0-10'].count += 1;
      } else if (wait <= 20) {
        bins['11-20'].satisfaction += sat;
        bins['11-20'].count += 1;
      } else if (wait <= 30) {
        bins['21-30'].satisfaction += sat;
        bins['21-30'].count += 1;
      } else if (wait <= 40) {
        bins['31-40'].satisfaction += sat;
        bins['31-40'].count += 1;
      } else {
        bins['40+'].satisfaction += sat;
        bins['40+'].count += 1;
      }
    });

    return Object.entries(bins)
      .filter(([, data]) => data.count > 0)
      .map(([waitTime, data]) => ({
        waitTime,
        avgSatisfaction: parseFloat((data.satisfaction / data.count).toFixed(2)),
        orderCount: data.count
      }));
  }, [orders]);

  // Loyalty vs satisfaction
  const loyaltyAnalysis = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    const loyal = { satisfaction: 0, count: 0, revenue: 0 };
    const nonLoyal = { satisfaction: 0, count: 0, revenue: 0 };

    orders.forEach(o => {
      const sat = parseFloat(o.customer_satisfaction || 0);
      const rev = parseFloat(o.total_amount_npr || 0);
      
      if (o.loyalty_member === 'TRUE') {
        loyal.satisfaction += sat;
        loyal.revenue += rev;
        loyal.count += 1;
      } else {
        nonLoyal.satisfaction += sat;
        nonLoyal.revenue += rev;
        nonLoyal.count += 1;
      }
    });

    return [
      {
        type: 'Loyal Members',
        satisfaction: parseFloat((loyal.satisfaction / loyal.count).toFixed(2)),
        avgSpending: parseFloat((loyal.revenue / loyal.count).toFixed(2)),
        count: loyal.count
      },
      {
        type: 'Non-Loyal',
        satisfaction: parseFloat((nonLoyal.satisfaction / nonLoyal.count).toFixed(2)),
        avgSpending: parseFloat((nonLoyal.revenue / nonLoyal.count).toFixed(2)),
        count: nonLoyal.count
      }
    ];
  }, [orders]);

  // Party size vs order value
  const partyAnalysis = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    const party = {};
    orders.forEach(o => {
      const size = o.party_size;
      if (!party[size]) {
        party[size] = { revenue: 0, count: 0 };
      }
      party[size].revenue += parseFloat(o.total_amount_npr || 0);
      party[size].count += 1;
    });

    return Object.entries(party)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .slice(0, 10)
      .map(([size, data]) => ({
        partySize: `${size} people`,
        avgValue: parseFloat((data.revenue / data.count).toFixed(2)),
        orders: data.count
      }));
  }, [orders]);

  if (!orders || orders.length === 0) {
    return <div className="text-center py-8">Loading data...</div>;
  }

  const getSatisfactionColor = (s) => {
    // Map satisfaction score to a color: low -> red, mid -> amber/orange, high -> green
    if (s <= 4) return '#ef4444';
    if (s <= 6) return '#f97316';
    if (s <= 8) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="space-y-6">
      {/* Correlation Analysis */}
      <div className="bg-white rounded-lg p-6 shadow-md card-hover">
        <h3 className="text-lg font-bold text-dark-900 mb-2">Correlation Analysis: Spending vs Customer Satisfaction</h3>
        <div className="mb-4 p-3 bg-blue-50 rounded text-sm text-gray-700">
          <strong>Correlation Coefficient:</strong> {correlationData.correlation} 
          {Math.abs(parseFloat(correlationData.correlation)) > 0.3 ? 
            " - Moderate positive relationship between spending and satisfaction" : 
            " - Weak relationship"}       
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="spending" name="Avg Spending (₹)" />
            <YAxis type="number" dataKey="satisfaction" name="Avg Satisfaction" />
            <Tooltip
              contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }}
              cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }}
            />
            <Scatter name="Customers" data={correlationData.data}>
              {correlationData.data.map((p, i) => (
                <Cell key={`cell-${i}`} fill={getSatisfactionColor(p.satisfaction)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Pareto Analysis */}
      <div className="bg-white rounded-lg p-6 shadow-md card-hover">
        <h3 className="text-lg font-bold text-dark-900 mb-4">Pareto Analysis: 80/20 Rule Revenue Distribution</h3>
        <ResponsiveContainer width="100%" height={900}>
          <BarChart data={paretoData} margin={{ top: 20, right: 120, bottom: 220, left: 200 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={180} tick={{ fontSize: 13 }} interval={0} />
            <YAxis yAxisId="left" width={100} label={{ value: 'Revenue (₹)', angle: -90, position: 'left', dx: -60 }} tick={{ fontSize: 13 }} />
            <YAxis yAxisId="right" width={80} orientation="right" label={{ value: 'Cumulative %', angle: 90, position: 'right', dx: 60 }} tick={{ fontSize: 13 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }}
            />
            <Legend />
            {/** Per-bar colors for readability */}
            <Bar yAxisId="left" dataKey="revenue" radius={[8, 8, 0, 0]}>
              {paretoData.map((entry, index) => (
                <Cell key={`pareto-cell-${index}`} fill={["#06b6d4", "#0ea5e9", "#0284c7", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6", "#ec4899"][index % 8]} />
              ))}
            </Bar>
            <Line yAxisId="right" type="monotone" dataKey="percentage" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </BarChart>
        </ResponsiveContainer>
        <div className="-mt-20 p-4 bg-yellow-50 rounded text-sm text-gray-700">
          <strong>Insight:</strong> The first few categories contribute to the majority of revenue. Focus on these high-performing items for maximum ROI.
        </div>
      </div>

      {/* Day of Week Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Day vs Satisfaction */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4">Satisfaction by Day of Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dayAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }}
              />
              <Bar dataKey="avgSatisfaction" radius={[8, 8, 0, 0]}>
                {dayAnalysis.map((entry, index) => (
                  <Cell key={`day-cell-${index}`} fill={["#ef4444", "#f59e0b", "#10b981", "#06b6d4", "#8b5cf6", "#ec4899", "#f97316"][index % 7]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Day vs Revenue */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4">Average Revenue by Day of Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dayAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }}
              />
              <Line type="monotone" dataKey="avgRevenue" stroke="#0369a1" strokeWidth={2} dot={{ fill: '#0369a1' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Wait Time Impact */}
      <div className="bg-white rounded-lg p-6 shadow-md card-hover">
        <h3 className="text-lg font-bold text-dark-900 mb-4">Impact of Wait Time on Customer Satisfaction</h3>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={waitTimeAnalysis} margin={{ top: 20, right: 40, bottom: 5, left: 100 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="waitTime" label={{ value: 'Wait Time (minutes)', position: 'insideBottom', offset: -5 }} tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" label={{ value: 'Satisfaction Score', angle: -90, position: 'insideLeft' }} tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Number of Orders', angle: 90, position: 'insideRight' }} tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="avgSatisfaction" radius={[8, 8, 0, 0]}>
              {waitTimeAnalysis.map((entry, index) => (
                <Cell key={`wait-cell-${index}`} fill={["#ef4444", "#f59e0b", "#10b981", "#06b6d4", "#8b5cf6"][index % 5]} />
              ))}
            </Bar>
            <Line yAxisId="right" type="monotone" dataKey="orderCount" stroke="#f59e0b" strokeWidth={2} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Loyalty & Party Size */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loyalty Analysis */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4">Loyalty Member Impact</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={loyaltyAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" width={80} />
              <YAxis yAxisId="left" label={{ value: 'Satisfaction', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Avg Spending (₹)', angle: 90, position: 'insideRight' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="satisfaction" radius={[8, 8, 0, 0]}>
                {loyaltyAnalysis.map((entry, index) => (
                  <Cell key={`loyalty-cell-${index}`} fill={["#10b981", "#ef4444"][index % 2]} />
                ))}
              </Bar>
              <Line yAxisId="right" type="monotone" dataKey="avgSpending" stroke="#f59e0b" strokeWidth={2} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-gray-700">
            <p><strong>Total Loyal Members Orders:</strong> {loyaltyAnalysis[0].count}</p>
            <p><strong>Total Non-Loyal Orders:</strong> {loyaltyAnalysis[1].count}</p>
          </div>
        </div>

        {/* Party Size Analysis */}
        <div className="bg-white rounded-lg p-6 shadow-md card-hover">
          <h3 className="text-lg font-bold text-dark-900 mb-4">Order Value by Party Size</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={partyAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="partySize" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }}
                formatter={(value) => `₹${value}`}
              />
              <Bar dataKey="avgValue" radius={[8, 8, 0, 0]}>
                {partyAnalysis.map((entry, index) => (
                  <Cell key={`party-cell-${index}`} fill={["#ef4444", "#f59e0b", "#10b981", "#06b6d4", "#8b5cf6", "#ec4899", "#f97316", "#84cc16"][index % 8]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Diagnostic;

