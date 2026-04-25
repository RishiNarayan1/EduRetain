# 📂 Complete Project Structure

```
edu-retain/
│
├── 📄 README.md                          ← Main project documentation
├── 📄 GETTING_STARTED.md                 ← Quick start (read this first!)
├── 📄 QUICKSTART.md                      ← Fast setup guide
├── 📄 SETUP_CHECKLIST.md                 ← Step-by-step setup
├── 📄 MONGODB_SETUP.md                   ← Complete MongoDB guide
├── 📄 ARCHITECTURE.md                    ← System architecture
├── 📄 IMPLEMENTATION_SUMMARY.md          ← Technical details
│
├── 📄 .env                               ← Environment configuration (MongoDB URI, etc.)
├── 📄 .gitignore                         ← Git ignore rules
├── 📄 package.json                       ← Dependencies and scripts
├── 📄 vite.config.js                     ← Vite configuration (proxy to port 3001)
├── 📄 eslint.config.js                   ← ESLint configuration
├── 📄 index.html                         ← HTML entry point
│
├── 📁 backend/                           ← ✨ Backend server (NEW)
│   │
│   ├── 📁 models/                        ← MongoDB schemas
│   │   ├── User.js                       ← User model (email, password, fullName, etc.)
│   │   └── YearData.js                   ← Year data model (year, data, metadata)
│   │
│   ├── 📁 routes/                        ← API endpoints
│   │   ├── auth.js                       ← Authentication routes (login, register, reset)
│   │   └── data.js                       ← Data export routes (years, export, upload)
│   │
│   ├── 📄 server.js                      ← Express server + MongoDB connection
│   ├── 📄 migrate.js                     ← Migrate users.json → MongoDB
│   ├── 📄 importCSV.js                   ← Import CSV files → MongoDB
│   ├── 📄 checkSetup.js                  ← Verify MongoDB setup
│   │
│   ├── 📄 users.json                     ← (Legacy) Original user data
│   └── 📄 .env.example                   ← Example environment file
│
├── 📁 src/                               ← Frontend source code
│   │
│   ├── 📁 components/                    ← React components
│   │   ├── 📁 analytics/                 ← Analytics visualizations
│   │   │   ├── GenderDisparity.jsx
│   │   │   ├── GeoHeatmap.jsx
│   │   │   ├── SchoolPerformance.jsx
│   │   │   ├── SocialTrends.jsx
│   │   │   └── StudentJourney.jsx
│   │   │
│   │   ├── 📁 dashboard/                 ← Dashboard components
│   │   │   └── StatCard.jsx
│   │   │
│   │   └── 📁 layout/                    ← Layout components
│   │       ├── AIPolicyAssistant.jsx
│   │       ├── AuthLayout.jsx
│   │       ├── LanguageSelector.jsx
│   │       ├── MainLayout.jsx
│   │       ├── Sidebar.jsx
│   │       └── UserProfile.jsx
│   │
│   ├── 📁 context/                       ← React Context providers
│   │   ├── AuthContext.jsx               ← User authentication (uses /api/login)
│   │   ├── LanguageContext.jsx           ← Multi-language support
│   │   └── ThemeContext.jsx              ← Dark/Light mode
│   │
│   ├── 📁 pages/                         ← Page components (routes)
│   │   ├── AnalyticsView.jsx             ← Analytics dashboard
│   │   ├── DashboardHome.jsx             ← Home dashboard
│   │   ├── ForgotPassword.jsx            ← Password reset page
│   │   ├── Login.jsx                     ← Login page
│   │   ├── Register.jsx                  ← Registration page
│   │   ├── Settings.jsx                  ← ✨ Settings (updated for MongoDB export)
│   │   └── Simulator.jsx                 ← Data simulator
│   │
│   ├── 📁 data/                          ← CSV data files
│   │   ├── 17-18;19-20.csv               ← Historical data (2017-2020)
│   │   ├── 20-21;21-22.csv               ← Recent data (2020-2022)
│   │   ├── DOR.csv                       ← DOR data
│   │   └── mockData.js                   ← Mock data for development
│   │
│   ├── 📁 services/                      ← External services
│   │   └── geminiService.js              ← Google Gemini AI integration
│   │
│   ├── 📁 translations/                  ← Multi-language support
│   │   ├── en.js                         ← English translations
│   │   ├── hi.js                         ← Hindi translations
│   │   ├── te.js                         ← Telugu translations
│   │   └── index.js                      ← Translation loader
│   │
│   ├── 📁 utils/                         ← Utility functions
│   │   ├── dorDataParser.js              ← Parse DOR CSV data
│   │   └── newDorData.js                 ← Parse new format data
│   │
│   ├── 📁 assets/                        ← Static assets (images, icons, etc.)
│   │
│   ├── 📄 App.jsx                        ← Main app component
│   ├── 📄 App.css                        ← App styles
│   ├── 📄 main.jsx                       ← React entry point
│   └── 📄 index.css                      ← Global styles
│
├── 📁 public/                            ← Public static files
│
└── 📁 node_modules/                      ← Dependencies (generated)
```

## 🔑 Key Files by Purpose

### 📖 Documentation (Read These First!)
1. **GETTING_STARTED.md** - Start here! Quick overview
2. **QUICKSTART.md** - Fast 3-step setup
3. **SETUP_CHECKLIST.md** - Detailed step-by-step guide
4. **MONGODB_SETUP.md** - Complete MongoDB documentation
5. **ARCHITECTURE.md** - System architecture diagrams
6. **IMPLEMENTATION_SUMMARY.md** - Technical implementation

### ⚙️ Configuration Files
1. **.env** - MongoDB URI, ports, secrets
2. **vite.config.js** - Proxy configuration (port 3001)
3. **package.json** - Scripts and dependencies
4. **eslint.config.js** - Code linting rules

### 🔧 Backend (MongoDB Integration)
1. **backend/server.js** - Express server, MongoDB connection
2. **backend/models/User.js** - User schema
3. **backend/models/YearData.js** - Year data schema
4. **backend/routes/auth.js** - Login, register, password reset
5. **backend/routes/data.js** - Data export, year management

### 🛠️ Utility Scripts
1. **backend/migrate.js** - Transfer users to MongoDB
2. **backend/importCSV.js** - Import CSV files to MongoDB
3. **backend/checkSetup.js** - Verify setup and connection

### 💻 Frontend (React)
1. **src/context/AuthContext.jsx** - Authentication state
2. **src/pages/Settings.jsx** - Export data from MongoDB
3. **src/pages/Login.jsx** - User login
4. **src/pages/Register.jsx** - User registration

### 📊 Data Files
1. **src/data/17-18;19-20.csv** - Historical student data
2. **src/data/20-21;21-22.csv** - Recent student data
3. **src/data/DOR.csv** - DOR data
4. **backend/users.json** - Legacy user data (migrate to MongoDB)

## 🎯 What Each Backend File Does

### Models (Database Schemas)
```javascript
// backend/models/User.js
- Defines user structure in MongoDB
- Fields: email, password, fullName, resetCode
- Validates email format, password length
- Creates index on email for fast lookups

// backend/models/YearData.js
- Defines year data structure
- Fields: year, data (flexible), metadata
- Creates index on year for fast queries
```

### Routes (API Endpoints)
```javascript
// backend/routes/auth.js
- POST /api/register → Create new user
- POST /api/login → Authenticate user
- POST /api/logout → End session
- POST /api/forgot-password → Send reset code
- POST /api/reset-password → Reset password

// backend/routes/data.js
- GET /api/years → List all years
- GET /api/data/:year → Get year data
- GET /api/export/:year → Download data (JSON/CSV)
- POST /api/data/:year → Upload year data
- DELETE /api/data/:year → Delete year data
```

### Server & Scripts
```javascript
// backend/server.js
- Creates Express app
- Connects to MongoDB
- Mounts routes
- Handles sessions
- Error handling

// backend/migrate.js
- Reads backend/users.json
- Creates users in MongoDB
- One-time migration script

// backend/importCSV.js
- Reads CSV files from src/data/
- Parses CSV data
- Stores in MongoDB yeardatas collection

// backend/checkSetup.js
- Tests MongoDB connection
- Counts users and year data
- Checks indexes
- Verifies environment variables
- Provides diagnostic information
```

## 🎨 Frontend File Purposes

### Context (Global State)
```javascript
// src/context/AuthContext.jsx
- Manages user authentication state
- Calls /api/login and /api/register
- Stores user in localStorage
- No changes needed (already uses API)

// src/context/LanguageContext.jsx
- Multi-language support (EN, HI, TE)
- Translations switching

// src/context/ThemeContext.jsx
- Dark/Light mode switching
```

### Pages (Routes)
```javascript
// src/pages/Login.jsx
- User login form
- Uses AuthContext
- Redirects after login

// src/pages/Register.jsx
- User registration form
- Uses AuthContext
- Creates account in MongoDB

// src/pages/Settings.jsx ✨ UPDATED
- Language selection
- Theme selection
- Data export (JSON/CSV from MongoDB)
- Logout button

// src/pages/DashboardHome.jsx
- Main dashboard
- Statistics cards
- Quick overview

// src/pages/AnalyticsView.jsx
- Detailed analytics
- Charts and visualizations
```

## 🔄 Data Flow

### User Registration
```
Register.jsx
    ↓
AuthContext.register()
    ↓
POST /api/register
    ↓
backend/routes/auth.js
    ↓
backend/models/User.js
    ↓
MongoDB users collection
```

### Data Export
```
Settings.jsx
    ↓
handleExportData()
    ↓
GET /api/export/:year?format=json
    ↓
backend/routes/data.js
    ↓
backend/models/YearData.js
    ↓
MongoDB yeardatas collection
    ↓
Download JSON/CSV file
```

## 📦 NPM Scripts Quick Reference

```bash
# Development
npm run dev          # Start everything (frontend + backend)
npm run server       # Backend only
npm run vite-only    # Frontend only

# MongoDB Setup
npm run check-setup  # Verify MongoDB connection
npm run migrate      # Migrate users to MongoDB
npm run import-csv   # Import CSV data to MongoDB

# Production
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🌟 Where to Start?

### First Time Setup
1. Read `GETTING_STARTED.md`
2. Follow `SETUP_CHECKLIST.md`
3. Run `npm run check-setup`
4. Run migrations if needed
5. Run `npm run dev`

### Understanding the Code
1. Check `ARCHITECTURE.md` for system overview
2. Read `IMPLEMENTATION_SUMMARY.md` for details
3. Explore backend files in order:
   - models/ (data structure)
   - routes/ (API endpoints)
   - server.js (main entry)

### Making Changes
1. Frontend changes: Edit `src/` files
2. Backend changes: Edit `backend/` files
3. API changes: Update `backend/routes/`
4. Database changes: Update `backend/models/`

## 💡 Quick Tips

- 📄 **Lost?** Start with `GETTING_STARTED.md`
- 🔍 **Issues?** Run `npm run check-setup`
- 📚 **Learning?** Read `ARCHITECTURE.md`
- 🐛 **Errors?** Check `MONGODB_SETUP.md` troubleshooting
- 🚀 **Deploying?** See production checklist in docs

---

**All files are documented and ready to use! 🎉**
