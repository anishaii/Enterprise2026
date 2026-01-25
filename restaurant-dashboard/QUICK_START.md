# Quick Start Guide - Restaurant Dashboard

## 5-Minute Setup

### 1. Prerequisites
- Node.js installed (v14+)
- Your CSV data files ready

### 2. Install & Run

```bash
cd restaurant-dashboard
npm install
npm start
```

Open http://localhost:3000 in your browser.

## With Data Integration

For production with real data:

### Option A: Quick (No Backend)

1. Place CSV files in `public/data/` folder:
   ```
   public/
   └── data/
       ├── Kathmandu Restaurant Orders.csv
       ├── Customer Profiles.csv
       ├── Order Items Detail.csv
       └── Menu Catalog.csv
   ```

2. Add papaparse to package.json:
   ```bash
   npm install papaparse
   ```

3. Data loads automatically on dashboard startup

### Option B: With Backend (Recommended)

1. Create `server.js` in root (see DATA_INTEGRATION.md)

2. Install backend dependencies:
   ```bash
   npm install express cors csv-parser
   npm install --save-dev nodemon
   ```

3. Copy CSV files to `./enterprise/` folder:
   ```
   enterprise/
   ├── Kathmandu Restaurant Orders.csv
   ├── Customer Profiles.csv
   ├── Order Items Detail.csv
   └── Menu Catalog.csv
   ```

4. Run both servers:
   ```bash
   npm start          # Terminal 1
   node server.js     # Terminal 2
   ```

## Dashboard Navigation

**Sidebar Menu:**
- 📊 **Overview** - Key metrics and summary
- 📈 **Descriptive** - Market basket, segments, preferences
- 🔍 **Diagnostic** - Correlation, Pareto, trends
- 🔮 **Predictive** - Forecasts and risk models
- 💡 **Prescriptive** - Recommendations and strategies

**Header:**
- Current page title
- Admin profile (top right)
- Notification & settings icons

## Features at a Glance

### ✨ Real-Time Analytics
- Live KPI cards with key metrics
- Interactive charts with hover tooltips
- Responsive design (desktop to mobile)

### 📊 5 Analytical Perspectives
1. **Overview**: Current business state
2. **Descriptive**: What happened and patterns
3. **Diagnostic**: Why things happened
4. **Predictive**: What will happen
5. **Prescriptive**: What should we do

### 🎨 Professional Styling
- Modern blue color theme
- Clean, intuitive UI
- Consistent across all pages
- Mobile-friendly sidebar

## Troubleshooting

### "Data not loading" error
- Check browser console for error messages
- Verify CSV file locations
- Ensure backend server is running (if using Option B)
- Check for CORS errors in console

### Slow performance with large datasets
- Consider pagination (see DATA_INTEGRATION.md)
- Reduce date range in forecasts
- Enable caching on backend

### Charts not displaying
- Check browser compatibility (requires ES6+)
- Clear browser cache
- Verify data structure matches expected format

## File Structure

```
restaurant-dashboard/
├── src/
│   ├── components/     # Sidebar, Header
│   ├── pages/          # 5 main dashboard pages
│   ├── utils/          # Data analysis functions
│   ├── App.jsx         # Main component
│   └── index.css       # Global styles
├── public/
│   └── index.html      # HTML entry point
├── README.md           # Full documentation
├── DASHBOARD_DOCUMENTATION.md  # All calculations explained
├── DATA_INTEGRATION.md # Backend setup guide
├── package.json        # Dependencies
└── tailwind.config.js  # Styling configuration
```

## Key Metrics Explained

**Top KPIs on Overview Page:**
- **Total Revenue**: Sum of all order amounts
- **Avg Order Value**: Revenue ÷ Number of Orders
- **Customer Satisfaction**: Average satisfaction score (0-10)
- **Loyalty Rate**: Percentage of loyal members

## Advanced Features

### Hover Tooltips
Position cursor over any chart element to see:
- Exact values
- Percentages
- Trend indicators
- Additional context

### Responsive Layout
- **Desktop**: Full sidebar + content
- **Tablet**: Adjusted spacing
- **Mobile**: Hamburger menu sidebar

### Color Coding
- 🔵 Blue: Main metrics and data
- 🟠 Orange: Trends and warnings  
- 🔴 Red: Critical alerts
- 🟣 Purple: Categories

## Next Steps

1. **Load Your Data**: Follow Option A or B above
2. **Explore Pages**: Click through each menu item
3. **Check Tooltips**: Hover over visualizations for details
4. **Read Documentation**: See DASHBOARD_DOCUMENTATION.md for formulas
5. **Customize**: Modify colors in tailwind.config.js

## Production Deployment

### Build for Production
```bash
npm run build
```

Creates optimized `build/` folder ready to deploy.

### Deploy to Hosting
- Vercel: `vercel`
- Netlify: Connect GitHub repo
- AWS: `npm run build && aws s3 cp build/ s3://your-bucket`
- Docker: Create Dockerfile for containerization

## Support Resources

- **Full Documentation**: DASHBOARD_DOCUMENTATION.md
- **Data Integration**: DATA_INTEGRATION.md
- **React Docs**: https://react.dev
- **Recharts Docs**: https://recharts.org
- **Tailwind Docs**: https://tailwindcss.com

## Common Questions

**Q: Can I use my own logo?**
A: Yes! Place your logo in `public/` and update the path in Sidebar.jsx

**Q: How do I add more data?**
A: Extend data loading in App.jsx and create new visualizations

**Q: Can I export data?**
A: Implement export functionality using libraries like `xlsx` or `jspdf`

**Q: How do I add filters?**
A: Create a filter component and update state management in App.jsx

## Customization Quick Tips

### Change Color Theme
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: { /* your colors */ }
    }
  }
}
```

### Modify Chart Types
Replace chart components in page files:
```javascript
// Switch from Bar to Line chart
<LineChart data={data}>...</LineChart>
```

### Add New Pages
1. Create `src/pages/YourPage.jsx`
2. Add to sidebar in `Sidebar.jsx`
3. Import and render in `App.jsx`

## Performance Tips

- Lazy load pages for faster initial load
- Implement data caching on backend
- Use pagination for large datasets
- Compress images and assets
- Enable gzip on backend server

---

**Ready to get started?** Run `npm start` and explore! 🚀
