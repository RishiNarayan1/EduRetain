import React from 'react';
import { Users, TrendingDown, AlertTriangle, MapPin } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import { mockSchools } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from '../context/LanguageContext';

const DashboardHome = () => {
    const { t } = useLanguage();

    // Calculate aggregate metrics
    const totalStudents = mockSchools.reduce((acc, school) => acc + school.students, 0);
    const avgDropoutRate = (mockSchools.reduce((acc, school) => acc + school.dropoutRate, 0) / mockSchools.length).toFixed(1);
    const highRiskSchools = mockSchools.filter(s => s.dropoutRate > 10).length;

    // Sort schools by dropout rate for the chart
    const sortedSchools = [...mockSchools].sort((a, b) => b.dropoutRate - a.dropoutRate).slice(0, 5);

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-display font-bold text-white">{t('dashboard.title')}</h1>
                <p className="text-text-secondary mt-1">{t('dashboard.subtitle')}</p>
            </header>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title={t('dashboard.totalStudents')}
                    value={totalStudents.toLocaleString()}
                    change="+2.5%"
                    trend="down" // "down" here means good (growth) but let's stick to the logic in StatCard
                    icon={Users}
                    color="text-primary"
                />
                <StatCard
                    title={t('dashboard.avgDropoutRate')}
                    value={`${avgDropoutRate}%`}
                    change="-0.8%"
                    trend="down" // Decreasing dropout is good
                    icon={TrendingDown}
                    color="text-accent"
                />
                <StatCard
                    title={t('dashboard.highRiskZones')}
                    value={highRiskSchools}
                    change="+2"
                    trend="up" // Increasing risk is bad
                    icon={AlertTriangle}
                    color="text-danger"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top 5 High Risk Schools Chart */}
                <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-white mb-6">{t('dashboard.criticalAlertZones')}</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sortedSchools} layout="vertical" margin={{ left: 20 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={150} tick={{ fill: '#94a3b8' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                    itemStyle={{ color: '#f8fafc' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="dropoutRate" radius={[0, 4, 4, 0]}>
                                    {sortedSchools.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.dropoutRate > 12 ? '#ef4444' : '#f59e0b'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Alerts List */}
                <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-white mb-6">{t('dashboard.recentRiskAlerts')}</h3>
                    <div className="space-y-4">
                        {sortedSchools.map((school) => (
                            <div key={school.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-danger/20 text-danger">
                                        <AlertTriangle className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium">{school.name}</h4>
                                        <div className="flex items-center gap-1 text-xs text-text-secondary">
                                            <MapPin className="w-3 h-3" />
                                            {school.district}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-lg font-bold text-danger">{school.dropoutRate}%</span>
                                    <span className="text-xs text-text-secondary">{t('dashboard.dropoutRate')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
