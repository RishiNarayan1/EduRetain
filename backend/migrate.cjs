const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const User = require('./models/User.cjs');
const YearData = require('./models/YearData.cjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/EDU_RETAIN';

// Sample data structure - you can modify this based on your CSV files
const sampleYearData = {
    '2017-18': [],
    '2019-20': [],
    '2020-21': [],
    '2021-22': []
};

async function migrateUsers() {
    console.log('Migrating users from users.json...');
    
    const usersPath = path.join(__dirname, 'users.json');
    if (!fs.existsSync(usersPath)) {
        console.log('No users.json file found. Skipping user migration.');
        return;
    }

    const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    
    for (const userData of usersData) {
        try {
            const existingUser = await User.findOne({ email: userData.email });
            if (!existingUser) {
                await User.create({
                    email: userData.email,
                    password: userData.password, // In production, hash this!
                    fullName: userData.fullName,
                    resetCode: userData.resetCode || null,
                    resetCodeExpiry: userData.resetCodeExpiry || null
                });
                console.log(`✓ Migrated user: ${userData.email}`);
            } else {
                console.log(`- User already exists: ${userData.email}`);
            }
        } catch (error) {
            console.error(`✗ Error migrating user ${userData.email}:`, error.message);
        }
    }
}

async function migrateYearData() {
    console.log('\nMigrating year data...');
    
    // You can add logic here to parse your CSV files
    // For now, we'll create placeholder entries
    
    for (const [year, data] of Object.entries(sampleYearData)) {
        try {
            const existingData = await YearData.findOne({ year });
            if (!existingData) {
                await YearData.create({
                    year,
                    data: data.length > 0 ? data : { message: 'Placeholder data - import your CSV here' },
                    metadata: {
                        uploadedAt: new Date(),
                        uploadedBy: 'migration-script',
                        description: `Data for academic year ${year}`
                    }
                });
                console.log(`✓ Created year data: ${year}`);
            } else {
                console.log(`- Year data already exists: ${year}`);
            }
        } catch (error) {
            console.error(`✗ Error migrating year ${year}:`, error.message);
        }
    }
}

async function main() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        await migrateUsers();
        await migrateYearData();

        console.log('\n✅ Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

main();
