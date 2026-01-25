# Restaurant Customer Ordering Pattern Dashboard

A comprehensive React-based analytics dashboard for analyzing restaurant customer ordering patterns in Kathmandu. This application provides detailed insights across five analytical dimensions: Overview, Descriptive, Diagnostic, Predictive, and Prescriptive Analytics.

## 🎯 Features

### Dashboard Sections

1. **Overview**
   - Real-time KPI cards (Revenue, AOV, Satisfaction, Loyalty Rate)
   - Hourly order distribution
   - Revenue by category breakdown
   - Meal period distribution
   - Summary metrics table

2. **Descriptive Analytics**
   - Market Basket Analysis (top 10 popular items)
   - Customer segment distribution (KPI Donuts)
   - Payment method preferences
   - Order type breakdown
   - Location performance metrics
   - Customer preference analysis (spice, dietary)

3. **Diagnostic Analytics**
   - Correlation analysis (Spending vs Satisfaction)
   - Pareto analysis (80/20 rule)
   - Day of week performance trends
   - Wait time impact on satisfaction
   - Loyalty member comparison
   - Party size analysis

4. **Predictive Analytics**
   - 7-day revenue forecast
   - Daily orders projection
   - Customer satisfaction forecasting
   - Churn risk modeling
   - Monthly growth trends
   - Forecast confidence intervals

5. **Prescriptive Analytics**
   - KPI recommendations with targets
   - Cohort analysis by customer type
   - Customer cluster segmentation (VIP, Standard, Emerging)
   - Location-specific recommendations
   - Menu optimization strategies

## 📊 Analytical Methods Used

### Statistical Calculations

- **Pearson Correlation Coefficient**: Measure relationships between variables
- **Moving Averages**: Time-series forecasting for revenue and orders
- **Standard Deviation**: Identify outliers and segment clusters
- **Pareto Principle**: Focus on vital few high-impact items
- **Recency Analysis**: Churn risk assessment

### Business Metrics

- **KPIs**: Revenue, AOV, Satisfaction, Loyalty Rate
- **Cohort Metrics**: Customer segment profitability
- **Performance Indicators**: Wait time, satisfaction by location
- **Trend Analysis**: Monthly growth rates, seasonal patterns

## 🛠️ Technology Stack

```
Frontend:
- React 18.2
- Tailwind CSS 3.3
- Recharts 2.10 (Charts & Visualizations)
- Lucide React (Icons)

Development:
- Node.js & npm
- PostCSS
- Autoprefixer
```

## 📁 Project Structure

```
restaurant-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   └── Header.jsx
│   ├── pages/
│   │   ├── Overview.jsx
│   │   ├── Descriptive.jsx
│   │   ├── Diagnostic.jsx
│   │   ├── Predictive.jsx
│   │   └── Prescriptive.jsx
│   ├── utils/
│   │   └── dataAnalysis.js
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── DASHBOARD_DOCUMENTATION.md
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd restaurant-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 📖 Usage

### Sidebar Navigation

- **Overview**: KPI dashboard with key metrics
- **Descriptive**: Current state analysis and distributions
- **Diagnostic**: Root cause analysis and correlations
- **Predictive**: Future trend forecasting
- **Prescriptive**: Actionable recommendations

### Interactive Features

- **Hover Tooltips**: View detailed data by hovering over visualizations
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Mobile Menu**: Toggle sidebar with menu button on mobile

## 📊 Data Integration

### Current Setup

The dashboard expects data in JSON format. Currently, sample data structure is:

```javascript
{
  orders: [{
    order_id: string,
    customer_id: string,
    total_amount_npr: number,
    customer_satisfaction: number,
    order_datetime: string,
    meal_period: string,
    // ... more fields
  }],
  customers: [{
    customer_id: string,
    customer_type: string,
    avg_spending_npr: number,
    dietary_preference: string,
    // ... more fields
  }],
  orderItems: [{
    order_id: string,
    item_id: string,
    item_name: string,
    category: string,
    item_total: number,
    // ... more fields
  }]
}
```

### Integration with CSV Data

To integrate your CSV files:

1. **Backend API Setup**: Create a backend service that:
   - Reads CSV files from `/enterprise` folder
   - Parses CSV data
   - Serves data as JSON via API endpoints

2. **Frontend Configuration**: Update `App.jsx` to fetch from your API:
```javascript
const response = await fetch('http://your-api/orders');
const orders = await response.json();
```

### CSV Files

Place the following CSV files accessible to your backend:
- `Customer Profiles.csv` - Customer data (5,000 records)
- `Kathmandu Restaurant Orders.csv` - Order transactions (50,000 records)
- `Order Items Detail.csv` - Item-level data (109,821 records)
- `Menu Catalog.csv` - Menu items reference (99 items)

## 📈 Key Insights

### KPI Monitoring

**Revenue Growth**: Monitor total revenue trends to identify growth opportunities

**Customer Satisfaction**: Track satisfaction scores to improve service quality

**Loyalty Metrics**: Measure loyalty program effectiveness and ROI

**Order Analysis**: Understand ordering patterns to optimize operations

### Recommendations by Segment

**VIP Customers**: Focus on retention with premium offers and exclusive benefits

**Standard Customers**: Implement loyalty programs for increased frequency

**Emerging Customers**: Execute growth campaigns to increase spending

## 🎨 Color Theme

Professional color scheme optimized for business analytics:

- **Primary**: Sky Blue (#0ea5e9) - Main data representation
- **Secondary**: Ocean Blue (#0284c7) - Secondary data
- **Accent**: Dark Blue (#0369a1) - Highlights
- **Warning**: Orange (#f59e0b) - Trends and warnings
- **Critical**: Red (#ef4444) - Important alerts
- **Background**: Light Gray (#f3f4f6) - Main workspace

## 📱 Responsive Design

- **Desktop**: Full-width layout with permanent sidebar
- **Tablet**: Responsive grid adjustments
- **Mobile**: Collapsible sidebar with hamburger menu

## 🔒 Security Considerations

- No API keys hardcoded
- CORS should be configured on backend
- Sanitize CSV input before processing
- Implement authentication for production

## 🚀 Production Build

Create an optimized production build:

```bash
npm run build
```

This creates a `build/` folder with optimized assets ready for deployment.

## 📝 Documentation

Detailed calculation documentation is available in `DASHBOARD_DOCUMENTATION.md` including:
- All formulas and methodologies
- Data transformation steps
- Statistical methods explained
- Business logic for each visualization

## 🤝 Contributing

To extend the dashboard:

1. Create new page components in `src/pages/`
2. Add calculations to `src/utils/dataAnalysis.js`
3. Update navigation in `Sidebar.jsx`
4. Update documentation

## 📞 Support

For issues or questions:
1. Check `DASHBOARD_DOCUMENTATION.md` for technical details
2. Review calculation formulas for analytical questions
3. Check React/Recharts documentation for component-specific issues

## 📄 License

This project is for analytical and business intelligence purposes.

## 🎓 Educational Notes

This dashboard demonstrates:
- Modern React patterns (Hooks, Context)
- Data visualization best practices
- Statistical analysis implementation
- Business analytics methodologies
- Responsive UI design with Tailwind CSS
- Complex data transformations

## 📚 References

### Data Analysis Methods
- Pearson Correlation: Measure linear relationships
- Pareto Analysis: Focus on vital few
- Moving Averages: Trend smoothing
- Statistical Clustering: Customer segmentation
- Recency Analysis: Churn prediction

### Visualization Principles
- Clear data hierarchy
- Appropriate chart types
- Color coding for meaning
- Tooltips for detail access
- Responsive layouts

## Version History

**v1.0.0** (January 2026)
- Initial release
- 5 main dashboard sections
- 20+ visualizations
- Full documentation

---

**Last Updated**: January 2026
**Dashboard Type**: Business Intelligence & Analytics
**Target Users**: Restaurant Management, Analytics Team, Executives
