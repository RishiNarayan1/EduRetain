import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { generateSchools } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

const GeoHeatmap = ({ year = '2023-24' }) => {
    const { t } = useLanguage();

    const data = useMemo(() => {
        const schools = generateSchools(20, year);
        return schools.map(school => ({
            x: school.coordinates.lat,
            y: school.coordinates.lng,
            z: school.dropoutRate,
            name: school.name,
            district: school.district
        }));
    }, [year]);

    return (
        <div className="space-y-6">
            <div className="glass-card p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white">{t('analytics.geoRiskHeatmap')} ({year})</h3>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-text-secondary">
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

                <div className="h-72 sm:h-96 relative bg-surface/30 rounded-xl overflow-hidden border border-white/5">
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
                            <ZAxis type="number" dataKey="z" range={[80, 800]} name={t('dashboard.dropoutRate')} />
                            <Tooltip
                                cursor={{ strokeDasharray: '3 3' }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-surface border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-md">
                                                <p className="text-white font-bold text-sm">{data.name}</p>
                                                <p className="text-text-secondary text-xs">{data.district}</p>
                                                <p className="text-danger font-bold mt-1 text-sm">{t('dashboard.dropoutRate')}: {data.z}%</p>
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
                <p className="text-xs sm:text-sm text-text-secondary mt-4 text-center">
                    {t('analytics.mapFootnote')}
                </p>
            </div>
        </div>
    );
};

export default GeoHeatmap;
