import React, { useState } from 'react';
import { BarChart2, Map, Users, Share2, Activity } from 'lucide-react';
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

    const tabs = [
        { id: 'school', labelKey: 'analytics.tabs.schoolPerformance', icon: BarChart2 },
        { id: 'geo', labelKey: 'analytics.tabs.geographicAnalysis', icon: Map },
        { id: 'gender', labelKey: 'analytics.tabs.genderDisparity', icon: Users },
        { id: 'social', labelKey: 'analytics.tabs.socialTrends', icon: Share2 },
        { id: 'journey', labelKey: 'analytics.tabs.studentJourney', icon: Activity },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'school': return <SchoolPerformance />;
            case 'geo': return <GeoHeatmap />;
            case 'gender': return <GenderDisparity />;
            case 'social': return <SocialTrends />;
            case 'journey': return <StudentJourney />;
            default: return <SchoolPerformance />;
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-display font-bold text-white">{t('analytics.title')}</h1>
                <p className="text-text-secondary mt-1">{t('analytics.subtitle')}</p>
            </header>

            {/* Tabs */}
            <div className="flex flex-wrap gap-4 border-b border-white/10 pb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={clsx(
                            "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                            activeTab === tab.id
                                ? "bg-primary text-white shadow-lg shadow-primary/25"
                                : "text-text-secondary hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span className="font-medium">{t(tab.labelKey)}</span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
                {renderContent()}
            </div>
        </div>
    );
};

export default AnalyticsView;
