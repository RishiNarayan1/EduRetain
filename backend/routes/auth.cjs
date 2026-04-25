const express = require('express');
const router = express.Router();
const User = require('../models/User.cjs');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Configure email transporter (optional - for password reset)
const createEmailTransporter = () => {
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT || 587,
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }
    return null;
};

// Helper to generate reset code
const generateResetCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Register endpoint
router.post('/register', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('fullName').trim().notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation error', errors: errors.array() });
        }

        const { email, password, fullName } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Create new user (in production, hash the password!)
        const newUser = new User({
            email,
            password, // TODO: Hash password using bcrypt
            fullName
        });

        await newUser.save();

        // Don't send password back
        const userResponse = {
            id: newUser._id,
            email: newUser.email,
            fullName: newUser.fullName
        };

        res.status(201).json(userResponse);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login endpoint
router.post('/login', [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation error', errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password (in production, use bcrypt.compare!)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Store user in session
        req.session.userId = user._id;

        // Don't send password back
        const userResponse = {
            id: user._id,
            email: user.email,
            fullName: user.fullName
        };

        res.json(userResponse);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Logout endpoint
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

// Forgot password endpoint
router.post('/forgot-password', [
    body('email').isEmail().normalizeEmail()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation error', errors: errors.array() });
        }

        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            // Don't reveal if email exists
            return res.json({ message: 'If the email exists, a reset code has been sent' });
        }

        // Generate reset code
        const resetCode = generateResetCode();
        const resetCodeExpiry = Date.now() + 3600000; // 1 hour

        user.resetCode = resetCode;
        user.resetCodeExpiry = resetCodeExpiry;
        await user.save();

        // Try to send email
        const transporter = createEmailTransporter();
        if (transporter) {
            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_FROM || 'noreply@edu-retain.com',
                    to: email,
                    subject: 'Password Reset Code - Edu-Retain',
                    text: `Your password reset code is: ${resetCode}\n\nThis code will expire in 1 hour.`,
                    html: `<p>Your password reset code is: <strong>${resetCode}</strong></p><p>This code will expire in 1 hour.</p>`
                });
            } catch (emailError) {
                console.error('Email sending error:', emailError);
            }
        } else {
            console.log('Email not configured. Reset code:', resetCode);
        }

        res.json({ message: 'If the email exists, a reset code has been sent' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Verify reset code endpoint
router.post('/verify-reset-code', [
    body('email').isEmail().normalizeEmail(),
    body('code').notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation error', errors: errors.array() });
        }

        const { email, code } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.resetCode !== code || user.resetCodeExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired reset code' });
        }

        res.json({ message: 'Code verified successfully', valid: true });
    } catch (error) {
        console.error('Verify reset code error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reset password endpoint
router.post('/reset-password', [
    body('email').isEmail().normalizeEmail(),
    body('code').notEmpty(),
    body('newPassword').isLength({ min: 6 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation error', errors: errors.array() });
        }

        const { email, code, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.resetCode !== code || user.resetCodeExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired reset code' });
        }

        // Update password (TODO: hash in production!)
        user.password = newPassword;
        user.resetCode = null;
        user.resetCodeExpiry = null;
        await user.save();

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
