# Quick Start Guide - MongoDB Integration

## What's Been Implemented

✅ MongoDB integration for user authentication
✅ MongoDB integration for year-based data export
✅ Backend API server with Express
✅ Data export endpoints (JSON & CSV)
✅ User authentication endpoints (login, register, password reset)
✅ Migration scripts for existing data

## Setup Steps

### 1. Install MongoDB

**Option A: Local Installation (Windows)**
```powershell
# Download from https://www.mongodb.com/try/download/community
# After installation, start MongoDB:
net start MongoDB
```

**Option B: Use MongoDB Atlas (Free Cloud)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string and update `.env`

### 2. Configure Environment

The `.env` file has been created with default values. Update if needed:

```env
MONGODB_URI=mongodb://localhost:27017/edu-retain
PORT=3001
SESSION_SECRET=your-secret-key-change-in-production
CLIENT_URL=http://localhost:5173
```

### 3. Migrate Existing Users

Transfer users from `backend/users.json` to MongoDB:

```powershell
npm run migrate
```

### 4. Import CSV Data (Optional)

Import your CSV files into MongoDB for data export functionality:

```powershell
npm run import-csv
```

This will parse CSV files from `src/data/` and store them in MongoDB.

### 5. Start the Application

```powershell
npm run dev
```

This starts:
- Frontend (Vite): http://localhost:5173
- Backend (Express): http://localhost:3001

## How It Works

### Authentication Flow

1. **Register**: Users register via `/api/register`
   - Data stored in MongoDB `users` collection
   - Password stored (⚠️ currently plain text - see security notes)

2. **Login**: Users login via `/api/login`
   - Credentials verified against MongoDB
   - Session created and stored
   - User data returned to frontend

3. **Frontend**: AuthContext remains the same
   - Still uses `/api/login` and `/api/register`
   - Now these endpoints use MongoDB instead of JSON file

### Data Export Flow

1. **User selects year** in Settings page
2. **Clicks "Download JSON" or "Download CSV"**
3. **Frontend calls** `/api/export/:year?format=json` or `format=csv`
4. **Backend queries** MongoDB YearData collection
5. **File downloaded** with year-specific data

### Fallback Behavior

If data is not found in MongoDB, the system falls back to:
- Local PDF generation using existing data parsers
- This ensures backward compatibility

## API Endpoints Reference

### Authentication
- `POST /api/register` - Create new user
- `POST /api/login` - Authenticate user
- `POST /api/logout` - End session
- `POST /api/forgot-password` - Request reset code
- `POST /api/reset-password` - Reset password with code

### Data Management
- `GET /api/years` - List all available years
- `GET /api/data/:year` - Get data for specific year
- `GET /api/export/:year?format=json` - Export as JSON
- `GET /api/export/:year?format=csv` - Export as CSV
- `POST /api/data/:year` - Upload/update year data

## Testing

### Test Authentication
```powershell
# Register
curl -X POST http://localhost:3001/api/register -H "Content-Type: application/json" -d '{\"email\":\"test@example.com\",\"password\":\"test123\",\"fullName\":\"Test User\"}'

# Login
curl -X POST http://localhost:3001/api/login -H "Content-Type: application/json" -d '{\"email\":\"test@example.com\",\"password\":\"test123\"}'
```

### Test Data Export
```powershell
# Get available years
curl http://localhost:3001/api/years

# Export data
curl "http://localhost:3001/api/export/2021-22?format=json" --output data.json
```

## File Structure

```
backend/
├── models/
│   ├── User.js           # User schema
│   └── YearData.js       # Year data schema
├── routes/
│   ├── auth.js           # Authentication routes
│   └── data.js           # Data export routes
├── server.js             # Express server
├── migrate.js            # User migration script
├── importCSV.js          # CSV import script
└── users.json            # (Legacy) User data

src/
├── context/
│   └── AuthContext.jsx   # (No changes - already uses API)
├── pages/
│   └── Settings.jsx      # Updated with MongoDB export
```

## Important Security Notes

⚠️ **Before Production:**

1. **Hash Passwords**: Install bcrypt and update auth.js
   ```powershell
   npm install bcrypt
   ```

2. **Secure Session**: Change SESSION_SECRET in .env

3. **Use HTTPS**: Enable SSL/TLS in production

4. **Validate Inputs**: Additional validation on all endpoints

5. **Rate Limiting**: Add rate limiting to prevent abuse

See `MONGODB_SETUP.md` for detailed security implementation.

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Fix**: Start MongoDB service
```powershell
net start MongoDB
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3001
```
**Fix**: Change PORT in .env or kill the process:
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process
```

### Data Not Found Error
**Fix**: Import CSV data first:
```powershell
npm run import-csv
```

## Next Steps

1. ✅ **Start MongoDB** (if local)
2. ✅ **Run migration** (`npm run migrate`)
3. ✅ **Import CSV data** (`npm run import-csv`)
4. ✅ **Start app** (`npm run dev`)
5. ✅ **Test login** with existing users
6. ✅ **Test data export** in Settings page

For detailed documentation, see `MONGODB_SETUP.md`
