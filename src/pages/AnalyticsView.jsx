import React, { useState } from 'react';
import { BarChart2, Map, Users, Share2, Activity, Filter } from 'lucide-react';
import clsx from 'clsx';
import SchoolPerformance from '../components/analytics/SchoolPerformance';
import GeoHeatmap from '../components/analytics/GeoHeatmap';
import GenderDisparity from '../components/analytics/GenderDisparity';
import SocialTrends from '../components/analytics/SocialTrends';
import StudentJourney from '../components/analytics/StudentJourney';
import { useLanguage } from '../context/LanguageContext';

const AnalyticsView = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('school');
    const [selectedYear, setSelectedYear] = useState('2023-24');
    const years = ['2019-20', '2020-21', '2021-22', '2022-23', '2023-24'];

    const tabs = [
        { id: 'school', labelKey: 'analytics.tabs.schoolPerformance', icon: BarChart2 },
        { id: 'geo', labelKey: 'analytics.tabs.geographicAnalysis', icon: Map },
        { id: 'gender', labelKey: 'analytics.tabs.genderDisparity', icon: Users },
        { id: 'social', labelKey: 'analytics.tabs.socialTrends', icon: Share2 },
        { id: 'journey', labelKey: 'analytics.tabs.studentJourney', icon: Activity },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'school': return <SchoolPerformance year={selectedYear} />;
            case 'geo': return <GeoHeatmap year={selectedYear} />;
            case 'gender': return <GenderDisparity year={selectedYear} />;
            case 'social': return <SocialTrends year={selectedYear} />;
            case 'journey': return <StudentJourney year={selectedYear} />;
            default: return <SchoolPerformance year={selectedYear} />;
        }
    };

    return (
        <div className="space-y-6 lg:space-y-8">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">{t('analytics.title')}</h1>
                    <p className="text-text-secondary mt-1 text-sm sm:text-base">{t('analytics.subtitle')}</p>
                </div>
                
                {/* Year Filter */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                    <Filter className="w-4 h-4 text-text-secondary" />
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="bg-transparent border-none text-white text-sm focus:outline-none cursor-pointer"
                    >
                        {years.map(year => (
                            <option key={year} value={year} className="bg-surface text-white">
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </header>

            {/* Tabs - scrollable on mobile */}
            <div className="flex gap-2 sm:gap-4 border-b border-white/10 pb-4 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={clsx(
                            "flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap flex-shrink-0",
                            activeTab === tab.id
                                ? "bg-primary text-white shadow-lg shadow-primary/25"
                                : "text-text-secondary hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span className="font-medium text-sm sm:text-base">{t(tab.labelKey)}</span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[400px] sm:min-h-[500px]">
                {renderContent()}
            </div>
        </div>
    );
};

export default AnalyticsView;
