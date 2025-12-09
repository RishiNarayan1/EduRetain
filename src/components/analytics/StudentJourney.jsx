import React from 'react';
import { motion } from 'framer-motion';
import { mockDemographics } from '../../data/mockData';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const StudentJourney = () => {
    const { t } = useLanguage();
    const { ageGroup } = mockDemographics;

    return (
        <div className="space-y-6">
            <div className="glass-card p-8 overflow-x-auto">
                <h3 className="text-xl font-bold text-white mb-8">{t('analytics.studentTimeline')}</h3>

                <div className="relative min-w-[800px] py-10">
                    {/* Timeline Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full" />

                    <div className="relative flex justify-between items-center z-10">
                        {ageGroup.map((stage, index) => {
                            const isHighRisk = stage.dropoutRate > 5;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    className="flex flex-col items-center group"
                                >
                                    {/* Tooltip/Info Card */}
                                    <div className="mb-4 p-4 rounded-xl bg-surface border border-white/10 shadow-xl w-48 text-center transform transition-transform group-hover:-translate-y-2">
                                        <h4 className="font-bold text-white">{stage.standard}</h4>
                                        <p className="text-xs text-text-secondary mb-2">{t('analytics.age')}: {stage.age}</p>
                                        <div className={`text-lg font-bold ${isHighRisk ? 'text-danger' : 'text-success'}`}>
                                            {stage.dropoutRate}% {t('analytics.drop')}
                                        </div>
                                    </div>

                                    {/* Node */}
                                    <div className={`w-6 h-6 rounded-full border-4 ${isHighRisk ? 'border-danger bg-surface' : 'border-success bg-surface'} z-10 transition-transform group-hover:scale-125`} />

                                    {/* Label */}
                                    <div className="mt-4 flex items-center gap-2">
                                        {isHighRisk ? <AlertCircle className="w-4 h-4 text-danger" /> : <CheckCircle className="w-4 h-4 text-success" />}
                                        <span className={`text-sm font-medium ${isHighRisk ? 'text-danger' : 'text-text-secondary'}`}>
                                            {isHighRisk ? t('analytics.highRisk') : t('analytics.stable')}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentJourney;
