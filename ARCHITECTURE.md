# MongoDB Integration Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          FRONTEND (React + Vite)                     │
│                        http://localhost:5173                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌───────────────┐    ┌──────────────┐    ┌────────────────┐       │
│  │  Login Page   │    │ Register Page│    │ Settings Page  │       │
│  └───────┬───────┘    └──────┬───────┘    └────────┬───────┘       │
│          │                   │                      │                │
│          └───────────────────┴──────────────────────┘                │
│                              │                                       │
│                    ┌─────────▼──────────┐                           │
│                    │   AuthContext.jsx  │                           │
│                    └─────────┬──────────┘                           │
│                              │                                       │
└──────────────────────────────┼───────────────────────────────────────┘
                               │
                          API Calls
                   (/api/login, /api/register,
                    /api/export/:year, etc.)
                               │
┌──────────────────────────────▼───────────────────────────────────────┐
│                       BACKEND (Express.js)                            │
│                     http://localhost:3001                             │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │                    server.js (Main Entry)                   │     │
│  │  - CORS configuration                                       │     │
│  │  - Session management                                       │     │
│  │  - MongoDB connection                                       │     │
│  │  - Route mounting                                           │     │
│  └──────────────────┬────────────────┬────────────────────────┘     │
│                     │                │                               │
│         ┌───────────▼──────┐   ┌────▼──────────┐                   │
│         │  routes/auth.js  │   │ routes/data.js│                   │
│         ├──────────────────┤   ├───────────────┤                   │
│         │ POST /register   │   │ GET /years    │                   │
│         │ POST /login      │   │ GET /data/:y  │                   │
│         │ POST /logout     │   │ GET /export/:y│                   │
│         │ POST /forgot-pwd │   │ POST /data/:y │                   │
│         │ POST /reset-pwd  │   │ DELETE /data  │                   │
│         └────────┬──────────┘   └────┬──────────┘                   │
│                  │                   │                               │
│                  │                   │                               │
│         ┌────────▼──────────┐   ┌───▼────────────┐                 │
│         │  models/User.js   │   │ models/        │                 │
│         │                   │   │ YearData.js    │                 │
│         │ - email           │   │                │                 │
│         │ - password        │   │ - year         │                 │
│         │ - fullName        │   │ - data         │                 │
│         │ - resetCode       │   │ - metadata     │                 │
│         └────────┬──────────┘   └───┬────────────┘                 │
│                  │                  │                                │
└──────────────────┼──────────────────┼────────────────────────────────┘
                   │                  │
                   │    Mongoose      │
                   │    ODM Layer     │
                   │                  │
┌──────────────────▼──────────────────▼────────────────────────────────┐
│                         MongoDB Database                              │
│                  mongodb://localhost:27017/edu-retain                 │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌──────────────────────┐         ┌──────────────────────┐         │
│   │  users collection    │         │ yeardatas collection │         │
│   ├──────────────────────┤         ├──────────────────────┤         │
│   │ {                    │         │ {                    │         │
│   │   _id: ObjectId,     │         │   _id: ObjectId,     │         │
│   │   email: String,     │         │   year: "2021-22",   │         │
│   │   password: String,  │         │   data: [...],       │         │
│   │   fullName: String,  │         │   metadata: {...}    │         │
│   │   resetCode: String  │         │ }                    │         │
│   │ }                    │         │                      │         │
│   └──────────────────────┘         └──────────────────────┘         │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagrams

### 1. User Registration Flow

```
User fills form
     │
     ▼
Frontend validates
     │
     ▼
POST /api/register
     │
     ▼
Backend validates (express-validator)
     │
     ▼
Check if user exists (MongoDB query)
     │
     ├─ Yes ──► Return error
     │
     └─ No
         │
         ▼
    Create user in MongoDB
         │
         ▼
    Return user data (without password)
         │
         ▼
    Frontend receives user
         │
         ▼
    Redirect to login
```

### 2. User Login Flow

```
User enters credentials
     │
     ▼
POST /api/login
     │
     ▼
Backend finds user by email
     │
     ├─ Not found ──► Return error
     │
     └─ Found
         │
         ▼
    Compare password (plain text - TODO: bcrypt)
         │
         ├─ Invalid ──► Return error
         │
         └─ Valid
             │
             ▼
        Create session
             │
             ▼
        Return user data
             │
             ▼
        Frontend stores in localStorage
             │
             ▼
        User logged in
```

### 3. Data Export Flow

```
User selects year in Settings
     │
     ▼
User clicks "Download JSON"
     │
     ▼
GET /api/export/:year?format=json
     │
     ▼
Backend queries MongoDB YearData
     │
     ├─ Not found ──► Return 404
     │                     │
     │                     ▼
     │               Frontend catches error
     │                     │
     │                     ▼
     │               Falls back to local PDF
     │
     └─ Found
         │
         ▼
    Format as JSON (or CSV if format=csv)
         │
         ▼
    Set headers (Content-Type, Content-Disposition)
         │
         ▼
    Stream file to browser
         │
         ▼
    Browser downloads file
```

## File Structure

```
edu-retain/
│
├── backend/
│   ├── models/
│   │   ├── User.js              ← MongoDB User schema
│   │   └── YearData.js          ← MongoDB YearData schema
│   │
│   ├── routes/
│   │   ├── auth.js              ← Authentication endpoints
│   │   └── data.js              ← Data export endpoints
│   │
│   ├── server.js                ← Express server + MongoDB connection
│   ├── migrate.js               ← Migrate users.json → MongoDB
│   ├── importCSV.js             ← Import CSV files → MongoDB
│   ├── checkSetup.js            ← Verify MongoDB setup
│   └── users.json               ← (Legacy) Original user data
│
├── src/
│   ├── context/
│   │   └── AuthContext.jsx      ← (No changes - uses API)
│   │
│   ├── pages/
│   │   ├── Login.jsx            ← Uses AuthContext
│   │   ├── Register.jsx         ← Uses AuthContext
│   │   └── Settings.jsx         ← ✨ Updated: MongoDB export
│   │
│   └── data/
│       ├── 17-18;19-20.csv      ← CSV data (imported to MongoDB)
│       ├── 20-21;21-22.csv      ← CSV data (imported to MongoDB)
│       └── DOR.csv              ← CSV data (imported to MongoDB)
│
├── .env                         ← ✨ Configuration (MongoDB URI, etc.)
├── vite.config.js               ← ✨ Updated proxy port → 3001
├── package.json                 ← ✨ Added scripts
│
├── MONGODB_SETUP.md             ← ✨ Complete setup guide
├── QUICKSTART.md                ← ✨ Quick start guide
├── SETUP_CHECKLIST.md           ← ✨ Step-by-step checklist
├── IMPLEMENTATION_SUMMARY.md    ← ✨ Technical summary
└── ARCHITECTURE.md              ← ✨ This file
```

## Technology Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **express-session** - Session management
- **express-validator** - Input validation
- **nodemailer** - Email sending (password reset)

### Database
- **MongoDB** - NoSQL database
  - Collections: `users`, `yeardatas`
  - Indexes: email (users), year (yeardatas)

## API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/register` | Create new user | No |
| POST | `/api/login` | Authenticate user | No |
| POST | `/api/logout` | End session | Yes |
| POST | `/api/forgot-password` | Request reset code | No |
| POST | `/api/verify-reset-code` | Verify reset code | No |
| POST | `/api/reset-password` | Reset password | No |
| GET | `/api/years` | List available years | No |
| GET | `/api/data/:year` | Get year data | No |
| GET | `/api/export/:year` | Export year data | No |
| POST | `/api/data/:year` | Upload year data | Admin* |
| DELETE | `/api/data/:year` | Delete year data | Admin* |
| GET | `/api/health` | Health check | No |

*Admin endpoints currently don't check authentication - TODO for production

## Environment Variables

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/edu-retain

# Server Configuration
PORT=3001
NODE_ENV=development
SESSION_SECRET=change-in-production

# Client Configuration
CLIENT_URL=http://localhost:5173

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@edu-retain.com
```

## Development Workflow

1. **Start MongoDB**
   ```powershell
   net start MongoDB
   ```

2. **First time setup**
   ```powershell
   npm run migrate      # Migrate users
   npm run import-csv   # Import CSV data
   ```

3. **Verify setup**
   ```powershell
   npm run check-setup
   ```

4. **Start development**
   ```powershell
   npm run dev
   ```
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

## Security Layers

```
┌─────────────────────────────────────────┐
│         Frontend Validation             │
│  (Basic email/password format checks)   │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│      Backend Input Validation           │
│     (express-validator middleware)      │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│       MongoDB Schema Validation         │
│     (Mongoose schema constraints)       │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         Session Management              │
│      (express-session middleware)       │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│      TODO: Password Hashing             │
│          (bcrypt - not yet)             │
└─────────────────────────────────────────┘
```

## Production Deployment Checklist

- [ ] Hash passwords with bcrypt
- [ ] Use strong SESSION_SECRET
- [ ] Enable HTTPS/SSL
- [ ] Use MongoDB Atlas with SSL
- [ ] Add rate limiting
- [ ] Implement JWT tokens
- [ ] Add input sanitization
- [ ] Enable CORS whitelist (not *)
- [ ] Add request logging
- [ ] Implement CSRF protection
- [ ] Set up MongoDB backups
- [ ] Configure monitoring/alerts
- [ ] Add user roles/permissions
- [ ] Implement audit logging

## Key Design Decisions

1. **Mongoose ODM**: Chosen for schema validation and ease of use
2. **Express Sessions**: Simple session management for MVP
3. **Flexible YearData Schema**: Mixed type allows different CSV formats
4. **Fallback to Local Data**: Ensures backward compatibility
5. **Separate Auth/Data Routes**: Clean separation of concerns
6. **Migration Scripts**: Easy transition from JSON to MongoDB
7. **Plain Text Passwords**: ONLY for development - TODO for production

## Performance Considerations

- **Indexes**: Added on `email` (users) and `year` (yeardatas) for fast queries
- **Connection Pooling**: Mongoose handles automatically
- **Streaming**: Large files streamed to browser, not loaded in memory
- **CSV Parsing**: Simple implementation - can be optimized for large files

## Future Enhancements

- [ ] Add pagination for large datasets
- [ ] Implement caching layer (Redis)
- [ ] Add GraphQL API option
- [ ] Real-time updates with WebSockets
- [ ] File upload UI for admins
- [ ] Data visualization dashboard
- [ ] Automated backups
- [ ] Multi-tenancy support
- [ ] API versioning
- [ ] Swagger/OpenAPI documentation

---

For implementation details, see `IMPLEMENTATION_SUMMARY.md`
For setup instructions, see `SETUP_CHECKLIST.md`
For troubleshooting, see `MONGODB_SETUP.md`
