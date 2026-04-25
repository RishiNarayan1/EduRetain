import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ShieldCheck, Lock, ArrowRight, GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ForgotPassword = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', code: '', newPassword: '', confirmPassword: '' });
    const [step, setStep] = useState('request'); // request | verify | reset | done
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
        setStatus('');
    };

    const parseResponse = async (response) => {
        const text = await response.text();
        let data = null;

        if (text) {
            try {
                data = JSON.parse(text);
            } catch {
                console.error('Failed to parse response:', text);
                if (response.ok) {
                    // Gracefully fall back to plain text when server returns non-JSON success bodies (e.g., proxy or HTML)
                    data = { message: text };
                } else {
                    throw new Error(text || 'Server error: Invalid response format');
                }
            }
        }

        if (!response.ok) {
            if (data && data.errors && Array.isArray(data.errors)) {
                const messages = data.errors.map(e => e.msg).join('. ');
                throw new Error(messages);
            }
            throw new Error((data && data.message) || `Request failed (${response.status})`);
        }

        return data;
    };

    const isPasswordStrong = (pwd) => {
        return (
            pwd.length >= 8 &&
            /[A-Z]/.test(pwd) &&
            /[a-z]/.test(pwd) &&
            /[0-9]/.test(pwd) &&
            /[^A-Za-z0-9]/.test(pwd)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setStatus('');

        try {
            if (step === 'request') {
                const response = await fetch('/api/forgot-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: form.email.trim() }),
                    credentials: 'include',
                });
                await parseResponse(response);
                setStep('verify');
                setStatus('Verification code sent. Check your email and enter the 6-digit code.');
            } else if (step === 'verify') {
                // Just verify the code without password reset
                const response = await fetch('/api/verify-reset-code', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: form.email.trim(),
                        code: form.code.trim(),
                    }),
                    credentials: 'include',
                });
                await parseResponse(response);
                // Store verified code for later use
                setStep('reset');
                setStatus('Code verified. Now set your new password.');
                setError(''); // Clear any previous errors
            } else if (step === 'reset') {
                if (form.newPassword !== form.confirmPassword) {
                    setError('Passwords do not match');
                    setIsLoading(false);
                    return;
                }
                const response = await fetch('/api/reset-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: form.email.trim(),
                        code: form.code.trim(),
                        newPassword: form.newPassword,
                    }),
                    credentials: 'include',
                });
                await parseResponse(response);
                setStep('done');
                setStatus('Password reset successful. You can now sign in.');
            }
        } catch (err) {
            setError(err.message || 'Request failed');
        } finally {
            setIsLoading(false);
        }
    };

    const canSubmit = step === 'request'
        ? form.email.trim().length > 0
        : step === 'verify'
        ? form.code.trim().length === 6
        : step === 'reset'
        ? isPasswordStrong(form.newPassword) && form.newPassword === form.confirmPassword
        : false;

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
                    {t('auth.forgotPassword') || 'Forgot Password'}
                </h1>
                <p className="text-text-secondary">
                    {t('auth.forgotPasswordSubtitle') || 'Enter your email to receive a verification code.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" autoComplete="on">
                {error && (
                    <div className="p-3 bg-danger/10 border border-danger/30 text-danger rounded-xl text-sm text-center">
                        {error}
                    </div>
                )}
                {status && (
                    <div className="p-3 bg-success/10 border border-success/30 text-success rounded-xl text-sm text-center">
                        {status}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary ml-1">
                        {t('auth.email') || 'Registered Email'}
                    </label>
                    <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                        <input
                            type="email"
                            name="email"
                            id="reset-email"
                            autoComplete="email"
                            inputMode="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            disabled={step === 'done'}
                            className="w-full bg-surface/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 focus:bg-surface/80 transition-all placeholder:text-white/20 disabled:opacity-60"
                            placeholder="name@example.com"
                        />
                    </div>
                </div>

                {step === 'verify' && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary ml-1">
                            Verification Code
                        </label>
                        <div className="relative group">
                            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                name="code"
                                id="reset-code"
                                inputMode="numeric"
                                pattern="[0-9]{6}"
                                autoComplete="one-time-code"
                                required
                                value={form.code}
                                onChange={handleChange}
                                className="w-full bg-surface/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 focus:bg-surface/80 transition-all placeholder:text-white/20"
                                placeholder="Enter 6-digit code"
                            />
                        </div>
                    </div>
                )}
{step === 'reset' && (
                    <>
                        {/* Hidden field to preserve the verified code */}
                        <input type="hidden" name="code" value={form.code} />
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary ml-1">
                                New Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    name="newPassword"
                                    id="reset-new-password"
                                    autoComplete="new-password"
                                    required
                                    value={form.newPassword}
                                    onChange={handleChange}
                                    className="w-full bg-surface/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 focus:bg-surface/80 transition-all placeholder:text-white/20"
                                    placeholder="Strong password"
                                />
                            </div>
                            <p className="text-xs text-text-secondary ml-1">
                                Use at least 8 characters with upper, lower, number, and symbol.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary ml-1">
                                Confirm Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="reset-confirm-password"
                                    autoComplete="new-password"
                                    required
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full bg-surface/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 focus:bg-surface/80 transition-all placeholder:text-white/20"
                                    placeholder="Confirm password"
                                />
                            </div>
                            {form.newPassword && form.confirmPassword && form.newPassword !== form.confirmPassword && (
                                <p className="text-xs text-danger ml-1">
                                    Passwords do not match
                                </p>
                            )}
                        </div>
                    </>
                )}

                <button
                    type="submit"
                    disabled={isLoading || !canSubmit || step === 'done'}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : step === 'request' ? (
                        <>
                            Send Code
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    ) : step === 'verify' ? (
                        <>
                            Verify Code
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    ) : step === 'reset' ? (
                        <>
                            Reset Password
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    ) : (
                        'Done'
                    )}
                </button>
            </form>

            <div className="mt-8 text-center space-y-2">
                {step === 'done' && (
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="text-primary font-medium hover:text-primary/80 transition-colors"
                    >
                        Back to sign in
                    </button>
                )}
                <p className="text-text-secondary text-sm">
                    Remembered your password?{' '}
                    <Link to="/login" className="text-primary font-medium hover:text-primary/80 transition-colors ml-1">
                        {t('auth.loginButton') || 'Sign In'}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
