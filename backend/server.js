import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import crypto from 'crypto';
import { Readable } from 'stream';
import { body, validationResult } from 'express-validator';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const DB_FILE = path.join(__dirname, 'users.json');
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-secret-change-me';
const RESET_TTL_MS = 15 * 60 * 1000; // 15 minutes
const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE,
    MAIL_FROM = 'no-reply@edu-retain.local',
} = process.env;
const MAIL_ENABLED = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);
const mailTransport = MAIL_ENABLED
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: SMTP_SECURE === 'true',
        auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
    : nodemailer.createTransport({ jsonTransport: true });

if (!MAIL_ENABLED) {
    console.warn('SMTP not configured. Set SMTP_HOST/SMTP_USER/SMTP_PASS in backend/.env to send real emails.');
}

const isPasswordStrong = (pwd = '') => {
    return (
        pwd.length >= 8 &&
        /[A-Z]/.test(pwd) &&
        /[a-z]/.test(pwd) &&
        /[0-9]/.test(pwd) &&
        /[^A-Za-z0-9]/.test(pwd)
    );
};

const sendResetCodeEmail = async (to, code) => {
    const ttlMinutes = Math.round(RESET_TTL_MS / (60 * 1000));
    try {
        const info = await mailTransport.sendMail({
            from: MAIL_FROM,
            to,
            subject: 'Your password reset code',
            text: `Your verification code is ${code}. It expires in ${ttlMinutes} minutes.`,
        });

        if (!MAIL_ENABLED) {
            console.log('Password reset code (dev):', code);
            console.log('Email payload (json transport):', info.message || info);
            console.warn('SMTP not configured. Set SMTP_HOST/SMTP_USER/SMTP_PASS to send real emails.');
        }
    } catch (err) {
        console.error('Failed to send reset email:', err);
        throw new Error('Email delivery failed. Please try again.');
    }
};

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Session middleware (in-memory store for dev)
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false, // set true when behind HTTPS
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    name: 'edu.sid',
}));

// Request logging with duration
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(JSON.stringify({
            time: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            durationMs: duration,
        }));
    });
    next();
});

// Initialize DB file
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// Helper to read users
const readUsers = () => {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error('Error reading DB:', err);
        return [];
    }
};

// Helper to write users
const writeUsers = (users) => {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
    } catch (err) {
        console.error('Error writing DB:', err);
    }
};

const registerValidators = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('password').custom((value) => isPasswordStrong(value)).withMessage('Password must include upper, lower, number, and symbol'),
    body('fullName').optional().isString(),
    body('name').optional().isString(),
];

const loginValidators = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

const handleValidation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }
    return null;
};

app.post('/api/register', registerValidators, (req, res) => {
    const validationError = handleValidation(req, res);
    if (validationError) return;

    try {
        console.log('Received register request');
        console.log('Body:', req.body);

        const { email, password, fullName, name } = req.body;

        const normalizedName = fullName || name || '';

        console.log('Reading users...');
        const users = readUsers();
        console.log('Users count:', users.length);

        if (!Array.isArray(users)) {
            console.error('Users DB is not an array:', users);
            return res.status(500).json({ message: 'Database corruption detected' });
        }

        if (users.find(u => u.email === email)) {
            console.warn('Email already registered:', email);
            return res.status(400).json({ message: 'Email already registered' });
        }

        const newUser = {
            id: Date.now(),
            email,
            password,
            fullName: normalizedName,
            name: normalizedName,
        };
        console.log('Adding new user:', newUser.id);

        users.push(newUser);
        writeUsers(users);
        console.log('User saved successfully');

        const { password: _, ...userWithoutPass } = newUser;
        res.status(201).json(userWithoutPass);
    } catch (error) {
        console.error('CRITICAL Register error:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            details: error.message,
            stack: error.stack
        });
    }
});

app.post('/api/login', loginValidators, (req, res) => {
    const validationError = handleValidation(req, res);
    if (validationError) return;

    try {
        console.log('Received login request');
        console.log('Body:', req.body);

        const { email, password } = req.body;
        const users = readUsers();

        if (!Array.isArray(users)) {
            return res.status(500).json({ message: 'Database error' });
        }

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            console.log('Login successful:', email);
            req.session.userId = user.id;
            req.session.email = user.email;
            const { password: _, resetToken, resetTokenExpiry, resetCode, resetCodeExpiry, ...userWithoutPass } = user;
            const normalizedName = user.fullName || user.name || '';
            res.json({
                ...userWithoutPass,
                fullName: normalizedName,
                name: normalizedName,
            });
        } else {
            console.warn('Login failed for:', email);
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('CRITICAL Login error:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            details: error.message
        });
    }
});

app.post('/api/password-reset/request', [body('email').isEmail().withMessage('Valid email is required')], async (req, res) => {
    const validationError = handleValidation(req, res);
    if (validationError) return;

    try {
        const { email } = req.body;
        const users = readUsers();
        if (!Array.isArray(users)) {
            return res.status(500).json({ message: 'Database error' });
        }

        const idx = users.findIndex(u => u.email === email);
        if (idx === -1) {
            return res.json({ message: 'If that account exists, a verification code has been sent.' });
        }

        const code = crypto.randomInt(100000, 1000000).toString();
        const expiresAt = Date.now() + RESET_TTL_MS;
        users[idx].resetCode = code;
        users[idx].resetCodeExpiry = expiresAt;
        writeUsers(users);

        await sendResetCodeEmail(email, code);

        const payload = { message: 'If that account exists, a verification code has been sent.' };
        if (!MAIL_ENABLED) {
            payload.code = code;
            payload.devNote = 'SMTP not configured; code returned for development only.';
        }

        res.json(payload);
    } catch (error) {
        console.error('CRITICAL Reset request error:', error);
        res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
});

app.post('/api/password-reset/verify', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('code').matches(/^[0-9]{6}$/).withMessage('Verification code must be 6 digits'),
], (req, res) => {
    const validationError = handleValidation(req, res);
    if (validationError) return;

    try {
        const { email, code } = req.body;
        const users = readUsers();
        if (!Array.isArray(users)) {
            return res.status(500).json({ message: 'Database error' });
        }

        const user = users.find(u =>
            u.email === email &&
            u.resetCode === code &&
            u.resetCodeExpiry &&
            u.resetCodeExpiry > Date.now()
        );

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification code' });
        }

        res.json({ message: 'Code verified successfully' });
    } catch (error) {
        console.error('CRITICAL Reset verify error:', error);
        res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
});

app.post('/api/password-reset/confirm', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('code').matches(/^[0-9]{6}$/).withMessage('Verification code must be 6 digits'),
    body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('newPassword').custom((value) => isPasswordStrong(value)).withMessage('Password must include upper, lower, number, and symbol'),
], (req, res) => {
    const validationError = handleValidation(req, res);
    if (validationError) return;

    try {
        const { email, code, newPassword } = req.body;
        const users = readUsers();
        if (!Array.isArray(users)) {
            return res.status(500).json({ message: 'Database error' });
        }

        const idx = users.findIndex(u =>
            u.email === email &&
            u.resetCode === code &&
            u.resetCodeExpiry &&
            u.resetCodeExpiry > Date.now()
        );
        if (idx === -1) {
            return res.status(400).json({ message: 'Invalid or expired verification code' });
        }

        users[idx].password = newPassword;
        delete users[idx].resetCode;
        delete users[idx].resetCodeExpiry;
        writeUsers(users);

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('CRITICAL Reset confirm error:', error);
        res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('edu.sid');
        res.json({ message: 'Logged out' });
    });
});

app.get('/api/users/export', (req, res) => {
    try {
        const users = readUsers();
        if (!Array.isArray(users)) {
            return res.status(500).json({ message: 'Database error' });
        }

        const sanitized = users.map(({ password, resetToken, resetTokenExpiry, resetCode, resetCodeExpiry, ...rest }) => rest);
        const format = (req.query.format || 'json').toLowerCase();

        if (format === 'csv') {
            const headers = Object.keys(sanitized[0] || { id: '', email: '', fullName: '', name: '' });
            const rows = [headers.join(',')];
            sanitized.forEach(u => {
                rows.push(headers.map(h => JSON.stringify(u[h] ?? '')).join(','));
            });
            const csvStream = Readable.from(rows.join('\n'));
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="users.csv"');
            return csvStream.pipe(res);
        }

        const jsonStream = Readable.from(JSON.stringify(sanitized, null, 2));
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename="users.json"');
        jsonStream.pipe(res);
    } catch (error) {
        console.error('CRITICAL Export error:', error);
        res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
