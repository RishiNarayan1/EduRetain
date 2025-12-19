import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateSchools } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

const SchoolPerformance = ({ year = '2023-24' }) => {
    const { t } = useLanguage();
    
    const data = useMemo(() => generateSchools(20, year), [year]);

    return (
        <div className="space-y-6">
            <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4">{t('analytics.schoolWiseDropout')} ({year})</h3>
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} angle={-45} textAnchor="end" height={100} />
                            <YAxis tick={{ fill: '#94a3b8' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                            <Legend />
                            <Bar dataKey="dropoutRate" fill="#3b82f6" name={`${t('dashboard.dropoutRate')} (%)`} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default SchoolPerformance;
