# Restaurant Customer Ordering Pattern Dashboard - Documentation

## Overview

This is a comprehensive React-based analytics dashboard designed to analyze restaurant customer ordering patterns in Kathmandu. The dashboard provides insights across five analytical dimensions using data-driven visualizations and statistical models.

---

## Dashboard Structure

### Pages & Analytics Modules

#### 1. **Overview Page**
Real-time KPI cards and summary metrics providing a quick snapshot of business health.

**Visualizations:**
- **KPI Donuts & Cards** (4 metrics)
  - Total Revenue: Sum of all `total_amount_npr` across all orders
  - Average Order Value (AOV): `Total Revenue / Total Orders`
  - Loyalty Rate: `(Loyal Members Count / Total Orders) × 100`
  - Customer Satisfaction: `Sum of customer_satisfaction / Total Orders`

- **Orders by Hour** (Bar Chart)
  - Data: Count of orders grouped by `hour_of_day`
  - Purpose: Identify peak ordering hours for staffing optimization
  - Calculation: `COUNT(orders) GROUP BY hour_of_day`

- **Revenue by Category** (Horizontal Bar Chart)
  - Data: Sum of `item_total` grouped by `category`
  - Top 8 categories displayed
  - Calculation: `SUM(item_total) GROUP BY category ORDER BY DESC`

- **Orders by Meal Period** (Pie Chart)
  - Data: Percentage distribution across `meal_period` (Breakfast, Lunch, Dinner, Evening Snacks)
  - Calculation: `COUNT(orders) / TOTAL × 100 GROUP BY meal_period`

---

#### 2. **Descriptive Analytics Page**
Focuses on "What is happening?" - Current state analysis and distributions.

**Visualizations & Calculations:**

##### **Market Basket Analysis**
- **Definition**: Identifies the most frequently purchased items
- **Calculation**: 
  ```
  Item Frequency = COUNT(item_id) for each item_name
  Top 10 items = ORDER BY frequency DESC LIMIT 10
  ```
- **Purpose**: Understand customer preferences and optimize menu placement
- **Formula Applied**:
  ```
  Popularity Score = (Item Count / Total Items) × 100
  ```

##### **KPI Donuts (3-part breakdown)**

1. **Customer Segments Donut**
   - Segments: `customer_type` (Corporate, Student, Local, Expat)
   - Calculation: `COUNT(DISTINCT customer_id) GROUP BY customer_type`
   - Purpose: Identify which customer segments drive orders

2. **Payment Methods Donut**
   - Methods: `payment_method` (Cash, Card, Digital Wallet, UPI)
   - Calculation: `COUNT(orders) GROUP BY payment_method`
   - Purpose: Understand payment preferences for payment gateway optimization

3. **Order Types Donut**
   - Types: `order_type` (Dine-in, Takeaway, Delivery)
   - Calculation: `COUNT(orders) GROUP BY order_type`
   - Purpose: Identify ordering channel preferences

##### **Average Order Value by Location** (Bar Chart)
- **Calculation**:
  ```
  Avg_Order_Value_per_Location = SUM(total_amount_npr) / COUNT(orders)
  GROUP BY restaurant_location
  ```
- **Purpose**: Compare location performance and operational efficiency

##### **Customer Spice Preference** (Pie Chart)
- Data: Distribution of `spice_preference` (Mild, Medium, Spicy, No Preference)
- **Calculation**: `COUNT(customer_id) GROUP BY spice_preference`
- **Purpose**: Menu customization for customer base

##### **Dietary Preferences** (Pie Chart)
- Data: Distribution of `dietary_preference` (Vegetarian, Non-Vegetarian, No Preference)
- **Calculation**: `COUNT(customer_id) GROUP BY dietary_preference`
- **Purpose**: Inventory planning and menu engineering

##### **Customers by Area** (Bar Chart)
- Data: Top 10 geographic areas by customer count
- **Calculation**: `COUNT(DISTINCT customer_id) GROUP BY area ORDER BY DESC LIMIT 10`
- **Purpose**: Identify primary geographic markets for targeted campaigns

---

#### 3. **Diagnostic Analytics Page**
Focuses on "Why is it happening?" - Root cause analysis and correlations.

**Visualizations & Calculations:**

##### **Correlation Analysis: Spending vs Satisfaction**
- **Calculation Method**: Pearson Correlation Coefficient
  ```
  Correlation(r) = Cov(X,Y) / (σ_X × σ_Y)
  
  Where:
  - X = Average customer spending
  - Y = Average customer satisfaction
  - Cov(X,Y) = Covariance between spending and satisfaction
  - σ = Standard deviation
  
  Formula:
  1. Calculate mean of X: μ_X = Σ(X) / n
  2. Calculate mean of Y: μ_Y = Σ(Y) / n
  3. Covariance = Σ((X_i - μ_X) × (Y_i - μ_Y)) / n
  4. Std_Dev_X = √(Σ(X_i - μ_X)² / n)
  5. Std_Dev_Y = √(Σ(Y_i - μ_Y)² / n)
  6. r = Covariance / (Std_Dev_X × Std_Dev_Y)
  ```
- **Interpretation**:
  - r > 0.3: Moderate positive relationship
  - r < 0.3: Weak relationship
- **Purpose**: Understand if higher spending correlates with satisfaction

##### **Pareto Analysis (80/20 Rule)**
- **Definition**: Identifies the vital few items generating majority revenue
- **Calculation**:
  ```
  1. Calculate revenue per category: SUM(item_total) GROUP BY category
  2. Sort by revenue DESC
  3. Calculate cumulative revenue and percentage
  4. Items contributing to 80% cumulative revenue = Critical focus areas
  
  Cumulative % = (Cumulative Revenue / Total Revenue) × 100
  ```
- **Purpose**: Focus inventory and marketing on high-impact items

##### **Day of Week Analysis**
- **Satisfaction by Day**:
  ```
  Avg_Satisfaction_per_Day = SUM(customer_satisfaction) / COUNT(orders)
  GROUP BY day_of_week
  ```
- **Revenue by Day**:
  ```
  Avg_Revenue_per_Day = SUM(total_amount_npr) / COUNT(orders)
  GROUP BY day_of_week
  ```
- **Purpose**: Identify peak performance days and staffing needs

##### **Wait Time Impact Analysis**
- **Binning Strategy**:
  ```
  Bins = [0-10min, 11-20min, 21-30min, 31-40min, 40+min]
  For each bin:
    Avg_Satisfaction = SUM(customer_satisfaction) / COUNT(orders in bin)
  ```
- **Purpose**: Quantify impact of service speed on satisfaction

##### **Loyalty Member Impact**
- **Metric Comparison**:
  ```
  Loyal_Customers:
    Avg_Satisfaction = SUM(satisfaction) / COUNT(loyal orders)
    Avg_Spending = SUM(amount) / COUNT(loyal orders)
  
  Non-Loyal_Customers:
    Avg_Satisfaction = SUM(satisfaction) / COUNT(non-loyal orders)
    Avg_Spending = SUM(amount) / COUNT(non-loyal orders)
  ```
- **Purpose**: Measure loyalty program effectiveness

##### **Party Size Impact**
- **Calculation**:
  ```
  Avg_Order_Value_per_Party_Size = SUM(total_amount_npr) / COUNT(orders)
  GROUP BY party_size
  ```
- **Purpose**: Identify high-value order segments

---

#### 4. **Predictive Analytics Page**
Focuses on "What will happen?" - Future trend forecasting and risk modeling.

**Visualizations & Calculations:**

##### **Revenue Forecast (7-Day)**
- **Method**: Moving Average with Variance
- **Calculation**:
  ```
  Moving_Average_7day = SUM(last 7 days revenue) / 7
  Forecast_Day_t = Moving_Average_7day × (1 ± Random(0, 0.15))
  
  Step-by-step:
  1. Calculate daily revenue for last 30 days
  2. Compute 7-day moving average
  3. Generate forecast with ±15% random variance
  4. Project 7 days forward
  ```
- **Interpretation**: Light blue = Historical, Dark blue = Forecast
- **Use Case**: Revenue planning and cash flow forecasting

##### **Daily Orders Forecast**
- **Method**: Moving Average Pattern
- **Calculation**:
  ```
  Daily_Orders_Avg = SUM(last 30 days orders) / 30
  Forecast = Daily_Orders_Avg × (1 ± Random(0, 0.2))
  ```
- **Purpose**: Staff scheduling and inventory planning

##### **Customer Satisfaction Forecast**
- **Method**: Historical Average with Trend
- **Calculation**:
  ```
  Satisfaction_Avg = SUM(last 30 days satisfaction) / 30
  Forecast_Day_t = Satisfaction_Avg + (Random(0, 1) - 0.5) × 0.5
  ```
- **Purpose**: Quality assurance monitoring and intervention planning

##### **Customer Churn Risk Model**
- **Methodology**: Recency-based Risk Segmentation
- **Calculation**:
  ```
  Days_Since_Last_Order = Current_Date - Last_Order_Date
  
  If Days_Since_Last_Order > 60:
    Risk_Category = "High Risk"
  Else If Days_Since_Last_Order > 30:
    Risk_Category = "Medium Risk"
  Else:
    Risk_Category = "Low Risk"
  
  Churn_Risk_Rate = (High_Risk_Count / Total_Customers) × 100
  ```
- **Purpose**: Identify customers at risk of churn for retention campaigns

##### **Monthly Growth Trend**
- **Calculation**:
  ```
  Monthly_Orders = COUNT(orders) GROUP BY MONTH
  Growth_Rate = ((Current_Month - Previous_Month) / Previous_Month) × 100
  
  If Growth_Rate > 5%: "Growing"
  If Growth_Rate < -5%: "Declining"
  Else: "Stable"
  ```
- **Purpose**: Monitor business trajectory and identify seasonal patterns

---

#### 5. **Prescriptive Analytics Page**
Focuses on "What should we do?" - Actionable recommendations and optimization strategies.

**Visualizations & Calculations:**

##### **Key Performance Indicators with Recommendations**
- **Total Revenue KPI**:
  ```
  Current = SUM(total_amount_npr)
  Target = Current × 1.15 (15% growth target)
  Gap = Target - Current
  Recommendation: Focus on premium segments
  ```

- **Customer Satisfaction KPI**:
  ```
  Current = AVG(customer_satisfaction)
  Target = 9.0
  Gap = Target - Current
  Recommendation: Reduce wait times, improve service quality
  ```

- **Average Order Value KPI**:
  ```
  Current = SUM(total_amount_npr) / COUNT(orders)
  Target = Current × 1.1 (10% increase target)
  Recommendation: Implement upselling strategies
  ```

- **Loyalty Rate KPI**:
  ```
  Current = (Loyal_Members / Total_Orders) × 100
  Target = 85%
  Recommendation: Enhance loyalty program benefits
  ```

##### **Cohort Analysis: Customer Type Performance**
- **Definition**: Groups customers by type and measures segment value
- **Calculation**:
  ```
  For each Customer_Type:
    Total_Orders = COUNT(orders) WHERE customer_type = TYPE
    Total_Revenue = SUM(total_amount_npr) WHERE customer_type = TYPE
    Avg_Order_Value = Total_Revenue / Total_Orders
    Avg_Satisfaction = SUM(satisfaction) / Total_Orders
    Loyalty_Rate = (Loyal_Members / Total_Orders) × 100
    Items_per_Order = SUM(num_items) / Total_Orders
  ```
- **Purpose**: Identify which customer segments are most profitable and satisfied

##### **Cluster Analysis: Customer Segmentation**
- **Method**: Statistical Clustering based on Spending
- **Calculation**:
  ```
  1. Calculate Average_Spending for each customer
  2. Compute Mean_Spending = AVG(average_spending across all customers)
  3. Compute Std_Dev = √(Σ((spending_i - mean)²) / n)
  
  Customer_Segment:
    If spending > (Mean + Std_Dev):
      Segment = "VIP" (High-value spenders)
    Else If spending < (Mean - Std_Dev):
      Segment = "Emerging" (Growth potential)
    Else:
      Segment = "Standard" (Regular customers)
  
  For each segment:
    Count = Number of customers in segment
    Percentage = (Count / Total_Customers) × 100
    Avg_Spending = AVG(spending) for segment
    Loyalty_Rate = (Loyal / Count) × 100
  ```
- **Purpose**: Develop targeted strategies for each customer tier

##### **Location Performance & Recommendations**
- **Metrics Calculated**:
  ```
  For each Location:
    Total_Orders = COUNT(orders) WHERE location = LOC
    Total_Revenue = SUM(total_amount_npr) WHERE location = LOC
    Avg_Satisfaction = AVG(customer_satisfaction) WHERE location = LOC
    Avg_Wait_Time = AVG(actual_wait_minutes) WHERE location = LOC
  
  Performance_Flag:
    If Avg_Satisfaction >= 8.0:
      Action = "Maintain current standards"
    Else:
      Action = "Improve operations"
  ```
- **Purpose**: Location-specific operational improvements

##### **Menu Optimization: Item Performance**
- **Metrics Calculated**:
  ```
  For each Menu_Item:
    Total_Quantity = SUM(quantity) WHERE item_name = ITEM
    Total_Revenue = SUM(item_total) WHERE item_name = ITEM
    Avg_Price = Total_Revenue / Total_Quantity
  
  Performance_Category:
    If Total_Revenue > 10,000:
      Action = "Keep - High revenue generator"
    Else If Total_Quantity > 50:
      Action = "Promote - Popular but low revenue"
    Else:
      Action = "Review - Consider removing or repricing"
  ```
- **Purpose**: Data-driven menu engineering and pricing optimization

---

## Data Sources

### CSV Files Used

1. **Kathmandu Restaurant Orders.csv** (50,000 records)
   - Main transaction table
   - Contains order details, timestamps, satisfaction scores
   - Key fields: order_id, customer_id, total_amount_npr, customer_satisfaction

2. **Order Items Detail.csv** (109,821 records)
   - Item-level transaction data
   - Contains individual items in each order
   - Key fields: order_id, item_id, item_name, category, item_total

3. **Customer Profiles.csv** (5,000 records)
   - Customer demographics and preferences
   - Key fields: customer_id, customer_type, dietary_preference, avg_spending_npr

4. **Menu Catalog.csv** (99 items)
   - Menu items reference data
   - Key fields: item_id, item_name, category, price_npr, popularity_score

---

## Color Scheme

Consistent color theme matching the sample dashboard:

- **Primary Colors**: 
  - Sky Blue: #0ea5e9 (Main charts)
  - Ocean Blue: #0284c7 (Secondary)
  - Dark Blue: #0369a1 (Accents)

- **Secondary Colors**:
  - Orange: #f59e0b (Trends, warnings)
  - Red: #ef4444 (Critical metrics)
  - Purple: #8b5cf6 (Categorical data)

- **Background**:
  - Dark Slate: #1f2937 (Sidebar)
  - Light Gray: #f3f4f6 (Main background)
  - White: #ffffff (Cards)

---

## Key Insights & Formulas Reference

### ROI Calculations
```
Revenue_per_Customer = Total_Revenue / Unique_Customers
Cost_per_Acquisition ≈ (Marketing_Budget / New_Customers) [Not computed in data]
Customer_Lifetime_Value ≈ Avg_Order_Value × Purchase_Frequency × Retention_Period
```

### Efficiency Metrics
```
Order_Fulfillment_Rate = (Orders_Completed / Total_Orders) × 100
Loyalty_Conversion = (New_Loyalty_Members / Total_Orders) × 100
Cross_Sell_Success = (Orders_with_Multiple_Items / Total_Orders) × 100
```

### Satisfaction Impact
```
Satisfaction_vs_Revenue Correlation determines if quality drives spending
Satisfaction_vs_Wait_Time Correlation measures service speed importance
Loyalty_Member_Premium = (Loyal_Spending - Non_Loyal_Spending) / Non_Loyal_Spending × 100
```

---

## Technical Stack

- **Frontend Framework**: React 18.2
- **Visualization Library**: Recharts 2.10
- **Styling**: Tailwind CSS 3.3
- **Icons**: Lucide React 0.294
- **Data Format**: CSV (parsed in browser)

---

## Tooltip Interactions

Hover over any visualization to see:
- Exact values for bars/lines/slices
- Customer counts for segments
- Percentages for distributions
- Trend indicators for forecasts

---

## Recommendations for Implementation

1. **Data Integration**: Connect to backend API for real-time data
2. **Filtering**: Add date range and location filters
3. **Export**: Implement PDF/Excel export functionality
4. **Alerts**: Set up notifications for KPI threshold breaches
5. **Drill-down**: Add capability to click through visualizations for details

---

## Version

Dashboard Version: 1.0.0
Last Updated: January 2026
Data Period: Last 6 months of transactions
