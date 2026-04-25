const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const YearData = require('./models/YearData.cjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/EDU_RETAIN';

// Helper function to parse CSV files
function parseCSV(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const row = {};
        
        headers.forEach((header, index) => {
            const value = values[index];
            // Try to convert to number if possible
            row[header] = isNaN(value) ? value : parseFloat(value);
        });
        
        data.push(row);
    }
    
    return data;
}

async function importCSVData() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Import the multi-year CSV file (17-18;19-20.csv)
        const file1Path = path.join(__dirname, '../src/data/17-18;19-20.csv');
        if (fs.existsSync(file1Path)) {
            console.log('\nProcessing: 17-18;19-20.csv');
            const data = parseCSV(file1Path);
            console.log(`  Parsed ${data.length} rows`);
            
            // Extract data for each year
            const years = ['2017-18', '2018-19', '2019-20'];
            for (const year of years) {
                const yearData = data.map(row => {
                    const newRow = { Location: row.Location };
                    Object.keys(row).forEach(key => {
                        if (key.startsWith(year)) {
                            const newKey = key.replace(`${year} `, '');
                            newRow[newKey] = row[key];
                        }
                    });
                    return newRow;
                });

                try {
                    const existingData = await YearData.findOne({ year });
                    if (existingData) {
                        console.log(`  Updating existing data for year: ${year}`);
                        existingData.data = yearData;
                        existingData.metadata.uploadedAt = new Date();
                        existingData.metadata.description = `Data imported from 17-18;19-20.csv`;
                        await existingData.save();
                    } else {
                        console.log(`  Creating new data for year: ${year}`);
                        await YearData.create({
                            year,
                            data: yearData,
                            metadata: {
                                uploadedAt: new Date(),
                                uploadedBy: 'csv-import-script',
                                description: `Data imported from 17-18;19-20.csv`
                            }
                        });
                    }
                    console.log(`  ✓ Successfully imported data for ${year}`);
                } catch (error) {
                    console.error(`  ✗ Error importing ${year}:`, error.message);
                }
            }
        }

        // Import the multi-year CSV file (20-21;21-22.csv)
        const file2Path = path.join(__dirname, '../src/data/20-21;21-22.csv');
        if (fs.existsSync(file2Path)) {
            console.log('\nProcessing: 20-21;21-22.csv');
            const data = parseCSV(file2Path);
            console.log(`  Parsed ${data.length} rows`);
            
            // Extract data for each year
            const years = ['2020-21', '2021-22'];
            for (const year of years) {
                const yearData = data.map(row => {
                    const newRow = { Location: row.Location };
                    Object.keys(row).forEach(key => {
                        if (key.startsWith(year)) {
                            const newKey = key.replace(`${year} `, '');
                            newRow[newKey] = row[key];
                        }
                    });
                    return newRow;
                });

                try {
                    const existingData = await YearData.findOne({ year });
                    if (existingData) {
                        console.log(`  Updating existing data for year: ${year}`);
                        existingData.data = yearData;
                        existingData.metadata.uploadedAt = new Date();
                        existingData.metadata.description = `Data imported from 20-21;21-22.csv`;
                        await existingData.save();
                    } else {
                        console.log(`  Creating new data for year: ${year}`);
                        await YearData.create({
                            year,
                            data: yearData,
                            metadata: {
                                uploadedAt: new Date(),
                                uploadedBy: 'csv-import-script',
                                description: `Data imported from 20-21;21-22.csv`
                            }
                        });
                    }
                    console.log(`  ✓ Successfully imported data for ${year}`);
                } catch (error) {
                    console.error(`  ✗ Error importing ${year}:`, error.message);
                }
            }
        }

        // Import DOR.csv
        const dorPath = path.join(__dirname, '../src/data/DOR.csv');
        if (fs.existsSync(dorPath)) {
            console.log('\nProcessing: DOR.csv');
            const data = parseCSV(dorPath);
            console.log(`  Parsed ${data.length} rows`);

            try {
                const existingData = await YearData.findOne({ year: 'DOR' });
                if (existingData) {
                    console.log(`  Updating existing data for year: DOR`);
                    existingData.data = data;
                    existingData.metadata.uploadedAt = new Date();
                    existingData.metadata.description = `Data imported from DOR.csv`;
                    await existingData.save();
                } else {
                    console.log(`  Creating new data for year: DOR`);
                    await YearData.create({
                        year: 'DOR',
                        data,
                        metadata: {
                            uploadedAt: new Date(),
                            uploadedBy: 'csv-import-script',
                            description: `Data imported from DOR.csv`
                        }
                    });
                }
                console.log(`  ✓ Successfully imported data for DOR`);
            } catch (error) {
                console.error(`  ✗ Error importing DOR:`, error.message);
            }
        }

        console.log('\n✅ CSV import completed!');
        
        // Show summary
        const allYears = await YearData.find({}, { year: 1, 'metadata.uploadedAt': 1 });
        console.log('\nAvailable years in database:');
        allYears.forEach(y => {
            console.log(`  - ${y.year} (uploaded: ${y.metadata.uploadedAt.toISOString()})`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Import failed:', error);
        process.exit(1);
    }
}

importCSVData();
