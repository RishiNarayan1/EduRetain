import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PieChart, Sliders, Settings, GraduationCap, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '../../context/LanguageContext';

const Sidebar = () => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, labelKey: 'nav.dashboard', path: '/' },
        { icon: PieChart, labelKey: 'nav.analytics', path: '/analytics' },
        { icon: Sliders, labelKey: 'nav.simulator', path: '/simulator' },
    ];

    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-surface/80 backdrop-blur-md rounded-xl border border-white/10 text-white hover:bg-surface transition-colors"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={clsx(
                "fixed left-0 top-0 h-screen w-64 glass-panel flex flex-col z-50 transition-transform duration-300",
                "lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <GraduationCap className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-xl font-display font-bold text-gradient">{t('common.appName')}</h1>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={closeSidebar}
                        className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-text-secondary hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={closeSidebar}
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
                            <span className="font-medium">{item.labelKey ? t(item.labelKey) : item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Settings at bottom */}
                <div className="p-4 border-t border-white/10">
                    <NavLink
                        to="/settings"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                                isActive
                                    ? "bg-primary/20 text-white shadow-lg border border-primary/20"
                                    : "text-text-secondary hover:bg-white/5 hover:text-white"
                            )
                        }
                    >
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">{t('nav.settings')}</span>
                    </NavLink>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

