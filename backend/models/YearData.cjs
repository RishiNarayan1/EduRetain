const mongoose = require('mongoose');

const yearDataSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    metadata: {
        uploadedAt: {
            type: Date,
            default: Date.now
        },
        uploadedBy: {
            type: String,
            default: 'system'
        },
        description: {
            type: String,
            default: ''
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('YearData', yearDataSchema);
