# Installation & Deployment Guide

Complete guide for installing, configuring, and deploying the Restaurant Dashboard.

## System Requirements

### Minimum Requirements
- **OS**: Windows, macOS, or Linux
- **Node.js**: v14 or higher
- **npm**: v6 or higher (comes with Node.js)
- **RAM**: 2GB minimum
- **Disk Space**: 500MB

### Recommended
- **Node.js**: v18 or higher
- **npm**: v8 or higher
- **RAM**: 4GB+
- **SSD**: For faster builds

## Step 1: Verify Prerequisites

### Check Node.js Installation
```bash
node --version
npm --version
```

Should show versions like:
```
v18.17.0
8.19.2
```

### Install Node.js (if not installed)
1. Visit https://nodejs.org/
2. Download LTS version
3. Run installer and follow prompts
4. Verify with commands above

## Step 2: Project Setup

### Clone/Download Project
```bash
# Navigate to your projects folder
cd Projects

# Copy the restaurant-dashboard folder here
# Or clone from Git
git clone <repository-url>
cd restaurant-dashboard
```

### Install Dependencies
```bash
npm install
```

This installs all required packages:
- React 18.2
- Tailwind CSS 3.3
- Recharts 2.10
- Lucide React
- And other dependencies

**Time**: ~2-3 minutes on first install

## Step 3: Configure Data Source

### Option A: Quick Start (No Data)
```bash
npm start
```
Dashboard runs with sample data structure.

### Option B: With CSV Files (Browser Loading)

1. Create folder: `public/data/`
2. Copy CSV files:
   ```
   Kathmandu Restaurant Orders.csv
   Customer Profiles.csv
   Order Items Detail.csv
   Menu Catalog.csv
   ```
3. Run:
   ```bash
   npm start
   ```

### Option C: With Backend API (Recommended)

#### Setup Express Backend

1. Create `server.js` in project root:
```javascript
const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');

const app = express();
app.use(cors());

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

app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
```

2. Install backend dependencies:
```bash
npm install express cors csv-parser
npm install --save-dev nodemon
```

3. Update `package.json` scripts:
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

4. Create enterprise folder and place CSV files:
```
enterprise/
├── Kathmandu Restaurant Orders.csv
├── Customer Profiles.csv
├── Order Items Detail.csv
└── Menu Catalog.csv
```

5. Run both servers:
```bash
# Terminal 1
npm start

# Terminal 2
npm run server
```

## Step 4: Access Dashboard

Open browser and go to: http://localhost:3000

You should see:
- Loading spinner (while data loads)
- Restaurant Dashboard sidebar
- Admin header
- Overview page with KPI cards

## Step 5: Customize (Optional)

### Change Logo
1. Place your logo in `public/logo.png`
2. Update path in `src/components/Sidebar.jsx`

### Change Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        600: '#your-color-code',
        // ... other shades
      }
    }
  }
}
```

### Update Admin Name
Edit `src/components/Header.jsx`:
```javascript
<p className="text-sm font-semibold">Your Name</p>
```

## Step 6: Production Build

Create optimized build for deployment:

```bash
npm run build
```

This creates a `build/` folder with optimized files.

**Size**: ~150-200KB (gzipped)

## Deployment Options

### Option 1: Vercel (Recommended)

1. Create account: https://vercel.com
2. Connect GitHub repository
3. Click "Deploy"
4. Set environment variables in dashboard
5. Done! Auto-deploys on push

### Option 2: Netlify

1. Create account: https://netlify.com
2. Connect Git repository
3. Build command: `npm run build`
4. Publish directory: `build`
5. Deploy site

### Option 3: GitHub Pages

1. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/restaurant-dashboard"
}
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Update scripts:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

4. Deploy:
```bash
npm run deploy
```

### Option 4: Traditional Hosting (Bluehost, GoDaddy, etc.)

1. Build project: `npm run build`
2. Upload `build/` contents via FTP
3. Point domain to hosting
4. Configure backend API URL in environment variables

### Option 5: Docker Deployment

1. Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

2. Build image:
```bash
docker build -t restaurant-dashboard .
```

3. Run container:
```bash
docker run -p 3000:3000 restaurant-dashboard
```

## Troubleshooting

### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Try install again
npm install

# Or use yarn
yarn install
```

### Port 3000 already in use
```bash
# Use different port
PORT=3001 npm start

# Or kill process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Data not loading
1. Check browser console (F12)
2. Verify API server is running
3. Check CORS configuration
4. Verify CSV file paths
5. Check file encoding (UTF-8)

### Build fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Out of memory during build
```bash
# Increase Node memory
export NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

## Performance Optimization

### Frontend
```bash
# Enable gzip compression
npm install compression --save

# Lazy load pages
import React, { lazy, Suspense } from 'react';
```

### Backend
```javascript
const compression = require('compression');
app.use(compression());

// Implement caching
let cachedData = null;
function getData() {
  if (!cachedData) {
    cachedData = parseCSV('file.csv');
  }
  return cachedData;
}
```

### Bundle Analysis
```bash
npm install --save-dev webpack-bundle-analyzer
npm run build -- --analyze
```

## Monitoring & Maintenance

### Check Performance
```bash
# Lighthouse audit
npm install -g lighthouse
lighthouse http://localhost:3000
```

### Monitor Backend
```bash
# Add logging to Express
const morgan = require('morgan');
app.use(morgan('combined'));
```

### Health Checks
```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});
```

## Backup & Restore

### Backup Project
```bash
# Create zip archive
zip -r dashboard-backup.zip restaurant-dashboard/

# Or use Git
git add .
git commit -m "Backup"
git push origin main
```

### Restore
```bash
# From backup
unzip dashboard-backup.zip

# Or from Git
git clone <repository-url>
npm install
```

## Updates & Maintenance

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update safely
npm update

# Update specific package
npm install package@latest --save
```

### Check for Security Issues
```bash
npm audit
npm audit fix
```

## Documentation Reference

- **Full Docs**: README.md
- **Calculations**: DASHBOARD_DOCUMENTATION.md
- **Data Setup**: DATA_INTEGRATION.md
- **Quick Start**: QUICK_START.md
- **Environment**: .env.example

## Support

For issues:
1. Check documentation files
2. Review browser console errors (F12)
3. Check backend server logs
4. Verify file paths and permissions
5. Test with sample data first

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Setup data source (pick Option A, B, or C)
3. ✅ Run locally: `npm start`
4. ✅ Test all pages and visualizations
5. ✅ Customize branding and colors
6. ✅ Setup backend for production
7. ✅ Deploy to hosting platform
8. ✅ Configure monitoring and logging

---

**Happy dashboarding! 🚀**
