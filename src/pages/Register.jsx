import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Register = () => {
    const { t } = useLanguage();
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const passwordStrength = useMemo(() => {
        const pwd = formData.password || '';
        let score = 0;
        if (pwd.length >= 12) score += 1;
        if (/[A-Z]/.test(pwd)) score += 1;
        if (/[a-z]/.test(pwd)) score += 1;
        if (/[0-9]/.test(pwd)) score += 1;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
        const levels = ['Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
        return {
            score,
            label: levels[Math.max(0, Math.min(score - 1, levels.length - 1))] || 'Weak',
            percent: (score / 5) * 100,
        };
    }, [formData.password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        if (passwordStrength.score < 3) {
            setError('Please choose a stronger password (aim for Good or higher).');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await register({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
            });
            alert('Registration successful! Please login with your credentials.');
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="text-center mb-8">
                <div className="inline-flex p-3 bg-secondary/20 rounded-xl mb-4">
                    <GraduationCap className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="text-xl font-bold text-secondary mb-6 tracking-wide uppercase opacity-90">
                     {t('common.appName') || 'EduRetain'}
                </h2>
                <h1 className="text-3xl font-display font-bold text-white mb-2">
                    {t('auth.createAccount') || 'Create Account'}
                </h1>
                <p className="text-text-secondary">
                    {t('auth.registerSubtitle') || 'Join EduRetain to start tracking'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
                {error && (
                    <div className="p-3 bg-danger/10 border border-danger/30 text-danger rounded-xl text-sm text-center">
                        {error}
                    </div>
                )}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary ml-1">
                        {t('auth.fullName') || 'Full Name'}
                    </label>
                    <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-secondary transition-colors" />
                        <input
                            type="text"
                            name="fullName"
                            id="register-fullName"
                            autoComplete="name"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full bg-surface/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-secondary/50 focus:bg-surface/80 transition-all placeholder:text-white/20"
                            placeholder="John Doe"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary ml-1">
                        {t('auth.email') || 'Email Address'}
                    </label>
                    <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-secondary transition-colors" />
                        <input
                            type="email"
                            name="email"
                            id="register-email"
                            autoComplete="email"
                            inputMode="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-surface/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-secondary/50 focus:bg-surface/80 transition-all placeholder:text-white/20"
                            placeholder="name@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary ml-1">
                        {t('auth.password') || 'Password'}
                    </label>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-secondary transition-colors" />
                        <input
                            type="password"
                            name="password"
                            id="register-password"
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-surface/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-secondary/50 focus:bg-surface/80 transition-all placeholder:text-white/20"
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-text-secondary">
                            <span>Strength: {passwordStrength.label}</span>
                            <span>{passwordStrength.percent.toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 transition-all"
                                style={{ width: `${passwordStrength.percent}%` }}
                            />
                        </div>
                        <p className="text-xs text-text-secondary">Use 12+ chars, mix upper/lower, numbers, and symbols.</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary ml-1">
                        {t('auth.confirmPassword') || 'Confirm Password'}
                    </label>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-secondary transition-colors" />
                        <input
                            type="password"
                            name="confirmPassword"
                            id="register-confirmPassword"
                            autoComplete="new-password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-surface/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-secondary/50 focus:bg-surface/80 transition-all placeholder:text-white/20"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-secondary/25 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            {t('auth.registerButton') || 'Create Account'}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-text-secondary text-sm">
                    {t('auth.hasAccount') || "Already have an account?"}{' '}
                    <Link to="/login" className="text-secondary font-medium hover:text-secondary/80 transition-colors ml-1">
                        {t('auth.loginLink') || 'Sign In'}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
