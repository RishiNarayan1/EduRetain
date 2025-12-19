import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { generateDemographics } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

const GenderDisparity = ({ year = '2023-24' }) => {
    const { t } = useLanguage();
    const { gender } = useMemo(() => generateDemographics(year), [year]);
    const COLORS = ['#3b82f6', '#ec4899'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="glass-card p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">{t('analytics.enrollmentDistribution')} ({year})</h3>
                <div className="h-64 sm:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={gender}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                nameKey="name"
                                label
                            >
                                {gender.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="glass-card p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">{t('analytics.dropoutByGender')}</h3>
                <div className="h-64 sm:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={gender}
                            margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                            <Bar dataKey="dropoutRate" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
                                {gender.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default GenderDisparity;
