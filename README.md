# Edu-Retain - Education Retention Analytics Platform

A comprehensive education analytics platform for tracking and analyzing student retention data across different states and years, now powered by MongoDB for scalable data management and user authentication.

## ✨ Features

- 📊 **Analytics Dashboard** - Visualize student retention trends
- 🗺️ **Geographic Heatmaps** - State-wise performance visualization
- 👥 **Gender Disparity Analysis** - Track gender-based retention gaps
- 📈 **School Performance Metrics** - Compare different education levels
- 🔐 **User Authentication** - Secure login/register with MongoDB
- 💾 **Data Export** - Export year-specific data in JSON/CSV formats
- 🌐 **Multi-language Support** - English, Hindi, Telugu
- 🎨 **Dark/Light Mode** - Customizable themes
- 🤖 **AI Policy Assistant** - Powered by Google Gemini

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd edu-retain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   
   **Option A: Local MongoDB (Windows)**
   ```powershell
   # Download from https://www.mongodb.com/try/download/community
   # Start MongoDB service
   net start MongoDB
   ```
   
   **Option B: MongoDB Atlas (Cloud)**
   - Create free account at https://www.mongodb.com/cloud/atlas
   - Create cluster and get connection string

4. **Configure environment variables**
   
   The `.env` file is already created. Update if needed:
   ```env
   MONGODB_URI=mongodb://localhost:27017/edu-retain
   PORT=3001
   SESSION_SECRET=your-secret-key-change-in-production
   CLIENT_URL=http://localhost:5173
   ```

5. **Migrate existing data**
   ```bash
   npm run migrate      # Migrate users to MongoDB
   npm run import-csv   # Import CSV data to MongoDB
   ```

6. **Verify setup**
   ```bash
   npm run check-setup
   ```

7. **Start the application**
   ```bash
   npm run dev
   ```
   
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

## 📁 Project Structure

```
edu-retain/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── server.js        # Express server
│   ├── migrate.js       # Data migration script
│   ├── importCSV.js     # CSV import script
│   └── checkSetup.js    # Setup verification
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── context/         # React contexts
│   ├── data/            # CSV data files
│   └── utils/           # Utility functions
└── docs/                # Documentation
```

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start frontend + backend in development mode |
| `npm run server` | Start backend server only |
| `npm run vite-only` | Start frontend only |
| `npm run migrate` | Migrate users from JSON to MongoDB |
| `npm run import-csv` | Import CSV data to MongoDB |
| `npm run check-setup` | Verify MongoDB setup |
| `npm run build` | Build for production |

## 📚 Documentation

- **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** - Step-by-step setup guide
- **[QUICKSTART.md](QUICKSTART.md)** - Quick start instructions
- **[MONGODB_SETUP.md](MONGODB_SETUP.md)** - Complete MongoDB setup guide
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture diagrams
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Technical implementation details

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user
- `POST /api/forgot-password` - Request password reset
- `POST /api/reset-password` - Reset password

### Data Management
- `GET /api/years` - List available years
- `GET /api/data/:year` - Get data for specific year
- `GET /api/export/:year?format=json` - Export as JSON
- `GET /api/export/:year?format=csv` - Export as CSV
- `POST /api/data/:year` - Upload year data (admin)

## 🔐 Security Notes

⚠️ **Current Implementation (Development Only)**
- Passwords stored in plain text
- Basic session management
- No rate limiting

✅ **Before Production**
- Implement bcrypt password hashing
- Use strong SESSION_SECRET
- Enable HTTPS/SSL
- Add rate limiting
- Implement JWT tokens
- See `MONGODB_SETUP.md` for security implementation

## 🧪 Testing

### Test API Endpoints

```powershell
# Health check
curl http://localhost:3001/api/health

# Register user
curl -X POST http://localhost:3001/api/register `
  -H "Content-Type: application/json" `
  -d '{"email":"test@test.com","password":"test123","fullName":"Test User"}'

# Login
curl -X POST http://localhost:3001/api/login `
  -H "Content-Type: application/json" `
  -d '{"email":"test@test.com","password":"test123"}'

# Export data
curl "http://localhost:3001/api/export/2021-22?format=json" --output data.json
```

## 🌟 Key Features Implementation

### MongoDB Integration
- User authentication stored in MongoDB
- Year-based data export from MongoDB
- Automatic migration from JSON files
- CSV import functionality

### Data Export
- Select year from Settings page
- Download data as JSON or CSV
- Data fetched from MongoDB database
- Fallback to local data if not in database

### Authentication
- Secure user registration
- Login with session management
- Password reset functionality
- User profile management

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB service
```powershell
net start MongoDB
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3001
```
**Solution**: Kill the process or change PORT in `.env`
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process
```

### Data Not Found
**Solution**: Import CSV data
```powershell
npm run import-csv
```

For more troubleshooting, see [MONGODB_SETUP.md](MONGODB_SETUP.md)

## 🚀 Deployment

### MongoDB Atlas Setup
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Add database user
4. Whitelist IP addresses
5. Get connection string
6. Update `MONGODB_URI` in `.env`

### Production Checklist
- [ ] Hash passwords with bcrypt
- [ ] Use strong SESSION_SECRET
- [ ] Enable HTTPS/SSL
- [ ] Use MongoDB Atlas
- [ ] Add rate limiting
- [ ] Configure CORS properly
- [ ] Set up backups
- [ ] Add monitoring

See [MONGODB_SETUP.md](MONGODB_SETUP.md) for detailed production setup.

## 🛣️ Roadmap

- [x] MongoDB integration
- [x] User authentication
- [x] Data export (JSON/CSV)
- [ ] Password hashing (bcrypt)
- [ ] Admin dashboard
- [ ] File upload UI
- [ ] Real-time analytics
- [ ] API rate limiting
- [ ] Role-based access control
- [ ] Automated backups

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## 📞 Support

For issues and questions:
1. Check the documentation in the `docs/` folder
2. Run `npm run check-setup` for diagnostics
3. See troubleshooting section in `MONGODB_SETUP.md`

## 🙏 Acknowledgments

- React + Vite for the frontend framework
- Express.js for the backend
- MongoDB for the database
- Tailwind CSS for styling
- Google Gemini for AI features

---

**Made with ❤️ for education analytics**
