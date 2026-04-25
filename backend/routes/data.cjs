const express = require('express');
const router = express.Router();
const YearData = require('../models/YearData.cjs');

// Get all available years
router.get('/years', async (req, res) => {
    try {
        const years = await YearData.find({}, { year: 1, _id: 0 }).sort({ year: 1 });
        const yearList = years.map(y => y.year);
        res.json({ years: yearList });
    } catch (error) {
        console.error('Error fetching years:', error);
        res.status(500).json({ message: 'Error fetching available years' });
    }
});

// Get data for a specific year
router.get('/data/:year', async (req, res) => {
    try {
        const { year } = req.params;
        
        const yearData = await YearData.findOne({ year });
        
        if (!yearData) {
            return res.status(404).json({ message: `Data not found for year ${year}` });
        }

        res.json({
            year: yearData.year,
            data: yearData.data,
            metadata: yearData.metadata
        });
    } catch (error) {
        console.error('Error fetching year data:', error);
        res.status(500).json({ message: 'Error fetching year data' });
    }
});

// Upload/update data for a specific year (admin endpoint)
router.post('/data/:year', async (req, res) => {
    try {
        const { year } = req.params;
        const { data, description } = req.body;

        if (!data) {
            return res.status(400).json({ message: 'Data is required' });
        }

        // Check if year data already exists
        let yearData = await YearData.findOne({ year });

        if (yearData) {
            // Update existing
            yearData.data = data;
            yearData.metadata.description = description || yearData.metadata.description;
            yearData.metadata.uploadedAt = Date.now();
        } else {
            // Create new
            yearData = new YearData({
                year,
                data,
                metadata: {
                    description: description || '',
                    uploadedAt: Date.now()
                }
            });
        }

        await yearData.save();

        res.json({
            message: `Data for year ${year} ${yearData.isNew ? 'created' : 'updated'} successfully`,
            year: yearData.year
        });
    } catch (error) {
        console.error('Error uploading year data:', error);
        res.status(500).json({ message: 'Error uploading year data' });
    }
});

// Delete data for a specific year (admin endpoint)
router.delete('/data/:year', async (req, res) => {
    try {
        const { year } = req.params;

        const result = await YearData.deleteOne({ year });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: `Data not found for year ${year}` });
        }

        res.json({ message: `Data for year ${year} deleted successfully` });
    } catch (error) {
        console.error('Error deleting year data:', error);
        res.status(500).json({ message: 'Error deleting year data' });
    }
});

// Export data for a specific year (for download)
router.get('/export/:year', async (req, res) => {
    try {
        const { year } = req.params;
        const { format = 'json' } = req.query;

        const yearData = await YearData.findOne({ year });

        if (!yearData) {
            return res.status(404).json({ message: `Data not found for year ${year}` });
        }

        if (format === 'json') {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Disposition', `attachment; filename="edu-retain-${year}.json"`);
            res.json({
                year: yearData.year,
                data: yearData.data,
                exportedAt: new Date().toISOString()
            });
        } else if (format === 'csv') {
            // Convert to CSV format
            const csvData = convertToCSV(yearData.data);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename="edu-retain-${year}.csv"`);
            res.send(csvData);
        } else {
            res.status(400).json({ message: 'Invalid format. Supported formats: json, csv' });
        }
    } catch (error) {
        console.error('Error exporting year data:', error);
        res.status(500).json({ message: 'Error exporting year data' });
    }
});

// Helper function to convert data to CSV
function convertToCSV(data) {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return '';
    }

    // Get headers from first object
    const headers = Object.keys(data[0]);
    const csvRows = [];

    // Add header row
    csvRows.push(headers.join(','));

    // Add data rows
    for (const row of data) {
        const values = headers.map(header => {
            const value = row[header];
            // Escape values that contain commas or quotes
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        });
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
}

module.exports = router;
