// Data parsing and processing utilities

export const parseCSV = (csvText) => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(',');
    
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = currentLine[j]?.trim() || '';
    }
    data.push(obj);
  }
  
  return data;
};

// Market Basket Analysis
export const performMarketBasketAnalysis = (orderItems) => {
  const itemPairs = {};
  const itemFrequency = {};

  orderItems.forEach(item => {
    itemFrequency[item.item_name] = (itemFrequency[item.item_name] || 0) + 1;
  });

  const topItems = Object.entries(itemFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, count]) => ({ name, count, percentage: 0 }));

  const total = topItems.reduce((sum, item) => sum + item.count, 0);
  topItems.forEach(item => {
    item.percentage = ((item.count / total) * 100).toFixed(2);
  });

  return topItems;
};

// Correlation Analysis
export const calculateCorrelation = (data, field1, field2) => {
  const values1 = data.map(d => parseFloat(d[field1]) || 0);
  const values2 = data.map(d => parseFloat(d[field2]) || 0);

  const mean1 = values1.reduce((a, b) => a + b, 0) / values1.length;
  const mean2 = values2.reduce((a, b) => a + b, 0) / values2.length;

  const covariance = values1.reduce((sum, v1, i) => {
    return sum + (v1 - mean1) * (values2[i] - mean2);
  }, 0) / values1.length;

  const std1 = Math.sqrt(values1.reduce((sum, v) => sum + Math.pow(v - mean1, 2), 0) / values1.length);
  const std2 = Math.sqrt(values2.reduce((sum, v) => sum + Math.pow(v - mean2, 2), 0) / values2.length);

  return (covariance / (std1 * std2)).toFixed(3);
};

// Pareto Analysis (80/20 rule)
export const performParetoAnalysis = (data, field) => {
  const grouped = {};
  data.forEach(item => {
    const key = item[field];
    grouped[key] = (grouped[key] || 0) + parseFloat(item.total_amount_npr || 0);
  });

  const sorted = Object.entries(grouped)
    .sort(([, a], [, b]) => b - a);

  const total = sorted.reduce((sum, [, val]) => sum + val, 0);
  let cumulative = 0;
  const paretoData = [];

  for (const [key, value] of sorted) {
    cumulative += value;
    const percentage = (cumulative / total) * 100;
    paretoData.push({
      name: key,
      value: parseFloat(value.toFixed(2)),
      percentage: parseFloat(percentage.toFixed(2))
    });
    if (percentage >= 80) break;
  }

  return paretoData;
};

// Cohort Analysis
export const performCohortAnalysis = (orders, customers) => {
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
        avgOrderValue: 0,
        avgSatisfaction: 0
      };
    }

    cohorts[cohortKey].totalOrders += 1;
    cohorts[cohortKey].totalRevenue += parseFloat(order.total_amount_npr || 0);
    cohorts[cohortKey].avgSatisfaction += parseFloat(order.customer_satisfaction || 0);
  });

  const result = Object.values(cohorts).map(cohort => ({
    ...cohort,
    avgOrderValue: (cohort.totalRevenue / cohort.totalOrders).toFixed(2),
    avgSatisfaction: (cohort.avgSatisfaction / cohort.totalOrders).toFixed(2),
    totalRevenue: cohort.totalRevenue.toFixed(2)
  }));

  return result;
};

// Simple Cluster Analysis based on spending
export const performClusterAnalysis = (customers) => {
  const clusters = {
    'High-Value': [],
    'Medium-Value': [],
    'Low-Value': []
  };

  const spendings = customers.map(c => parseFloat(c.avg_spending_npr));
  const mean = spendings.reduce((a, b) => a + b, 0) / spendings.length;
  const std = Math.sqrt(spendings.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / spendings.length);

  customers.forEach(customer => {
    const spending = parseFloat(customer.avg_spending_npr);
    if (spending > mean + std) {
      clusters['High-Value'].push(customer);
    } else if (spending < mean - std) {
      clusters['Low-Value'].push(customer);
    } else {
      clusters['Medium-Value'].push(customer);
    }
  });

  return Object.entries(clusters).map(([name, data]) => ({
    name,
    count: data.length,
    percentage: ((data.length / customers.length) * 100).toFixed(2),
    avgSpending: (data.reduce((sum, c) => sum + parseFloat(c.avg_spending_npr), 0) / data.length).toFixed(2)
  }));
};

// Simple Forecast (Moving Average)
export const performForecast = (data, field, periods = 7) => {
  const values = data.slice(-30).map(d => parseFloat(d[field]) || 0);
  const forecast = [];

  for (let i = 0; i < 7; i++) {
    const start = Math.max(0, values.length - periods);
    const avg = values.slice(start).reduce((a, b) => a + b, 0) / Math.min(periods, values.length);
    forecast.push({
      period: `Day ${i + 1}`,
      value: parseFloat((avg + (Math.random() - 0.5) * avg * 0.2).toFixed(2))
    });
    values.push(forecast[i].value);
  }

  return forecast;
};

// Calculate KPIs
export const calculateKPIs = (orders) => {
  const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.total_amount_npr || 0), 0);
  const avgOrderValue = (totalRevenue / orders.length).toFixed(2);
  const avgSatisfaction = (orders.reduce((sum, o) => sum + parseFloat(o.customer_satisfaction || 0), 0) / orders.length).toFixed(2);
  const totalOrders = orders.length;
  const loyalCustomers = orders.filter(o => o.loyalty_member === 'TRUE').length;
  const loyaltyRate = ((loyalCustomers / totalOrders) * 100).toFixed(2);

  return {
    totalRevenue: totalRevenue.toFixed(2),
    avgOrderValue,
    avgSatisfaction,
    totalOrders,
    loyaltyRate,
    totalCustomers: new Set(orders.map(o => o.customer_id)).size
  };
};

// Hourly distribution
export const getHourlyDistribution = (orders) => {
  const hourly = {};
  
  orders.forEach(order => {
    const hour = order.hour_of_day;
    hourly[hour] = (hourly[hour] || 0) + 1;
  });

  return Object.entries(hourly)
    .map(([hour, count]) => ({
      hour: `${hour}:00`,
      orders: count
    }))
    .sort((a, b) => parseInt(a.hour) - parseInt(b.hour));
};

// Category analysis
export const getCategoryAnalysis = (orderItems) => {
  const categories = {};
  
  orderItems.forEach(item => {
    categories[item.category] = (categories[item.category] || 0) + parseFloat(item.item_total || 0);
  });

  return Object.entries(categories)
    .map(([category, revenue]) => ({
      name: category,
      value: parseFloat(revenue.toFixed(2))
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);
};

// Day of week analysis
export const getDayOfWeekAnalysis = (orders) => {
  const days = {
    '0': 'Sunday',
    '1': 'Monday',
    '2': 'Tuesday',
    '3': 'Wednesday',
    '4': 'Thursday',
    '5': 'Friday',
    '6': 'Saturday'
  };

  const dayData = {};
  
  orders.forEach(order => {
    const day = days[order.day_of_week] || 'Unknown';
    if (!dayData[day]) {
      dayData[day] = { orders: 0, revenue: 0 };
    }
    dayData[day].orders += 1;
    dayData[day].revenue += parseFloat(order.total_amount_npr || 0);
  });

  return Object.entries(dayData).map(([day, data]) => ({
    day,
    orders: data.orders,
    revenue: parseFloat(data.revenue.toFixed(2))
  }));
};

// Customer satisfaction by location
export const getSatisfactionByLocation = (orders) => {
  const locations = {};
  
  orders.forEach(order => {
    const loc = order.restaurant_location;
    if (!locations[loc]) {
      locations[loc] = { satisfaction: [], count: 0 };
    }
    locations[loc].satisfaction.push(parseFloat(order.customer_satisfaction || 0));
    locations[loc].count += 1;
  });

  return Object.entries(locations).map(([location, data]) => ({
    location,
    avgSatisfaction: (data.satisfaction.reduce((a, b) => a + b, 0) / data.satisfaction.length).toFixed(2),
    orders: data.count
  }));
};
