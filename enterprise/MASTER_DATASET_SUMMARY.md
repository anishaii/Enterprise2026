# Data Science Datasets Collection - Master Summary

## 📊 Complete Dataset Package

This collection contains **three comprehensive synthetic datasets** designed for data science, analytics, and machine learning applications, all with a focus on Kathmandu, Nepal context.

---

## 🎵 Dataset 1: Music Recommendation System

**File:** `kathmandu_music_recommendation_dataset.csv`

### Overview
- **Purpose**: Train music recommendation algorithms
- **Target**: Young adults (18-24) in Kathmandu Valley
- **Size**: 1,000,000 listening sessions
- **Users**: 50,000 unique users
- **Songs**: 20,000 unique songs

### Key Features
- User demographics (age, gender, location, premium status)
- Song characteristics (genre, language, mood, tempo)
- Listening behavior (skip, like, playlist add, completion rate)
- Context (time, device, listening context)
- Engagement metrics (composite performance score)

### Top Genres
1. Bollywood (16.3%)
2. Nepali Pop (11.1%)
3. Nepali Hip-Hop (9.3%)
4. English Pop (8.8%)
5. Hindi Pop (7.1%)

### Use Cases
- Collaborative filtering
- Content-based recommendations
- Hybrid recommendation systems
- Context-aware recommendations
- User engagement prediction

### Documentation
- `README.md` - Complete usage guide
- `DATA_DICTIONARY.md` - Feature documentation
- `starter_analysis.py` - Analysis script
- `quick_start_notebook.ipynb` - Jupyter template

---

## 🏓 Dataset 2: Table Tennis Player Performance

**File:** `table_tennis_performance_dataset.csv`

### Overview
- **Purpose**: Player performance evaluation and talent identification
- **Target**: Male players aged 12-22
- **Size**: 100,000 match records
- **Players**: 500 unique players
- **Tournaments**: 200 competitions

### Key Features
- Player demographics (age, height, playing style, experience)
- Match statistics (games won, duration, tournament info)
- Technical metrics (service, forehand/backhand, advanced shots)
- Physical performance (distance covered, reaction time, stamina)
- Mental strength (deuce performance, break points)
- Performance ratings (composite 0-100 score)

### Performance Metrics
- Service win rate: 50% avg
- Smash success: 73.4% avg
- Loop success: 78.0% avg
- Avg performance: 57.2/100
- Avg match: 51.5 minutes

### Use Cases
- Player performance tracking
- Talent identification
- Coaching and training optimization
- Match outcome prediction
- Playing style analysis

### Documentation
- `TABLE_TENNIS_README.md` - Complete guide
- `TABLE_TENNIS_DATA_DICTIONARY.md` - Feature details
- `TABLE_TENNIS_QUICK_REFERENCE.md` - Quick start
- `table_tennis_starter_analysis.py` - Analysis script
- `player_profiles.csv` - Player information

---

## 🍽️ Dataset 3: Restaurant Customer Ordering

**File:** `kathmandu_restaurant_orders.csv`

### Overview
- **Purpose**: Menu engineering and customer experience optimization
- **Location**: Restaurants in Kathmandu
- **Size**: 50,000 orders
- **Customers**: 5,000 unique customers
- **Menu Items**: 99 items across 9 categories
- **Revenue**: NPR 50 million+

### Key Features
- Order details (date/time, meal period, order type, party size)
- Customer demographics (type, age, dietary preferences)
- Financial metrics (pricing, charges, payment methods)
- Operational data (wait times, special requests)
- Satisfaction scores (1-10 rating)
- Menu information (categories, pricing, popularity)

### Menu Categories
- Nepali Main Course (14 items)
- Indian Main Course (11 items)
- Chinese (12 items)
- Continental (12 items)
- Beverages (14 items)
- Snacks & Fast Food (10 items)
- Desserts (9 items)
- Breakfast (9 items)
- Nepali Appetizers (8 items)

### Customer Segments
- Local: 50.1% - Traditional food preferences
- Student: 15.0% - Budget-conscious
- Tourist: 14.9% - High spenders
- Expat: 10.5% - Regular customers
- Corporate: 9.5% - Time-conscious

### Use Cases
- Menu optimization and engineering
- Customer segmentation
- Revenue management
- Operational efficiency
- Satisfaction prediction
- Inventory planning

### Documentation
- `RESTAURANT_README.md` - Complete guide
- `RESTAURANT_DATA_DICTIONARY.md` - Feature details
- `RESTAURANT_QUICK_REFERENCE.md` - Quick start
- `menu_catalog.csv` - Menu items
- `order_items_detail.csv` - Order line items
- `customer_profiles.csv` - Customer data

---

## 📈 Dataset Comparison

| Aspect | Music Rec | Table Tennis | Restaurant |
|--------|-----------|--------------|------------|
| **Rows** | 1,000,000 | 100,000 | 50,000 |
| **Entities** | 50K users, 20K songs | 500 players | 5K customers, 99 items |
| **Features** | 28 | 103 | 29 |
| **File Size** | 183 MB | 100 MB | 9.5 MB |
| **Time Period** | 6 months | 2 years | 6 months |
| **Domain** | Entertainment | Sports | Food Service |
| **Location** | Kathmandu Valley | Nepal | Kathmandu |
| **Target Age** | 18-24 | 12-22 | All ages |

---

## 🎯 Common Use Cases Across Datasets

### Data Science & ML
- **Classification**: Predict outcomes, user segments
- **Regression**: Performance scores, revenue prediction
- **Clustering**: User/customer segmentation
- **Recommendation**: Songs, menu items, training programs
- **Time Series**: Trends, seasonality, forecasting
- **Association Rules**: Item combinations, patterns

### Business Analytics
- **Performance Analysis**: Track KPIs, identify trends
- **Customer Insights**: Behavior, preferences, satisfaction
- **Optimization**: Menu, pricing, scheduling, training
- **Segmentation**: Target marketing, personalization
- **Forecasting**: Demand, revenue, performance

### Academic Research
- **Behavioral Analysis**: User patterns, decision-making
- **Cultural Studies**: Kathmandu-specific preferences
- **Performance Metrics**: Sports analytics, evaluation
- **Consumer Research**: Dining behaviors, choices

---

## 🛠️ Technical Stack Recommendations

### Data Analysis
```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
```

### Machine Learning
```python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingRegressor
from sklearn.cluster import KMeans
from sklearn.metrics import accuracy_score, mean_squared_error
```

### Visualization
```python
import plotly.express as px
import plotly.graph_objects as go
# Or use Tableau, Power BI for business dashboards
```

### Recommendation Systems
```python
from surprise import SVD, KNNBasic
from lightfm import LightFM
```

### Time Series
```python
from statsmodels.tsa.seasonal import seasonal_decompose
from prophet import Prophet
```

---

## 📚 Documentation Structure

Each dataset includes:

1. **README.md** - Comprehensive usage guide
   - Quick start instructions
   - Feature descriptions
   - Use case examples
   - Code snippets

2. **DATA_DICTIONARY.md** - Detailed feature documentation
   - Every field explained
   - Value ranges and distributions
   - Business context
   - Data quality notes

3. **QUICK_REFERENCE.md** (where applicable)
   - At-a-glance summary
   - Key metrics
   - Quick commands
   - Common queries

4. **Analysis Scripts** - Starter code
   - Data exploration
   - Visualization examples
   - Baseline models
   - Performance metrics

5. **Supporting Files**
   - Additional data tables
   - Jupyter notebooks
   - Sample outputs

---

## 🎓 Learning Path

### Beginner
1. Start with **Restaurant Dataset** (smallest, clearest business context)
2. Practice basic pandas operations
3. Create simple visualizations
4. Calculate business metrics

### Intermediate
1. Move to **Table Tennis Dataset** (moderate complexity)
2. Build classification models
3. Feature engineering
4. Performance evaluation

### Advanced
1. Tackle **Music Recommendation** (largest, most complex)
2. Recommendation algorithms
3. Collaborative filtering
4. Deep learning approaches

---

## 💡 Project Ideas

### Music Dataset
- Build Spotify-like recommendation engine
- Analyze music taste by demographics
- Predict song popularity
- Context-aware playlist generation
- User engagement optimization

### Table Tennis Dataset
- Player development tracker
- Match outcome predictor
- Talent identification system
- Training program optimizer
- Performance analytics dashboard

### Restaurant Dataset
- Menu engineering tool
- Customer segmentation platform
- Revenue optimization system
- Demand forecasting model
- Personalized recommendation engine
- Satisfaction prediction model

---

## 🌟 Unique Features

### Cultural Authenticity
- All datasets reflect authentic Kathmandu/Nepal context
- Local preferences and behaviors
- Regional languages and cuisines
- Cultural nuances included

### Realistic Patterns
- Based on real-world distributions
- Age-correlated behaviors
- Time-based patterns
- Contextual variations

### Educational Value
- Clean, complete data (no missing values)
- Well-documented features
- Multiple complexity levels
- Real business applications

### Comprehensive Coverage
- Multiple domains (entertainment, sports, food)
- Various data types (behavioral, demographic, transactional)
- Different analysis approaches (recommendation, prediction, optimization)

---

## 📊 Combined Analysis Opportunities

### Cross-Domain Insights
- Compare user engagement patterns across domains
- Analyze satisfaction drivers in different contexts
- Study demographic preferences variations

### Multi-Dataset Projects
- Unified customer profile (music + dining preferences)
- Lifestyle clustering (sports + entertainment + dining)
- Comprehensive recommendation system

### Advanced Analytics
- Transfer learning across domains
- Multi-task learning
- Ensemble methods combining insights

---

## 🚀 Getting Started

### Quick Setup
```bash
# Clone or download all files
# Install dependencies
pip install pandas numpy matplotlib seaborn scikit-learn

# For specific datasets:
pip install surprise lightfm  # Music recommendations
pip install plotly  # Interactive visualizations
```

### First Steps
1. Read the appropriate README for your dataset
2. Load data and explore basic statistics
3. Run the provided analysis script
4. Modify and experiment
5. Build your own models

---

## 📁 File Organization

```
datasets/
├── music_recommendation/
│   ├── kathmandu_music_recommendation_dataset.csv
│   ├── README.md
│   ├── DATA_DICTIONARY.md
│   ├── starter_analysis.py
│   └── quick_start_notebook.ipynb
│
├── table_tennis/
│   ├── table_tennis_performance_dataset.csv
│   ├── player_profiles.csv
│   ├── TABLE_TENNIS_README.md
│   ├── TABLE_TENNIS_DATA_DICTIONARY.md
│   ├── TABLE_TENNIS_QUICK_REFERENCE.md
│   └── table_tennis_starter_analysis.py
│
└── restaurant/
    ├── kathmandu_restaurant_orders.csv
    ├── order_items_detail.csv
    ├── menu_catalog.csv
    ├── customer_profiles.csv
    ├── RESTAURANT_README.md
    ├── RESTAURANT_DATA_DICTIONARY.md
    └── RESTAURANT_QUICK_REFERENCE.md
```

---

## 🎯 Choose Your Dataset

**Want to learn recommendation systems?**  
→ Start with Music Dataset

**Interested in sports analytics?**  
→ Try Table Tennis Dataset

**Need business intelligence skills?**  
→ Explore Restaurant Dataset

**Want comprehensive practice?**  
→ Work through all three!

---

## 📧 Dataset Applications

✅ Academic projects and coursework  
✅ Data science portfolio building  
✅ Machine learning practice  
✅ Business analytics training  
✅ Recommendation system development  
✅ Sports performance analysis  
✅ Restaurant management optimization  
✅ Customer behavior studies  
✅ Predictive modeling  
✅ Visualization practice  

---

**Total Dataset Size:** ~300 MB  
**Total Records:** 1,150,000+  
**Total Features:** 160+  
**Complete Documentation:** ✓  
**Analysis Scripts:** ✓  
**Real-world Relevance:** ✓  

---

**Happy Analyzing! 🎵🏓🍽️📊**

*Three comprehensive datasets for complete data science practice*
