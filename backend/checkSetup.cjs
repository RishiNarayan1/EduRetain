const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User.cjs');
const YearData = require('./models/YearData.cjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/EDU_RETAIN';

async function checkSetup() {
    try {
        console.log('🔍 MongoDB Setup Checker\n');
        console.log('=' .repeat(50));

        // 1. Check MongoDB connection
        console.log('\n1. Checking MongoDB connection...');
        console.log(`   URI: ${MONGODB_URI}`);
        
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        
        console.log('   ✅ MongoDB connected successfully!');

        // 2. Check User collection
        console.log('\n2. Checking User collection...');
        const userCount = await User.countDocuments();
        console.log(`   Users in database: ${userCount}`);
        
        if (userCount > 0) {
            const sampleUser = await User.findOne({}, { email: 1, fullName: 1 });
            console.log(`   Sample user: ${sampleUser.email} (${sampleUser.fullName})`);
        } else {
            console.log('   ⚠️  No users found. Run: npm run migrate');
        }

        // 3. Check YearData collection
        console.log('\n3. Checking YearData collection...');
        const yearCount = await YearData.countDocuments();
        console.log(`   Year datasets in database: ${yearCount}`);
        
        if (yearCount > 0) {
            const years = await YearData.find({}, { year: 1, _id: 0 }).sort({ year: 1 });
            console.log(`   Available years: ${years.map(y => y.year).join(', ')}`);
            
            // Check data size for first year
            const firstYear = await YearData.findOne().sort({ year: 1 });
            const dataSize = Array.isArray(firstYear.data) ? firstYear.data.length : 'N/A';
            console.log(`   Sample data size (${firstYear.year}): ${dataSize} records`);
        } else {
            console.log('   ⚠️  No year data found. Run: npm run import-csv');
        }

        // 4. Check indexes
        console.log('\n4. Checking database indexes...');
        const userIndexes = await User.collection.getIndexes();
        const yearIndexes = await YearData.collection.getIndexes();
        console.log(`   User indexes: ${Object.keys(userIndexes).join(', ')}`);
        console.log(`   YearData indexes: ${Object.keys(yearIndexes).join(', ')}`);

        // 5. Environment check
        console.log('\n5. Checking environment variables...');
        const envVars = [
            'MONGODB_URI',
            'PORT',
            'SESSION_SECRET',
            'CLIENT_URL',
            'NODE_ENV'
        ];
        
        envVars.forEach(varName => {
            const value = process.env[varName];
            if (value) {
                const displayValue = varName.includes('SECRET') || varName.includes('PASSWORD') 
                    ? '***' 
                    : value;
                console.log(`   ✅ ${varName}: ${displayValue}`);
            } else {
                console.log(`   ⚠️  ${varName}: Not set`);
            }
        });

        // 6. Summary
        console.log('\n' + '='.repeat(50));
        console.log('📊 Setup Summary:\n');
        
        const status = [];
        status.push(userCount > 0 ? '✅ Users migrated' : '⚠️  Users need migration');
        status.push(yearCount > 0 ? '✅ Year data imported' : '⚠️  Year data needs import');
        status.push('✅ MongoDB connection working');
        
        status.forEach(s => console.log(`   ${s}`));
        
        console.log('\n💡 Next steps:');
        if (userCount === 0) {
            console.log('   1. Run: npm run migrate');
        }
        if (yearCount === 0) {
            console.log('   2. Run: npm run import-csv');
        }
        if (userCount > 0 && yearCount > 0) {
            console.log('   ✨ All set! Run: npm run dev');
        }

        console.log('\n' + '='.repeat(50));
        
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Setup check failed:', error.message);
        
        if (error.message.includes('ECONNREFUSED')) {
            console.log('\n💡 MongoDB is not running. Start it with:');
            console.log('   Windows: net start MongoDB');
            console.log('   Mac/Linux: sudo systemctl start mongod');
        } else if (error.message.includes('authentication failed')) {
            console.log('\n💡 Check your MongoDB credentials in .env');
        } else {
            console.log('\n💡 Check MONGODB_URI in .env file');
        }
        
        process.exit(1);
    }
}

checkSetup();
