import React from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const UserProfile = () => {
    const { user } = useAuth();
    const { t } = useLanguage();

    if (!user) return null;

    return (
        <div className="flex items-center gap-3 bg-surface/50 backdrop-blur-md border border-white/10 p-2 pr-4 rounded-full shadow-sm">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
                <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-white leading-tight">
                    {user.fullName || user.name || t('common.user')}
                </span>
                <span className="text-xs text-text-secondary leading-tight">
                    {user.email || 'user@example.com'}
                </span>
            </div>
        </div>
    );
};

export default UserProfile;
