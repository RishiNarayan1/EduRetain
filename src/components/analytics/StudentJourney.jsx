import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { generateDemographics } from '../../data/mockData';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const StudentJourney = ({ year = '2023-24' }) => {
    const { t } = useLanguage();
    const { ageGroup } = useMemo(() => generateDemographics(year), [year]);

    return (
        <div className="space-y-6">
            <div className="glass-card p-4 sm:p-8 overflow-x-auto">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-6 sm:mb-8">{t('analytics.studentTimeline')} ({year})</h3>

                {/* Desktop Timeline */}
                <div className="hidden md:block relative min-w-[800px] py-10">
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
                                    <div className="mb-4 p-4 rounded-xl bg-surface border border-white/10 shadow-xl w-40 text-center transform transition-transform group-hover:-translate-y-2">
                                        <h4 className="font-bold text-white text-sm">{stage.standard}</h4>
                                        <p className="text-xs text-text-secondary mb-2">{t('analytics.age')}: {stage.age}</p>
                                        <div className={`text-lg font-bold ${isHighRisk ? 'text-danger' : 'text-success'}`}>
                                            {stage.dropoutRate}% {t('analytics.drop')}
                                        </div>
                                    </div>

                                    <div className={`w-6 h-6 rounded-full border-4 ${isHighRisk ? 'border-danger bg-surface' : 'border-success bg-surface'} z-10 transition-transform group-hover:scale-125`} />

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

                {/* Mobile Timeline - Vertical */}
                <div className="md:hidden space-y-4">
                    {ageGroup.map((stage, index) => {
                        const isHighRisk = stage.dropoutRate > 5;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-4"
                            >
                                <div className={`w-4 h-4 rounded-full flex-shrink-0 ${isHighRisk ? 'bg-danger' : 'bg-success'}`} />
                                <div className="flex-1 p-3 rounded-xl bg-surface border border-white/10">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{stage.standard}</h4>
                                            <p className="text-xs text-text-secondary">{t('analytics.age')}: {stage.age}</p>
                                        </div>
                                        <div className={`text-right ${isHighRisk ? 'text-danger' : 'text-success'}`}>
                                            <span className="font-bold">{stage.dropoutRate}%</span>
                                            <p className="text-xs">{isHighRisk ? t('analytics.highRisk') : t('analytics.stable')}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default StudentJourney;
