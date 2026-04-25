# MongoDB Setup Guide for Edu-Retain

## Prerequisites

1. **Install MongoDB**
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

## Quick Start

### 1. Update Environment Variables

Edit the `.env` file in the project root:

```env
MONGODB_URI=mongodb://localhost:27017/edu-retain
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edu-retain
```

### 2. Start MongoDB (Local Installation)

**Windows:**
```powershell
# Start MongoDB service
net start MongoDB

# Or run mongod directly
mongod --dbpath C:\data\db
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
# Or
sudo service mongod start
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Migrate Existing Data

Run the migration script to transfer existing users from `users.json` to MongoDB:

```bash
node backend/migrate.js
```

### 5. Start the Application

```bash
npm run dev
```

This will start both the Vite frontend (port 5173) and Express backend (port 3001).

## API Endpoints

### Authentication

- **POST** `/api/register` - Register new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "fullName": "John Doe"
  }
  ```

- **POST** `/api/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **POST** `/api/logout` - Logout user

- **POST** `/api/forgot-password` - Request password reset
  ```json
  {
    "email": "user@example.com"
  }
  ```

- **POST** `/api/reset-password` - Reset password
  ```json
  {
    "email": "user@example.com",
    "code": "123456",
    "newPassword": "newpassword123"
  }
  ```

### Data Export

- **GET** `/api/years` - Get all available years
  
- **GET** `/api/data/:year` - Get data for specific year

- **GET** `/api/export/:year?format=json` - Export year data as JSON

- **GET** `/api/export/:year?format=csv` - Export year data as CSV

- **POST** `/api/data/:year` - Upload/update year data (admin)
  ```json
  {
    "data": [...],
    "description": "Description of the data"
  }
  ```

## Adding Year Data to Database

### Option 1: Using the API

You can use tools like Postman or curl to upload data:

```bash
curl -X POST http://localhost:3001/api/data/2021-22 \
  -H "Content-Type: application/json" \
  -d '{
    "data": [...your data array...],
    "description": "Academic year 2021-22 data"
  }'
```

### Option 2: Using MongoDB Compass

1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Navigate to `edu-retain` database → `yeardatas` collection
4. Insert documents manually

### Option 3: Update the Migration Script

Edit `backend/migrate.js` and add your CSV parsing logic:

```javascript
const csv = require('csv-parser');

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

// Then use it in migrateYearData()
const data2021 = await parseCSV('./src/data/20-21;21-22.csv');
```

## Security Notes

⚠️ **IMPORTANT**: The current implementation stores passwords in plain text. For production:

1. Install bcrypt:
   ```bash
   npm install bcrypt
   ```

2. Update `backend/routes/auth.js` to hash passwords:
   ```javascript
   const bcrypt = require('bcrypt');
   
   // On registration:
   const hashedPassword = await bcrypt.hash(password, 10);
   
   // On login:
   const isValid = await bcrypt.compare(password, user.password);
   ```

3. Change the `SESSION_SECRET` in `.env` to a strong random string

4. Use HTTPS in production

## Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: Make sure MongoDB is running:
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl status mongod
```

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solution**: Change the PORT in `.env` or kill the process using that port:
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process

# Mac/Linux
lsof -ti:3001 | xargs kill
```

## MongoDB Atlas (Cloud) Setup

1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Add database user (Database Access)
4. Whitelist IP address (Network Access) - use `0.0.0.0/0` for development
5. Get connection string and update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edu-retain?retryWrites=true&w=majority
   ```

## Testing

Test the API endpoints:

```bash
# Health check
curl http://localhost:3001/api/health

# Register a user
curl -X POST http://localhost:3001/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","fullName":"Test User"}'

# Login
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```
