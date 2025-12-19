import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
    const { t } = useLanguage();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            await login(formData.email, formData.password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="text-center mb-8">
                <div className="inline-flex p-3 bg-primary/20 rounded-xl mb-4">
                    <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-primary mb-6 tracking-wide uppercase opacity-90">
                     {t('common.appName') || 'EduRetain'}
                </h2>
                <h1 className="text-3xl font-display font-bold text-white mb-2">
                    {t('auth.welcomeBack') || 'Welcome Back'}
                </h1>
                <p className="text-text-secondary">
                    {t('auth.loginSubtitle') || 'Sign in to access your dashboard'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" autoComplete="on">
                {error && (
                    <div className="p-3 bg-danger/10 border border-danger/30 text-danger rounded-xl text-sm text-center">
                        {error}
                    </div>
                )}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary ml-1">
                        {t('auth.email') || 'Email Address'}
                    </label>
                    <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                        <input
                            type="email"
                            name="email"
                            id="login-email"
                            autoComplete="email"
                            inputMode="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-surface/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 focus:bg-surface/80 transition-all placeholder:text-white/20"
                            placeholder="name@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between ml-1">
                        <label className="text-sm font-medium text-text-secondary">
                            {t('auth.password') || 'Password'}
                        </label>
                        <Link to="/forgot-password" className="text-xs text-primary hover:text-primary/80 transition-colors">
                            {t('auth.forgotPassword') || 'Forgot password?'}
                        </Link>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                        <input
                            type="password"
                            name="password"
                            id="login-password"
                            autoComplete="current-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-surface/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 focus:bg-surface/80 transition-all placeholder:text-white/20"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            {t('auth.loginButton') || 'Sign In'}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-text-secondary text-sm">
                    {t('auth.noAccount') || "Don't have an account?"}{' '}
                    <Link to="/register" className="text-primary font-medium hover:text-primary/80 transition-colors ml-1">
                        {t('auth.registerLink') || 'Create account'}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
