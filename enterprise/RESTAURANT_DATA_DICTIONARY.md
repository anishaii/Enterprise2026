# Kathmandu Restaurant Customer Ordering Pattern Dataset - Data Dictionary

## Dataset Overview
- **Total Orders**: 50,000
- **Total Customers**: 5,000
- **Total Menu Items**: 99
- **Time Period**: Last 6 months
- **Location**: Kathmandu, Nepal
- **Purpose**: Menu engineering and customer experience optimization

---

## Files in Dataset

1. **kathmandu_restaurant_orders.csv** (Main order dataset)
   - 50,000 order transactions
   - Customer demographics and order details
   - Payment and satisfaction metrics

2. **order_items_detail.csv** (Detailed order items)
   - 109,819 individual item orders
   - Item-level pricing and discounts
   - Order composition analysis

3. **menu_catalog.csv** (Menu information)
   - 99 menu items across 9 categories
   - Pricing, dietary info, preparation time
   - Popularity scores

4. **customer_profiles.csv** (Customer information)
   - 5,000 unique customer profiles
   - Demographics and preferences
   - Spending patterns

---

## Feature Documentation

### A. ORDER IDENTIFICATION (5 features)

1. **order_id** (int): Unique identifier for each order (1-50,000)

2. **customer_id** (int): Unique customer identifier (1-5,000)

3. **order_datetime** (datetime): Exact date and time of order placement

4. **day_of_week** (int): Day of week (0=Monday, 6=Sunday)

5. **hour_of_day** (int): Hour when order was placed (0-23)
   - Peak hours: 9 AM, 1 PM, 8 PM

---

### B. ORDER CONTEXT (4 features)

6. **meal_period** (categorical): Meal classification
   - Breakfast (6-11 AM): 27.3%
   - Lunch (11 AM-4 PM): 32.1%
   - Evening Snacks (4-7 PM): 11.2%
   - Dinner (7 PM-12 AM): 29.4%

7. **order_type** (categorical): How order was fulfilled
   - Dine-in: 48.7%
   - Takeaway: 26.5%
   - Delivery: 24.8%

8. **restaurant_location** (categorical): Branch location
   - Thamel Branch
   - Durbar Marg Branch
   - Lazimpat Branch
   - Jhamsikhel Branch
   - Bouddha Branch

9. **party_size** (int): Number of people in the party (1-8)
   - Average: 2.77 people
   - Most common: 2 people

---

### C. ORDER DETAILS (8 features)

10. **num_items** (int): Number of different menu items in order (1-5)

11. **subtotal_npr** (float): Order subtotal before charges (NPR)

12. **service_charge_npr** (float): 10% service charge

13. **vat_npr** (float): 13% VAT

14. **delivery_charge_npr** (float): NPR 50 for delivery, 0 otherwise

15. **total_amount_npr** (float): Final bill amount
   - Average: NPR 1,000.70
   - Median: NPR 728.16
   - Range: NPR 45 - NPR 8,500+

16. **payment_method** (categorical): Payment type
   - Card: 41.7%
   - Cash: 34.3%
   - Digital Wallet: 24.0%

17. **tip_amount_npr** (int): Tip given (0-15% of total)
   - Only given when satisfaction > 7

---

### D. OPERATIONAL METRICS (3 features)

18. **expected_wait_minutes** (int): Expected food preparation time

19. **actual_wait_minutes** (int): Actual time taken
   - Average: 25.7 minutes
   - On-time rate: 58.0%

20. **special_request** (string/null): Customer special requests
   - Present in 24.8% of orders
   - Types: Less spicy, Extra spicy, No onion/garlic, Extra sauce, etc.

---

### E. CUSTOMER SATISFACTION (1 feature)

21. **customer_satisfaction** (float): Rating from 1-10
   - Average: 8.04/10
   - Influenced by wait time, price, food quality

---

### F. CUSTOMER DEMOGRAPHICS (8 features)

22. **customer_type** (categorical): Customer segment
   - Local: 50.1%
   - Student: 15.0%
   - Tourist: 14.9%
   - Expat: 10.5%
   - Corporate: 9.5%

23. **age** (int): Customer age
   - Student: 18-28 years
   - Corporate: 25-50 years
   - Tourist: 22-65 years
   - Others: 20-60 years

24. **gender** (categorical): Customer gender
   - Male: 52%
   - Female: 48%

25. **area** (categorical): Customer's area in Kathmandu
   - 15 different areas including Thamel, Lazimpat, Durbarmarg, etc.

26. **dietary_preference** (categorical): Dietary restriction
   - Non-Vegetarian: 54.1%
   - No Preference: 25.8%
   - Vegetarian: 20.2%

27. **spice_preference** (categorical): Spice level preference
   - Mild, Medium, Hot
   - Tourists prefer Mild (60%)
   - Locals prefer Medium/Hot (75%)

28. **avg_spending_npr** (int): Average spending capacity
   - Tourist: NPR 800-2,500
   - Expat: NPR 700-2,000
   - Corporate: NPR 500-1,500
   - Student: NPR 200-700
   - Local: NPR 300-1,000

29. **loyalty_member** (boolean): Enrolled in loyalty program
   - Yes: 35%
   - No: 65%
   - Members get occasional 10% discount

---

## Menu Catalog Features

### Menu Item Attributes (9 features)

1. **item_id** (int): Unique menu item identifier

2. **item_name** (string): Name of the dish

3. **category** (categorical): Menu category
   - Nepali Main Course (14 items)
   - Indian Main Course (11 items)
   - Chinese (12 items)
   - Continental (12 items)
   - Snacks & Fast Food (10 items)
   - Beverages (14 items)
   - Desserts (9 items)
   - Breakfast (9 items)
   - Nepali Appetizers (8 items)

4. **price_npr** (int): Item price in Nepali Rupees
   - Range: NPR 30 - NPR 1,200
   - Varies by category

5. **is_vegetarian** (boolean): Whether item is vegetarian

6. **spice_level** (categorical): Spiciness
   - None (beverages, desserts)
   - Mild
   - Medium
   - Hot

7. **prep_time_minutes** (int): Preparation time (5-45 minutes)

8. **popularity_score** (float): Item popularity metric (0-1)
   - High popularity: Dal Bhat, Momo, Chowmein, Biryani

9. **calories** (int): Estimated calorie content
   - Food: 150-800 calories
   - Beverages: 50-250 calories

---

## Order Items Detail Features

1. **order_id** (int): Links to main order

2. **item_id** (int): Menu item ordered

3. **item_name** (string): Name of item

4. **category** (string): Item category

5. **quantity** (int): Number of servings (1-3)

6. **unit_price** (int): Price per unit

7. **discount_percent** (float): Discount applied (0% or 10%)

8. **item_total** (float): Total for this item after discount

---

## Key Patterns & Insights

### Ordering Behavior by Customer Type

**Local Customers:**
- Prefer traditional Nepali dishes (Dal Bhat, Momo)
- Order during all meal periods
- Mix of Dine-in and Takeaway
- Moderate spending (NPR 300-1,000)

**Tourists:**
- Try variety of local cuisines
- Prefer mild spice levels
- Higher spending (NPR 800-2,500)
- Mostly Dine-in
- Peak during lunch/dinner

**Students:**
- Budget-conscious (NPR 200-700)
- Prefer fast food and Chinese
- High takeaway percentage
- Popular items: Chowmein, Momo, Fried Rice

**Corporate:**
- Regular customers
- Balanced meal choices
- Moderate to high spending
- Mix of order types
- Time-conscious (lunch rush)

**Expats:**
- Mixed cuisine preferences
- Regular customers
- Higher card payment usage
- Moderate to high spending

### Temporal Patterns

**Peak Hours:**
- 9-10 AM: Breakfast rush
- 1-2 PM: Lunch peak
- 7-9 PM: Dinner rush

**Day of Week:**
- Friday-Saturday: Slightly higher orders
- Sunday: Family dining increase

**Seasonal:**
- Festival seasons: Higher traditional food orders
- Tourist season: More Continental/varied orders

### Popular Menu Combinations

Common pairings:
- Dal Bhat + Chiya (Tea)
- Momo + Chilli Chicken
- Biryani + Lassi
- Chowmein + Coke
- Breakfast items + Coffee

### Price Sensitivity

**Budget-Conscious Items (NPR 50-200):**
- Chiya, Samosa, Chatpate
- Popular with students

**Mid-Range (NPR 200-500):**
- Most main courses
- Highest volume sales

**Premium (NPR 500+):**
- Continental dishes, Special sets
- Tourist and Expat preference

---

## Menu Engineering Matrix

### Star Items (High Profit, High Popularity)
- Dal Bhat Set
- Chicken Momo
- Chicken Biryani
- Butter Chicken

### Plow Horses (Low Profit, High Popularity)
- Chiya (Tea)
- Coffee
- Samosa
- Basic beverages

### Puzzles (High Profit, Low Popularity)
- Specialty Continental items
- Premium desserts
- Imported beverages

### Dogs (Low Profit, Low Popularity)
- Consider removal or repositioning
- Low-performing specialty items

---

## Customer Experience Metrics

### Satisfaction Drivers (Positive Impact)
- Short wait times (≤ expected time)
- Order within budget
- Accurate special requests
- Quality food
- Good service

### Satisfaction Detractors (Negative Impact)
- Long wait times (>30% over expected)
- Order exceeding typical budget
- Ignored special requests
- Order errors

### Repeat Customer Indicators
- Satisfaction score > 8.0
- Loyalty membership
- Regular ordering patterns
- Positive tip behavior

---

## Use Cases

### 1. Menu Optimization
- Identify underperforming items
- Optimize pricing strategies
- Create combo meals
- Seasonal menu adjustments

### 2. Customer Segmentation
- Target marketing by customer type
- Personalized recommendations
- Loyalty program design
- Promotional strategies

### 3. Operational Efficiency
- Staff scheduling by peak hours
- Kitchen capacity planning
- Delivery zone optimization
- Wait time reduction

### 4. Revenue Management
- Dynamic pricing opportunities
- Upselling strategies
- High-margin item promotion
- Discount optimization

### 5. Customer Experience
- Predict satisfaction
- Personalize ordering experience
- Reduce wait times
- Handle special requests better

---

## Data Quality Notes

- **Synthetic Data**: Realistic patterns based on Kathmandu restaurant industry
- **No Missing Values**: Complete dataset
- **Realistic Distributions**: Based on actual restaurant patterns
- **Cultural Relevance**: Authentic Nepali/Kathmandu food preferences
- **Seasonal Patterns**: Includes typical ordering behaviors

---

## File Information
- **Format**: CSV (Comma-separated values)
- **Encoding**: UTF-8
- **Total Size**: ~15 MB (all files combined)
- **Date Format**: YYYY-MM-DD HH:MM:SS
