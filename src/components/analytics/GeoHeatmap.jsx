import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { mockSchools } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

const GeoHeatmap = () => {
    const { t } = useLanguage();

    // Simulate map coordinates
    const data = mockSchools.map(school => ({
        x: school.coordinates.lat,
        y: school.coordinates.lng,
        z: school.dropoutRate,
        name: school.name,
        district: school.district
    }));

    return (
        <div className="space-y-6">
            <div className="glass-card p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">{t('analytics.geoRiskHeatmap')}</h3>
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-success"></div> {t('analytics.lowRisk')}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-warning"></div> {t('analytics.mediumRisk')}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-danger"></div> {t('analytics.highRisk')}
                        </div>
                    </div>
                </div>

                <div className="h-96 relative bg-surface/30 rounded-xl overflow-hidden border border-white/5">
                    {/* Abstract Map Background */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <svg width="100%" height="100%">
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <XAxis type="number" dataKey="x" name="Latitude" hide domain={['auto', 'auto']} />
                            <YAxis type="number" dataKey="y" name="Longitude" hide domain={['auto', 'auto']} />
                            <ZAxis type="number" dataKey="z" range={[100, 1000]} name={t('dashboard.dropoutRate')} />
                            <Tooltip
                                cursor={{ strokeDasharray: '3 3' }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-surface border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-md">
                                                <p className="text-white font-bold">{data.name}</p>
                                                <p className="text-text-secondary text-sm">{data.district}</p>
                                                <p className="text-danger font-bold mt-1">{t('dashboard.dropoutRate')}: {data.z}%</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Scatter name="Schools" data={data}>
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.z > 10 ? '#ef4444' : entry.z > 5 ? '#f59e0b' : '#10b981'}
                                        stroke="rgba(255,255,255,0.5)"
                                        strokeWidth={2}
                                    />
                                ))}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-sm text-text-secondary mt-4 text-center">
                    {t('analytics.mapFootnote')}
                </p>
            </div>
        </div>
    );
};

export default GeoHeatmap;
