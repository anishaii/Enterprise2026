# Kathmandu Restaurant Customer Ordering Pattern Dataset

## 🍽️ Dataset Overview

A comprehensive dataset of **50,000 customer orders** from **5,000 unique customers** across restaurant locations in Kathmandu, Nepal. Designed for menu engineering, customer experience optimization, and business intelligence.

---

## 📁 Files Included

1. **kathmandu_restaurant_orders.csv** (Main dataset)
   - 50,000 order transactions
   - 29 features per order
   - Customer demographics and ordering patterns
   
2. **order_items_detail.csv** (Item-level data)
   - 109,819 individual item orders
   - Detailed pricing and discount information
   - Item combinations analysis
   
3. **menu_catalog.csv** (Menu information)
   - 99 menu items
   - 9 food categories
   - Pricing, dietary info, popularity scores
   
4. **customer_profiles.csv** (Customer data)
   - 5,000 customer profiles
   - Demographics and preferences
   - Spending patterns
   
5. **RESTAURANT_DATA_DICTIONARY.md**
   - Complete feature documentation
   - Analysis guidelines
   
6. **restaurant_analysis.py**
   - Comprehensive analysis script
   - Menu engineering tools
   - Customer segmentation
   - Revenue analytics

---

## 🎯 Dataset Highlights

### Orders (50,000 transactions)
- **Time Period**: Last 6 months
- **Average Order Value**: NPR 1,000.70
- **Revenue Generated**: NPR 50 million+
- **Peak Hours**: 9 AM, 1 PM, 8 PM
- **Customer Satisfaction**: 8.04/10 average

### Customers (5,000 unique)
- **Locals**: 50.1% - Regular customers, traditional preferences
- **Students**: 15.0% - Budget-conscious, fast food preference
- **Tourists**: 14.9% - High spenders, variety seekers
- **Expats**: 10.5% - Regular customers, mixed preferences
- **Corporate**: 9.5% - Time-conscious, moderate spenders

### Menu (99 items)
- **Categories**: Nepali, Indian, Chinese, Continental, Beverages, etc.
- **Price Range**: NPR 30 - NPR 1,200
- **Top Items**: Chiya, Momo, Dal Bhat, Biryani, Chowmein
- **Vegetarian Options**: ~40% of menu

### Restaurant Locations
- Thamel Branch (Tourist hub)
- Durbar Marg Branch (Premium area)
- Lazimpat Branch (Expat neighborhood)
- Jhamsikhel Branch (Café culture)
- Bouddha Branch (Local community)

---

## 🚀 Quick Start

### 1. Load the Dataset

```python
import pandas as pd

# Load main order data
orders = pd.read_csv('kathmandu_restaurant_orders.csv')
print(f"Total orders: {len(orders):,}")

# Load menu catalog
menu = pd.read_csv('menu_catalog.csv')
print(f"Menu items: {len(menu)}")

# Load order items detail
order_items = pd.read_csv('order_items_detail.csv')
print(f"Total order items: {len(order_items):,}")

# Load customer profiles
customers = pd.read_csv('customer_profiles.csv')
print(f"Customers: {len(customers):,}")
```

### 2. Run Comprehensive Analysis

```bash
# Install required libraries
pip install pandas numpy matplotlib seaborn scikit-learn

# Run analysis
python restaurant_analysis.py
```

This generates:
- Menu performance analysis
- Customer segmentation
- Revenue insights
- Peak hour analysis
- Satisfaction metrics
- Recommendations

### 3. Basic Exploration

```python
# Order patterns by meal period
print(orders.groupby('meal_period')['total_amount_npr'].agg(['count', 'mean']))

# Top selling items
top_items = order_items['item_name'].value_counts().head(10)
print(top_items)

# Customer satisfaction by order type
print(orders.groupby('order_type')['customer_satisfaction'].mean())

# Revenue by day of week
daily_revenue = orders.groupby('day_of_week')['total_amount_npr'].sum()
```

---

## 📊 Key Features Summary

### Order Information
- Date/time, meal period, location
- Order type (Dine-in, Takeaway, Delivery)
- Party size, number of items
- Pricing breakdown (subtotal, charges, total)

### Customer Demographics
- Type (Local, Tourist, Student, Expat, Corporate)
- Age, gender, area
- Dietary and spice preferences
- Spending patterns, loyalty status

### Operational Metrics
- Expected vs actual wait times
- Special requests
- Payment methods
- Tips

### Menu Details
- Item categories and names
- Pricing and dietary information
- Preparation time
- Popularity scores

---

## 💡 Use Cases & Applications

### 1. **Menu Engineering**
Optimize menu based on profitability and popularity

```python
# Menu engineering analysis
menu_performance = order_items.merge(menu, on='item_id')
item_sales = menu_performance.groupby('item_name').agg({
    'quantity': 'sum',
    'item_total': 'sum',
    'unit_price': 'mean'
})

# Calculate profit margin (assuming 60% food cost)
item_sales['profit'] = item_sales['item_total'] * 0.40
item_sales['popularity'] = item_sales['quantity'] / item_sales['quantity'].max()
```

**Actions**:
- **Stars** (High profit, High popularity): Feature prominently
- **Plow Horses** (Low profit, High popularity): Increase prices slightly
- **Puzzles** (High profit, Low popularity): Better marketing
- **Dogs** (Low profit, Low popularity): Remove or reformulate

### 2. **Customer Segmentation**
Target different customer groups effectively

```python
# Segment analysis
segment_stats = orders.groupby('customer_type').agg({
    'total_amount_npr': ['mean', 'sum'],
    'customer_satisfaction': 'mean',
    'party_size': 'mean'
})
```

**Marketing Strategies**:
- **Students**: Budget combos, student discounts, delivery deals
- **Tourists**: Authentic Nepali sets, photo-worthy presentations
- **Corporate**: Lunch specials, fast service, group packages
- **Locals**: Loyalty rewards, family meals, seasonal specials
- **Expats**: International cuisines, consistent quality

### 3. **Peak Hour Management**
Optimize staffing and kitchen capacity

```python
# Hour-by-hour analysis
hourly_orders = orders.groupby('hour_of_day').agg({
    'order_id': 'count',
    'total_amount_npr': 'sum',
    'actual_wait_minutes': 'mean'
})
```

**Optimizations**:
- Staff scheduling aligned with peaks
- Pre-prep during slow hours
- Special offers during slow periods
- Delivery zone management

### 4. **Revenue Optimization**
Maximize profitability

```python
# Revenue analysis
revenue_by_type = orders.groupby('order_type').agg({
    'total_amount_npr': ['sum', 'mean', 'count']
})

# Payment method preferences
payment_analysis = orders.groupby('payment_method')['total_amount_npr'].agg(['count', 'sum'])
```

**Strategies**:
- Dynamic pricing by time/demand
- Combo meal optimization
- Upselling high-margin items
- Delivery fee optimization

### 5. **Customer Experience Enhancement**
Improve satisfaction and loyalty

```python
# Satisfaction drivers
import statsmodels.formula.api as smf

model = smf.ols('customer_satisfaction ~ actual_wait_minutes + total_amount_npr + party_size', 
                data=orders).fit()
print(model.summary())
```

**Improvements**:
- Reduce wait times
- Accurate time estimates
- Better special request handling
- Personalized recommendations
- Loyalty program enhancements

### 6. **Inventory & Supply Chain**
Optimize ingredient purchasing

```python
# Popular items requiring same ingredients
nepali_items = order_items[order_items['category'] == 'Nepali Main Course']
ingredient_forecast = nepali_items.groupby('item_name')['quantity'].sum()
```

**Benefits**:
- Reduce waste
- Ensure availability
- Seasonal planning
- Supplier negotiation

---

## 📈 Analysis Examples

### Example 1: Menu Profitability Analysis

```python
import pandas as pd
import matplotlib.pyplot as plt

# Load data
orders = pd.read_csv('kathmandu_restaurant_orders.csv')
order_items = pd.read_csv('order_items_detail.csv')
menu = pd.read_csv('menu_catalog.csv')

# Calculate item performance
item_performance = order_items.groupby('item_name').agg({
    'quantity': 'sum',
    'item_total': 'sum'
}).reset_index()

# Merge with menu for categorization
item_performance = item_performance.merge(
    menu[['item_name', 'category', 'price_npr']], 
    on='item_name'
)

# Calculate metrics
item_performance['avg_quantity'] = item_performance['quantity'] / len(orders)
item_performance['revenue_per_order'] = item_performance['item_total'] / len(orders)

# Sort by revenue
top_revenue_items = item_performance.nlargest(15, 'item_total')

# Visualize
plt.figure(figsize=(12, 6))
plt.barh(range(len(top_revenue_items)), top_revenue_items['item_total'])
plt.yticks(range(len(top_revenue_items)), top_revenue_items['item_name'])
plt.xlabel('Total Revenue (NPR)')
plt.title('Top 15 Revenue-Generating Items')
plt.tight_layout()
plt.show()
```

### Example 2: Customer Journey Analysis

```python
# Track customer ordering frequency
customer_orders = orders.groupby('customer_id').agg({
    'order_id': 'count',
    'total_amount_npr': ['sum', 'mean'],
    'customer_satisfaction': 'mean'
}).reset_index()

customer_orders.columns = ['customer_id', 'order_count', 'total_spent', 
                           'avg_order_value', 'avg_satisfaction']

# Segment customers
customer_orders['segment'] = pd.cut(
    customer_orders['order_count'], 
    bins=[0, 5, 15, 50],
    labels=['Occasional', 'Regular', 'Loyal']
)

# Compare segments
segment_comparison = customer_orders.groupby('segment').agg({
    'customer_id': 'count',
    'total_spent': 'sum',
    'avg_order_value': 'mean',
    'avg_satisfaction': 'mean'
})

print(segment_comparison)
```

### Example 3: Combo Meal Opportunities

```python
from mlxtend.frequent_patterns import apriori, association_rules

# Create transaction matrix
basket = order_items.groupby(['order_id', 'item_name'])['quantity'].sum().unstack().fillna(0)
basket_sets = basket.applymap(lambda x: 1 if x > 0 else 0)

# Find frequent itemsets
frequent_itemsets = apriori(basket_sets, min_support=0.01, use_colnames=True)

# Generate association rules
rules = association_rules(frequent_itemsets, metric="lift", min_threshold=1.5)
rules = rules.sort_values('lift', ascending=False)

print("Top Combo Opportunities:")
print(rules[['antecedents', 'consequents', 'support', 'confidence', 'lift']].head(10))
```

### Example 4: Predictive Wait Time Model

```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# Prepare features
features = ['hour_of_day', 'day_of_week', 'party_size', 'num_items', 
            'order_type_Dine-in', 'order_type_Takeaway', 'order_type_Delivery']

# Create dummy variables
orders_encoded = pd.get_dummies(orders, columns=['order_type'])

X = orders_encoded[features]
y = orders_encoded['actual_wait_minutes']

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = RandomForestRegressor(n_estimators=100)
model.fit(X_train, y_train)

# Evaluate
from sklearn.metrics import mean_absolute_error
predictions = model.predict(X_test)
mae = mean_absolute_error(y_test, predictions)
print(f"Wait Time Prediction MAE: {mae:.2f} minutes")
```

---

## 🔍 Menu Engineering Framework

### Step 1: Calculate Menu Metrics

```python
# For each menu item, calculate:
# 1. Popularity (quantity sold)
# 2. Profitability (contribution margin)
# 3. Category average

menu_analysis = order_items.merge(menu, on='item_id')

item_metrics = menu_analysis.groupby(['item_name', 'category']).agg({
    'quantity': 'sum',
    'item_total': 'sum'
}).reset_index()

# Calculate profit (assuming 40% margin)
item_metrics['profit'] = item_metrics['item_total'] * 0.40

# Calculate popularity score
item_metrics['popularity'] = (item_metrics['quantity'] / 
                               item_metrics.groupby('category')['quantity'].transform('mean'))

# Calculate profitability score
item_metrics['profitability'] = (item_metrics['profit'] / 
                                  item_metrics.groupby('category')['profit'].transform('mean'))
```

### Step 2: Classify Items

```python
def classify_menu_item(row):
    if row['popularity'] >= 1.0 and row['profitability'] >= 1.0:
        return 'Star'
    elif row['popularity'] >= 1.0 and row['profitability'] < 1.0:
        return 'Plow Horse'
    elif row['popularity'] < 1.0 and row['profitability'] >= 1.0:
        return 'Puzzle'
    else:
        return 'Dog'

item_metrics['classification'] = item_metrics.apply(classify_menu_item, axis=1)
```

### Step 3: Action Plan

```python
recommendations = {
    'Star': 'Maintain quality, feature prominently, don't change price',
    'Plow Horse': 'Reduce portion size or increase price slightly',
    'Puzzle': 'Improve placement, train staff to upsell, bundle with stars',
    'Dog': 'Remove or redesign, replace with better items'
}

for classification, items in item_metrics.groupby('classification'):
    print(f"\n{classification} Items:")
    print(items[['item_name', 'quantity', 'profit']].head())
    print(f"Recommendation: {recommendations[classification]}")
```

---

## 💻 Technical Recommendations

### Data Processing
- Use pandas for data manipulation
- Handle datetime properly for time-series analysis
- Merge datasets carefully on keys

### Visualization Tools
- matplotlib/seaborn for static plots
- plotly for interactive dashboards
- tableau/power BI for business reporting

### Machine Learning
- Customer segmentation: K-means, hierarchical clustering
- Recommendation systems: Collaborative filtering
- Demand forecasting: Time series (ARIMA, Prophet)
- Churn prediction: Classification models

### Database Integration
- Store in PostgreSQL/MySQL for production
- Use appropriate indexes
- Regular backup schedules

---

## 📊 Key Performance Indicators

### Revenue KPIs
- **Total Revenue**: NPR 50M (6 months)
- **Average Order Value**: NPR 1,000
- **Revenue Per Customer**: NPR 10,000
- **Daily Average**: NPR 277,000

### Operational KPIs
- **Table Turnover**: ~2.77 customers/table
- **On-time Delivery**: 58%
- **Average Wait Time**: 25.7 minutes
- **Order Accuracy**: 75.2% (no special requests)

### Customer KPIs
- **Customer Satisfaction**: 8.04/10
- **Repeat Rate**: 35% loyalty members
- **Average Orders/Customer**: 10 orders
- **Tip Rate**: Variable (satisfaction-based)

### Menu KPIs
- **Menu Variety**: 99 items
- **Popular Items**: Top 10 = 25% of orders
- **Vegetarian Options**: 40%
- **Average Item Price**: NPR 350

---

## 🎓 Learning Opportunities

This dataset is perfect for:
- **Restaurant Management Courses**: Real-world data analysis
- **Data Science Projects**: End-to-end analysis pipeline
- **Business Analytics**: Decision-making frameworks
- **Marketing Analytics**: Customer segmentation
- **Operations Research**: Optimization problems
- **Machine Learning**: Predictive modeling

---

## 🌟 Best Practices

1. **Start with Exploration**: Understand patterns before modeling
2. **Consider Context**: Kathmandu-specific cultural factors
3. **Validate Findings**: Cross-check insights across datasets
4. **Think Business Impact**: Translate analysis to actionable insights
5. **Iterate**: Continuous improvement based on results

---

## 📧 Dataset Applications

✅ Menu optimization and engineering  
✅ Customer experience enhancement  
✅ Revenue management  
✅ Operational efficiency  
✅ Marketing strategy  
✅ Inventory planning  
✅ Staff scheduling  
✅ Pricing strategy  
✅ Customer loyalty programs  
✅ Predictive analytics  

---

**Happy Analyzing! 🍽️📊**

*Dataset created for educational and business intelligence purposes with authentic Kathmandu restaurant patterns*
