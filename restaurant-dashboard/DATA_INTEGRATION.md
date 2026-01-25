# Data Integration Guide

This guide explains how to integrate your CSV data files with the Restaurant Dashboard.

## Overview

The dashboard requires data in JSON format. This guide shows you how to set up a backend service to convert your CSV files to JSON data that the dashboard can consume.

## Option 1: Node.js/Express Backend (Recommended)

### Step 1: Create Backend Server

Create a `server.js` file in the project root:

```javascript
const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

// Parse CSV helper
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

// API Routes
app.get('/api/data/orders', async (req, res) => {
  try {
    const data = await parseCSV('./enterprise/Kathmandu Restaurant Orders.csv');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/data/customers', async (req, res) => {
  try {
    const data = await parseCSV('./enterprise/Customer Profiles.csv');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/data/items', async (req, res) => {
  try {
    const data = await parseCSV('./enterprise/Order Items Detail.csv');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/data/menu', async (req, res) => {
  try {
    const data = await parseCSV('./enterprise/Menu Catalog.csv');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### Step 2: Install Dependencies

```bash
npm install express cors csv-parser
npm install --save-dev nodemon
```

Update `package.json` scripts:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "server": "node server.js",
    "dev": "concurrently \"npm start\" \"npm run server\"",
    "build": "react-scripts build"
  }
}
```

### Step 3: Update App.jsx

Modify the data loading in `src/App.jsx`:

```javascript
useEffect(() => {
  const loadData = async () => {
    try {
      const [ordersRes, customersRes, itemsRes] = await Promise.all([
        fetch('http://localhost:5000/api/data/orders'),
        fetch('http://localhost:5000/api/data/customers'),
        fetch('http://localhost:5000/api/data/items')
      ]);

      const orders = await ordersRes.json();
      const customers = await customersRes.json();
      const orderItems = await itemsRes.json();

      setData({ orders, customers, orderItems, menuCatalog: [] });
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  loadData();
}, []);
```

### Step 4: Run Both Servers

```bash
# Terminal 1 - React dev server
npm start

# Terminal 2 - Backend server
npm run server
```

## Option 2: Python/Flask Backend

Create `backend.py`:

```python
from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Load CSV files
def load_csv(filename):
    filepath = os.path.join('./enterprise', filename)
    return pd.read_csv(filepath).to_dict('records')

@app.route('/api/data/orders', methods=['GET'])
def get_orders():
    data = load_csv('Kathmandu Restaurant Orders.csv')
    return jsonify(data)

@app.route('/api/data/customers', methods=['GET'])
def get_customers():
    data = load_csv('Customer Profiles.csv')
    return jsonify(data)

@app.route('/api/data/items', methods=['GET'])
def get_items():
    data = load_csv('Order Items Detail.csv')
    return jsonify(data)

@app.route('/api/data/menu', methods=['GET'])
def get_menu():
    data = load_csv('Menu Catalog.csv')
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

Install dependencies:
```bash
pip install flask flask-cors pandas
```

Run server:
```bash
python backend.py
```

## Option 3: Browser-Based CSV Loading

For development/demo without backend, update `App.jsx`:

```javascript
import Papa from 'papaparse';

useEffect(() => {
  const loadCSV = async (url) => {
    const response = await fetch(url);
    const csvText = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => resolve(results.data),
        error: (error) => reject(error)
      });
    });
  };

  const loadAllData = async () => {
    try {
      const [orders, customers, items] = await Promise.all([
        loadCSV('/data/Kathmandu Restaurant Orders.csv'),
        loadCSV('/data/Customer Profiles.csv'),
        loadCSV('/data/Order Items Detail.csv')
      ]);

      setData({ orders, customers, orderItems: items });
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  loadAllData();
}, []);
```

Place CSV files in `public/data/` folder.

## Data Structure Expected

### Orders Data
```javascript
{
  order_id: "1",
  customer_id: "1",
  order_datetime: "2024-01-01 12:30",
  day_of_week: "1",
  hour_of_day: "12",
  meal_period: "Lunch",
  order_type: "Dine-in",
  restaurant_location: "Thamel Branch",
  party_size: "2",
  num_items: "3",
  subtotal_npr: "800",
  service_charge_npr: "80",
  vat_npr: "104",
  delivery_charge_npr: "0",
  total_amount_npr: "984",
  payment_method: "Card",
  expected_wait_minutes: "15",
  actual_wait_minutes: "14",
  customer_satisfaction: "8.5",
  tip_amount_npr: "50",
  loyalty_member: "TRUE"
}
```

### Customers Data
```javascript
{
  customer_id: "1",
  customer_type: "Corporate",
  age: "28",
  gender: "Male",
  area: "Thamel",
  dietary_preference: "Non-Vegetarian",
  spice_preference: "Medium",
  avg_spending_npr: "1200",
  loyalty_member: "TRUE",
  loyalty_status: "Loyal"
}
```

### Order Items Data
```javascript
{
  order_id: "1",
  item_id: "45",
  item_name: "Chicken Biryani",
  category: "Nepali Main Course",
  quantity: "1",
  unit_price: "800",
  discount_percent: "0",
  item_total: "800"
}
```

## Data Validation

Ensure your CSV files have proper formatting:

1. **Headers**: Column names should be consistent (use spaces, not underscores)
2. **Data Types**: 
   - Numeric fields: No currency symbols, commas
   - Dates: ISO format (YYYY-MM-DD HH:MM:SS)
   - Booleans: TRUE/FALSE or 1/0
3. **Missing Values**: Handle empty cells appropriately

Example cleanup in Node.js:

```javascript
function cleanData(records) {
  return records.map(record => ({
    ...record,
    total_amount_npr: parseFloat(record.total_amount_npr) || 0,
    customer_satisfaction: parseFloat(record.customer_satisfaction) || 0,
    hour_of_day: parseInt(record.hour_of_day) || 0,
    loyalty_member: record.loyalty_member === 'TRUE' ? true : false
  }));
}
```

## Performance Considerations

For large datasets (50,000+ records):

1. **Pagination**: Load data in chunks
```javascript
app.get('/api/data/orders', (req, res) => {
  const page = req.query.page || 1;
  const limit = 1000;
  const skip = (page - 1) * limit;
  
  const data = loadCSV(...).slice(skip, skip + limit);
  res.json({ data, page, total: totalRecords });
});
```

2. **Caching**: Cache parsed data in memory
```javascript
let cachedOrders = null;

function getOrders() {
  if (!cachedOrders) {
    cachedOrders = parseCSV('Kathmandu Restaurant Orders.csv');
  }
  return cachedOrders;
}
```

3. **Compression**: Enable gzip compression
```javascript
const compression = require('compression');
app.use(compression());
```

## Troubleshooting

### CORS Errors
Ensure CORS is enabled on backend:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### CSV Parsing Issues
- Check file encoding (should be UTF-8)
- Verify delimiter (usually comma)
- Ensure no line breaks within quoted fields

### Missing Data
- Verify CSV file structure
- Check column name mapping
- Validate data types

## Next Steps

1. Choose your backend option
2. Place CSV files in correct location
3. Update API endpoints in App.jsx
4. Test data loading
5. Deploy to production

---

For more details on specific calculations, see `DASHBOARD_DOCUMENTATION.md`
