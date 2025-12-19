import React, { useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { generateDemographics } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

const SocialTrends = ({ year = '2023-24' }) => {
    const { t } = useLanguage();
    const { caste } = useMemo(() => generateDemographics(year), [year]);

    return (
        <div className="space-y-6">
            <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4">{t('analytics.socialVulnerability')} ({year})</h3>
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={caste}>
                            <PolarGrid stroke="rgba(255,255,255,0.1)" />
                            <PolarAngleAxis dataKey="name" tick={{ fill: '#f8fafc', fontWeight: 'bold' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 15]} tick={{ fill: '#94a3b8' }} />
                            <Radar
                                name={t('dashboard.dropoutRate')}
                                dataKey="dropoutRate"
                                stroke="#f59e0b"
                                fill="#f59e0b"
                                fillOpacity={0.5}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-center text-text-secondary mt-4">
                    {t('analytics.socialFootnote')}
                </p>
            </div>
        </div>
    );
};

export default SocialTrends;
