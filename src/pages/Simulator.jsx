import React, { useState } from 'react';
import { getInterventions } from '../data/mockData';
import { Sliders, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from '../context/LanguageContext';

const Simulator = () => {
    const { t } = useLanguage();
    const interventions = getInterventions();
    const [activeInterventions, setActiveInterventions] = useState({});
    const baseDropoutRate = 8.5;

    const handleSliderChange = (id, value) => {
        setActiveInterventions(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const calculatePrediction = () => {
        let reduction = 0;
        let totalCost = 0;

        interventions.forEach(item => {
            const intensity = (activeInterventions[item.id] || 0) / 100;
            reduction += item.impactFactor * intensity * 2;
            const costMultiplier = item.cost === 'High' ? 100000 : item.cost === 'Medium' ? 50000 : 10000;
            totalCost += costMultiplier * intensity;
        });

        const predictedRate = Math.max(0, baseDropoutRate - reduction).toFixed(2);
        return { predictedRate, totalCost };
    };

    const { predictedRate, totalCost } = calculatePrediction();

    const chartData = [
        { name: t('simulator.currentRate'), rate: baseDropoutRate },
        { name: t('simulator.predictedRate'), rate: parseFloat(predictedRate) }
    ];

    return (
        <div className="space-y-6 lg:space-y-8">
            <header>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">{t('simulator.title')}</h1>
                <p className="text-text-secondary mt-1 text-sm sm:text-base">{t('simulator.subtitle')}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Controls */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                            <Sliders className="w-5 h-5" /> {t('simulator.policyAdjustments')}
                        </h3>
                        <div className="space-y-5 sm:space-y-6">
                            {interventions.map((item) => (
                                <div key={item.id} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-white font-medium text-sm sm:text-base">{item.name}</label>
                                        <span className="text-primary font-bold">{activeInterventions[item.id] || 0}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={activeInterventions[item.id] || 0}
                                        onChange={(e) => handleSliderChange(item.id, parseInt(e.target.value))}
                                        className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between text-xs text-text-secondary">
                                        <span>{t('simulator.impact')}: {item.impactFactor}x</span>
                                        <span>{t('simulator.cost')}: {item.cost}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-4 sm:space-y-6">
                    {/* Prediction Card */}
                    <div className="glass-card p-4 sm:p-6 text-center">
                        <h3 className="text-text-secondary font-medium mb-2 text-sm sm:text-base">{t('simulator.predictedDropoutRate')}</h3>
                        <div className="flex items-center justify-center gap-2 text-3xl sm:text-4xl font-bold text-white mb-2">
                            <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-success" />
                            {predictedRate}%
                        </div>
                        <p className="text-sm text-success">
                            {(baseDropoutRate - predictedRate).toFixed(2)}% {t('simulator.reduction')}
                        </p>
                    </div>

                    {/* Budget Card */}
                    <div className="glass-card p-4 sm:p-6 text-center">
                        <h3 className="text-text-secondary font-medium mb-2 text-sm sm:text-base">{t('simulator.estimatedBudget')}</h3>
                        <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-bold text-white">
                            <span className="text-warning font-sans">₹</span>
                            {(totalCost / 100000).toFixed(2)}L
                        </div>
                    </div>

                    {/* Comparison Chart */}
                    <div className="glass-card p-4 sm:p-6 h-56 sm:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                />
                                <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : '#10b981'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Simulator;
