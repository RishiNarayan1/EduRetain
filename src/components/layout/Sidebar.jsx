import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PieChart, Sliders, Settings, LogOut, GraduationCap } from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Sidebar = () => {
    const { t } = useLanguage();

    const navItems = [
        { icon: LayoutDashboard, labelKey: 'nav.dashboard', path: '/' },
        { icon: PieChart, labelKey: 'nav.analytics', path: '/analytics' },
        { icon: Sliders, labelKey: 'nav.simulator', path: '/simulator' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 glass-panel flex flex-col z-50">
            <div className="p-6 flex items-center gap-3 border-b border-white/10">
                <div className="p-2 bg-primary/20 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-xl font-display font-bold text-gradient">{t('common.appName')}</h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                                isActive
                                    ? "bg-primary/20 text-white shadow-lg border border-primary/20"
                                    : "text-text-secondary hover:bg-white/5 hover:text-white"
                            )
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{t(item.labelKey)}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10 space-y-2">
                <LanguageSelector />
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-white/5 hover:text-white transition-all">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">{t('nav.settings')}</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-danger/80 hover:bg-danger/10 hover:text-danger transition-all">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">{t('nav.logout')}</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
