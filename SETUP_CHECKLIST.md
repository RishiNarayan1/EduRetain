# Setup Checklist for MongoDB Integration

Complete these steps in order to get your MongoDB integration running.

## Prerequisites

- [ ] Node.js installed (v14 or higher)
- [ ] npm or yarn package manager
- [ ] MongoDB installed locally OR MongoDB Atlas account created

---

## Step 1: MongoDB Installation

Choose ONE option:

### Option A: Local MongoDB (Windows)
- [ ] Download MongoDB Community Server from https://www.mongodb.com/try/download/community
- [ ] Install with default settings
- [ ] Start MongoDB service:
  ```powershell
  net start MongoDB
  ```
- [ ] Verify it's running (should see no error)

### Option B: MongoDB Atlas (Cloud - Free)
- [ ] Create account at https://www.mongodb.com/cloud/atlas
- [ ] Create a free cluster (M0)
- [ ] Create database user (Database Access → Add New Database User)
- [ ] Whitelist your IP (Network Access → Add IP Address → `0.0.0.0/0` for testing)
- [ ] Get connection string (Connect → Connect your application)

---

## Step 2: Environment Configuration

- [ ] Verify `.env` file exists in project root
- [ ] Update MongoDB URI in `.env`:
  ```env
  # For local MongoDB:
  MONGODB_URI=mongodb://localhost:27017/edu-retain
  
  # OR for MongoDB Atlas:
  # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edu-retain
  ```
- [ ] Keep other settings as default for now

---

## Step 3: Install Dependencies

- [ ] Open PowerShell in project directory
- [ ] Run:
  ```powershell
  npm install
  ```
- [ ] Wait for installation to complete (all packages including mongoose should install)

---

## Step 4: Verify Setup

- [ ] Run the setup checker:
  ```powershell
  npm run check-setup
  ```
- [ ] Should see "MongoDB connected successfully!"
- [ ] Note warnings about missing users/data (we'll fix next)

**If you see errors:**
- "ECONNREFUSED" → MongoDB not running (run `net start MongoDB`)
- "Authentication failed" → Check username/password in MONGODB_URI
- Other errors → Check `MONGODB_SETUP.md` troubleshooting section

---

## Step 5: Migrate Existing Users

- [ ] Run migration script:
  ```powershell
  npm run migrate
  ```
- [ ] Should see: "✓ Migrated user: [email]" for each user
- [ ] Users from `backend/users.json` now in MongoDB

---

## Step 6: Import CSV Data (Optional but Recommended)

- [ ] Run CSV import script:
  ```powershell
  npm run import-csv
  ```
- [ ] Should see: "✓ Successfully imported data for [year]"
- [ ] CSV files from `src/data/` now in MongoDB

---

## Step 7: Verify Everything

- [ ] Run setup checker again:
  ```powershell
  npm run check-setup
  ```
- [ ] Should see:
  - ✅ Users migrated
  - ✅ Year data imported
  - ✅ MongoDB connection working

---

## Step 8: Start Application

- [ ] Start the development server:
  ```powershell
  npm run dev
  ```
- [ ] Should see:
  - "🚀 Server running on http://localhost:3001"
  - "✅ Connected to MongoDB"
  - Vite dev server on http://localhost:5173

---

## Step 9: Test the Application

### Test Login
- [ ] Open browser to http://localhost:5173
- [ ] Click "Login"
- [ ] Try logging in with existing user from `users.json`:
  - Email: `rn9092167@gmail.com`
  - Password: `Rishi@1721`
- [ ] Should successfully log in

### Test Registration
- [ ] Click "Register" (or navigate to registration)
- [ ] Create a new account
- [ ] Should successfully register and log in

### Test Data Export
- [ ] Navigate to Settings page
- [ ] Select a year from dropdown (e.g., "2021-22")
- [ ] Click "Download JSON"
- [ ] File should download
- [ ] Click "Download CSV"
- [ ] CSV file should download

---

## Step 10: Test API Endpoints (Optional)

In PowerShell, test the API directly:

### Health Check
- [ ] Run:
  ```powershell
  curl http://localhost:3001/api/health
  ```
- [ ] Should see: `{"status":"OK","mongodb":"Connected"}`

### Get Available Years
- [ ] Run:
  ```powershell
  curl http://localhost:3001/api/years
  ```
- [ ] Should see list of years

### Register New User
- [ ] Run:
  ```powershell
  curl -X POST http://localhost:3001/api/register -H "Content-Type: application/json" -d '{\"email\":\"test@example.com\",\"password\":\"test123\",\"fullName\":\"Test User\"}'
  ```
- [ ] Should see user object returned

---

## Troubleshooting Checklist

If something doesn't work:

- [ ] MongoDB is running? (`net start MongoDB`)
- [ ] Correct MongoDB URI in `.env`?
- [ ] All dependencies installed? (`npm install`)
- [ ] Migrations run? (`npm run migrate`)
- [ ] Port 3001 available? (not used by another app)
- [ ] Port 5173 available? (Vite dev server)
- [ ] Check `npm run check-setup` output
- [ ] Check console for error messages
- [ ] See `MONGODB_SETUP.md` for detailed troubleshooting

---

## Production Checklist (Before Deploying)

- [ ] Install bcrypt: `npm install bcrypt`
- [ ] Update `backend/routes/auth.js` to hash passwords
- [ ] Change SESSION_SECRET in `.env` to strong random string
- [ ] Use MongoDB Atlas (not local MongoDB)
- [ ] Enable MongoDB authentication
- [ ] Add rate limiting (install express-rate-limit)
- [ ] Enable HTTPS/SSL
- [ ] Set NODE_ENV=production
- [ ] Add input validation and sanitization
- [ ] Review and test all security measures
- [ ] Set up MongoDB backups
- [ ] Configure proper CORS origins (not *)

See `MONGODB_SETUP.md` security section for implementation details.

---

## Summary

✅ **You should now have:**
- MongoDB connected and running
- Users migrated from JSON to MongoDB
- Year data imported from CSV files
- Backend API server running on port 3001
- Frontend Vite dev server running on port 5173
- Working authentication (login/register)
- Working data export (JSON/CSV)

✅ **Test everything works:**
- Login with existing user
- Register new user
- Export data for different years

🎉 **Success!** Your MongoDB integration is complete.

For detailed documentation, see:
- `QUICKSTART.md` - Quick start guide
- `MONGODB_SETUP.md` - Complete setup documentation
- `IMPLEMENTATION_SUMMARY.md` - Technical implementation details
