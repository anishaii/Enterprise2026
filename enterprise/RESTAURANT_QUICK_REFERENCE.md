# Restaurant Dataset - Quick Reference Guide

## 🍽️ Dataset at a Glance

| Metric | Value |
|--------|-------|
| **Total Orders** | 50,000 |
| **Customers** | 5,000 |
| **Menu Items** | 99 items (9 categories) |
| **Revenue** | NPR 50 million+ |
| **Time Period** | 6 months |
| **Avg Order Value** | NPR 1,001 |
| **Satisfaction** | 8.04/10 |

---

## 📁 Files Summary

| File | Size | Rows | Purpose |
|------|------|------|---------|
| kathmandu_restaurant_orders.csv | 9.5 MB | 50,000 | Main order data |
| order_items_detail.csv | 5.1 MB | 109,819 | Item-level details |
| menu_catalog.csv | 6.9 KB | 99 | Menu information |
| customer_profiles.csv | 293 KB | 5,000 | Customer data |

---

## 🎯 Customer Segments

```
Local (50.1%)      → Traditional food, moderate spend (NPR 300-1,000)
Student (15.0%)    → Budget meals, fast food (NPR 200-700)
Tourist (14.9%)    → High spend, variety (NPR 800-2,500)
Expat (10.5%)      → Regular, mixed cuisine (NPR 700-2,000)
Corporate (9.5%)   → Lunch rush, efficient (NPR 500-1,500)
```

---

## 🍜 Menu Categories

| Category | Items | Price Range | Popular Items |
|----------|-------|-------------|---------------|
| Nepali Main | 14 | 150-600 | Dal Bhat, Momo, Sekuwa |
| Indian Main | 11 | 200-800 | Butter Chicken, Biryani |
| Chinese | 12 | 150-500 | Chowmein, Fried Rice |
| Continental | 12 | 300-1,200 | Pizza, Pasta, Burger |
| Snacks | 10 | 50-300 | Samosa, Chatpate |
| Beverages | 14 | 30-200 | Chiya, Coffee, Lassi |
| Desserts | 9 | 80-350 | Juju Dhau, Ice Cream |
| Breakfast | 9 | 100-400 | Paratha, Puri |
| Appetizers | 8 | 100-400 | Sadeko, Choila |

---

## ⏰ Peak Operating Hours

```
Breakfast Rush:  9-10 AM  (3,963 orders)
Lunch Peak:      1-2 PM   (4,033 orders)
Dinner Rush:     7-9 PM   (3,549 orders)
```

**Meal Period Distribution:**
- Lunch: 32.1%
- Dinner: 29.4%
- Breakfast: 27.3%
- Evening Snacks: 11.2%

---

## 💰 Revenue Breakdown

```
Order Types:
  Dine-in    → 48.7% | Higher satisfaction
  Takeaway   → 26.5% | Fast service
  Delivery   → 24.8% | Convenience fee NPR 50

Payment Methods:
  Card           → 41.7%
  Cash           → 34.3%
  Digital Wallet → 24.0%
```

---

## 🏆 Top 10 Selling Items

1. Chiya (Tea) - 3,480 orders
2. Coffee - 3,128 orders
3. Samay Baji - 3,121 orders
4. Lassi Mango - 2,819 orders
5. Samosa (Veg) - 2,777 orders
6. Coke - 2,758 orders
7. Fresh Lime Soda - 2,521 orders
8. Butter Milk - 2,406 orders
9. Mango Juice - 2,343 orders
10. Milk Shake - 2,110 orders

---

## 📊 Key Performance Metrics

### Customer Satisfaction
- Average: **8.04/10**
- Dine-in: 8.05/10
- Takeaway: 8.05/10
- Delivery: 8.02/10

### Operational Efficiency
- Avg Wait Time: **25.7 minutes**
- On-time Rate: **58.0%**
- Special Requests: **24.8%** of orders

### Customer Behavior
- Avg Party Size: **2.77 people**
- Avg Items/Order: **2.2 items**
- Loyalty Members: **35%**

---

## 🎓 Main Use Cases

### 1. Menu Engineering
```python
# Identify Stars, Plow Horses, Puzzles, Dogs
# Optimize pricing and placement
# Remove underperformers
```

### 2. Customer Segmentation
```python
# Target marketing by segment
# Personalized recommendations
# Loyalty programs
```

### 3. Revenue Optimization
```python
# Peak hour pricing
# Combo meal design
# Upselling strategies
```

### 4. Operational Efficiency
```python
# Staff scheduling
# Inventory management
# Wait time reduction
```

### 5. Customer Experience
```python
# Satisfaction prediction
# Service improvements
# Personalization
```

---

## 🔍 Quick Analysis Commands

### Load Data
```python
import pandas as pd
orders = pd.read_csv('kathmandu_restaurant_orders.csv')
menu = pd.read_csv('menu_catalog.csv')
order_items = pd.read_csv('order_items_detail.csv')
customers = pd.read_csv('customer_profiles.csv')
```

### Top Items
```python
order_items['item_name'].value_counts().head(10)
```

### Revenue by Hour
```python
orders.groupby('hour_of_day')['total_amount_npr'].sum()
```

### Customer Segments
```python
orders.groupby('customer_type').agg({
    'total_amount_npr': ['mean', 'sum'],
    'customer_satisfaction': 'mean'
})
```

### Menu Performance
```python
item_stats = order_items.groupby('item_name').agg({
    'quantity': 'sum',
    'item_total': 'sum'
}).sort_values('item_total', ascending=False)
```

---

## 📈 Menu Engineering Matrix

```
           High Popularity  |  Low Popularity
         -------------------|------------------
High     |                 |                  
Profit   |    ⭐ STARS    |   🧩 PUZZLES    
         |                 |                  
---------|-----------------|------------------
Low      |                 |                  
Profit   | 🐴 PLOW HORSES  |    🐕 DOGS      
         |                 |                  
```

**Actions:**
- **Stars**: Promote, maintain quality
- **Plow Horses**: Increase price or reduce portion
- **Puzzles**: Better placement, marketing
- **Dogs**: Remove or redesign

---

## 🎯 Quick Insights

### Customer Preferences
✓ Locals love Dal Bhat & Momo  
✓ Tourists prefer variety, mild spice  
✓ Students choose budget items  
✓ Beverages ordered with 80% of meals  

### Revenue Drivers
✓ Lunch & Dinner peak periods  
✓ Friday-Saturday higher volume  
✓ Dine-in highest average spend  
✓ Loyalty members spend 15% more  

### Operational Findings
✓ 42% of orders exceed expected wait  
✓ Special requests slow service by 3 min  
✓ Peak hours need 30% more staff  
✓ Delivery zone affects satisfaction  

---

## 💡 Business Recommendations

### Menu Optimization
1. Create combo meals from popular pairs
2. Reduce menu to top 70 items (remove dogs)
3. Add premium Nepali sets for tourists
4. Seasonal specials rotation

### Customer Experience
1. Better wait time communication
2. Mobile ordering for regulars
3. Dietary preference tracking
4. Feedback loop integration

### Revenue Growth
1. Happy hour pricing (2-5 PM)
2. Loyalty program enhancement
3. Corporate lunch packages
4. Delivery subscription model

### Operations
1. Kitchen workflow optimization
2. Inventory based on forecasts
3. Dynamic staff scheduling
4. Pre-prep during slow hours

---

## 📚 Data Fields Summary

**Orders (29 fields)**
- Identification (5): order_id, customer_id, dates
- Context (4): meal period, order type, location, party
- Financial (8): prices, charges, total, payment
- Operations (3): wait times, special requests
- Feedback (1): satisfaction
- Customer (8): demographics, preferences

**Menu (9 fields)**
- Item details, pricing, dietary info
- Prep time, popularity, calories

**Order Items (8 fields)**
- Item details, quantity, pricing
- Discounts, totals

---

## 🚀 Getting Started

1. **Explore**: Read README and Data Dictionary
2. **Load**: Import CSVs into your tool
3. **Analyze**: Run basic statistics
4. **Visualize**: Create charts for insights
5. **Model**: Build predictive models
6. **Act**: Implement recommendations

---

## 📊 Sample Analysis Output

```
=== MENU PERFORMANCE ===
Top Revenue Items:
1. Biryani (Chicken) - NPR 450,000
2. Dal Bhat Set - NPR 380,000
3. Momo (Chicken) - NPR 320,000

=== CUSTOMER SEGMENTS ===
Highest Spenders: Tourists (NPR 1,450/order)
Most Frequent: Locals (14 orders avg)
Best Satisfaction: Corporate (8.3/10)

=== OPERATIONAL ===
Busiest Hour: 1 PM (4,033 orders)
Slowest Hour: 3 AM (41 orders)
Avg Wait: 25.7 min (Target: 20 min)
```

---

**Perfect for:** Menu engineering, customer analytics, revenue optimization, operational efficiency, business intelligence

**Ready to optimize your restaurant! 🍽️📊**
