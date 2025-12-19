import React, { useState, useMemo, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, Legend, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, AreaChart, Area, PieChart, Pie
} from 'recharts';
import {
  TrendingDown, TrendingUp, Users, MapPin, Filter,
  BarChart2, Activity, AlertTriangle, ArrowUpDown, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getStates, getYears, educationLevels,
  getTopStates, getBottomStates, getGenderComparison,
  getStateTrend, getYearStats, getLevelWiseComparison,
  getNationalAverage, getDataByYear
} from '../utils/dorDataParser';
import {
  newDorData, newYears, getNewDataByYear, getNewNationalAverage, getNewStates
} from '../utils/newDorData';
import { useLanguage } from '../context/LanguageContext';

// Combined education levels for new data (no Higher Secondary, no gender breakdown)
const newEducationLevels = [
  { key: 'Primary', label: 'Primary', color: '#3b82f6' },
  { key: 'UpperPrimary', label: 'Upper Primary', color: '#6366f1' },
  { key: 'Secondary', label: 'Secondary', color: '#8b5cf6' },
];

// Color gradients for different risk levels
const getRiskColor = (value) => {
  if (value >= 25) return '#ef4444'; // danger
  if (value >= 15) return '#f59e0b'; // warning
  if (value >= 10) return '#f97316'; // warning-light
  if (value >= 5) return '#eab308';  // caution
  return '#10b981'; // success
};

// Shift academic year labels forward by 2 years for display only
const shiftYearLabel = (yearStr) => {
  const [startRaw] = yearStr.split('-');
  const startYear = parseInt(startRaw, 10);
  if (Number.isNaN(startYear)) return yearStr;
  const endYear = startYear + 1;
  const newStart = startYear + 2;
  const newEnd = endYear + 2;
  return `${newStart}-${String(newEnd).slice(-2)}`;
};

// Stat Card Component
const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-5 relative overflow-hidden group cursor-pointer"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500" />
    <div className="flex items-start justify-between">
      <div>
        <p className="text-text-secondary text-sm font-medium">{title}</p>
        <h3 className={`text-3xl font-bold mt-1 ${color || 'text-white'}`}>
          {value !== null && value !== undefined ? `${value}%` : 'N/A'}
        </h3>
        {subtitle && <p className="text-xs text-text-secondary mt-1">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color?.includes('danger') ? 'from-danger/20 to-danger/5' : color?.includes('success') ? 'from-success/20 to-success/5' : 'from-primary/20 to-primary/5'}`}>
        <Icon className={`w-5 h-5 ${color || 'text-primary'}`} />
      </div>
    </div>
    {trend && (
      <div className={`flex items-center gap-1 mt-3 text-xs ${trend > 0 ? 'text-danger' : 'text-success'}`}>
        {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        <span>{Math.abs(trend).toFixed(2)}% vs previous year</span>
      </div>
    )}
  </motion.div>
);

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl">
        <p className="text-white font-semibold mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: <span className="font-bold">{entry.value?.toFixed(2)}%</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Tab Button
const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${active
        ? 'bg-primary text-white shadow-lg shadow-primary/25'
        : 'text-text-secondary hover:bg-white/5 hover:text-white'
      }`}
  >
    <Icon className="w-4 h-4" />
    <span className="hidden sm:inline">{label}</span>
  </button>
);

const DashboardHome = () => {
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState('2021-22');
  const [selectedLevel, setSelectedLevel] = useState('Secondary');
  const [selectedState, setSelectedState] = useState('');
  const [viewMode, setViewMode] = useState('overview');

  const allYears = useMemo(() => {
    const uniqueYears = new Set([...getYears(), ...newYears]);
    return Array.from(uniqueYears).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  }, []);

  // Dynamic data based on selected year
  const isNewDataset = useMemo(() => newYears.includes(selectedYear), [selectedYear]);
  const years = allYears;
  const states = isNewDataset ? getNewStates() : getStates();
  const currentLevels = isNewDataset ? newEducationLevels : educationLevels;

  // Guard against selecting HrSecondary in the newer dataset (not available there)
  useEffect(() => {
    if (isNewDataset && selectedLevel === 'HrSecondary') {
      setSelectedLevel('Secondary');
    }
  }, [isNewDataset, selectedLevel]);

  // Get data based on dataset mode
  const getYearData = (year) => isNewDataset ? getNewDataByYear(year) : getDataByYear(year);
  const getNatAvg = (year) => isNewDataset ? getNewNationalAverage(year) : getNationalAverage(year);

  const yearStats = useMemo(() => {
    if (isNewDataset) {
      const national = getNewNationalAverage(selectedYear);
      return {
        avgPrimary: national?.Primary,
        avgUpperPrimary: national?.UpperPrimary,
        avgSecondary: national?.Secondary,
        avgHrSecondary: null,
      };
    }
    return getYearStats(selectedYear);
  }, [selectedYear, isNewDataset]);

  const topStates = useMemo(() => {
    if (isNewDataset) {
      return getNewDataByYear(selectedYear)
        .filter(d => d[selectedLevel] !== null && d[selectedLevel] !== undefined)
        .sort((a, b) => (b[selectedLevel] || 0) - (a[selectedLevel] || 0))
        .slice(0, 10)
        .map(d => ({ state: d.state, value: d[selectedLevel], year: d.year }));
    }
    return getTopStates(selectedYear, selectedLevel, 10);
  }, [selectedYear, selectedLevel, isNewDataset]);

  const bottomStates = useMemo(() => {
    if (isNewDataset) {
      return getNewDataByYear(selectedYear)
        .filter(d => d[selectedLevel] !== null && d[selectedLevel] !== undefined && d[selectedLevel] > 0)
        .sort((a, b) => (a[selectedLevel] || 0) - (b[selectedLevel] || 0))
        .slice(0, 10)
        .map(d => ({ state: d.state, value: d[selectedLevel], year: d.year }));
    }
    return getBottomStates(selectedYear, selectedLevel, 10);
  }, [selectedYear, selectedLevel, isNewDataset]);

  const genderData = useMemo(() => {
    if (isNewDataset) {
      return getNewDataByYear(selectedYear)
        .filter(d => d[`${selectedLevel}_Boys`] !== undefined && d[`${selectedLevel}_Girls`] !== undefined)
        .map(d => ({
          state: d.state,
          boys: d[`${selectedLevel}_Boys`],
          girls: d[`${selectedLevel}_Girls`],
          total: d[selectedLevel],
          genderGap: (d[`${selectedLevel}_Girls`] || 0) - (d[`${selectedLevel}_Boys`] || 0)
        }))
        .sort((a, b) => Math.abs(b.genderGap) - Math.abs(a.genderGap));
    }
    return getGenderComparison(selectedYear, selectedLevel);
  }, [selectedYear, selectedLevel, isNewDataset]);

  const levelComparison = useMemo(() => {
    if (isNewDataset) {
      return newYears.map(year => {
        const national = getNewNationalAverage(year);
        return {
          year,
          Primary: national?.Primary,
          UpperPrimary: national?.UpperPrimary,
          Secondary: national?.Secondary,
        };
      });
    }
    return getLevelWiseComparison();
  }, [isNewDataset]);

  const stateTrend = useMemo(() => {
    if (!selectedState) return [];
    if (isNewDataset) {
      return newDorData
        .filter(d => d.state === selectedState)
        .map(d => ({ year: d.year, value: d[selectedLevel] }));
    }
    return getStateTrend(selectedState, selectedLevel);
  }, [selectedState, selectedLevel, isNewDataset]);

  const nationalAvg = useMemo(() => getNatAvg(selectedYear), [selectedYear, isNewDataset]);



  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
              <span className="text-primary">{t('common.appName')}</span> - {t('dashboard.title')}
            </h1>
          </div>
          <p className="text-text-secondary mt-2 text-sm sm:text-base">
            {t('dashboard.subtitle')}
          </p>
        </div>
      </header>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4"
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-text-secondary" />
            <span className="text-sm text-text-secondary font-medium">{t('dashboard.filters')}:</span>
          </div>

          {/* Year Selector */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
          >
            {years.map(year => (
              <option key={year} value={year} className="bg-surface">{shiftYearLabel(year)}</option>
            ))}
          </select>

          {/* Level Selector */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
          >
            {currentLevels.map(level => (
              <option key={level.key} value={level.key} className="bg-surface">{level.label}</option>
            ))}
          </select>

          {/* State Selector */}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer flex-1 min-w-[150px]"
          >
            <option value="" className="bg-surface">All States</option>
            {states.map(state => (
              <option key={state} value={state} className="bg-surface">{state}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* View Mode Tabs */}
      <div className="flex flex-wrap gap-2">
        <TabButton
          active={viewMode === 'overview'}
          onClick={() => setViewMode('overview')}
          icon={BarChart2}
          label={t('dashboard.tabs.overview')}
        />
        <TabButton
          active={viewMode === 'comparison'}
          onClick={() => setViewMode('comparison')}
          icon={ArrowUpDown}
          label={t('dashboard.tabs.stateComparison')}
        />
        <TabButton
          active={viewMode === 'trends'}
          onClick={() => setViewMode('trends')}
          icon={Activity}
          label={t('dashboard.tabs.trends')}
        />
        <TabButton
          active={viewMode === 'gender'}
          onClick={() => setViewMode('gender')}
          icon={Users}
          label={t('dashboard.tabs.genderAnalysis')}
        />
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Primary Dropout Rate"
                value={yearStats.avgPrimary}
                subtitle="National Average"
                icon={Users}
                color="text-primary"
              />
              <StatCard
                title="Upper Primary Rate"
                value={yearStats.avgUpperPrimary}
                subtitle="National Average"
                icon={TrendingDown}
                color="text-secondary"
              />
              <StatCard
                title="Secondary Dropout Rate"
                value={yearStats.avgSecondary}
                subtitle="National Average"
                icon={AlertTriangle}
                color="text-warning"
              />
              <StatCard
                title="Hr. Secondary Rate"
                value={yearStats.avgHrSecondary}
                subtitle="National Average"
                icon={Activity}
                color="text-accent"
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Top 10 High Dropout States */}
              <div className="glass-card p-5">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-danger" />
                  {t('dashboard.topHighDropoutStates')}
                  <span className="text-xs text-text-secondary font-normal ml-2">
                    ({educationLevels.find(l => l.key === selectedLevel)?.label})
                  </span>
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topStates} layout="vertical" margin={{ left: 10, right: 20 }}>
                      <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                      <YAxis
                        dataKey="state"
                        type="category"
                        width={100}
                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]} name="Dropout Rate">
                        {topStates.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getRiskColor(entry.value)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Best Performing States */}
              <div className="glass-card p-5">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-success" />
                  {t('dashboard.topBestPerformingStates')}
                  <span className="text-xs text-text-secondary font-normal ml-2">
                    ({educationLevels.find(l => l.key === selectedLevel)?.label})
                  </span>
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bottomStates} layout="vertical" margin={{ left: 10, right: 20 }}>
                      <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                      <YAxis
                        dataKey="state"
                        type="category"
                        width={100}
                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]} name="Dropout Rate" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Level Comparison Over Years */}
            <div className="glass-card p-5">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                National Average by Education Level Over Years
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={levelComparison} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      {currentLevels.map((level) => (
                        <linearGradient key={level.key} id={`color${level.key}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={level.color} stopOpacity={0.4} />
                          <stop offset="95%" stopColor={level.color} stopOpacity={0} />
                        </linearGradient>
                      ))}
                    </defs>
                    <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {currentLevels.map((level) => (
                      <Area
                        key={level.key}
                        type="monotone"
                        dataKey={level.key}
                        name={level.label}
                        stroke={level.color}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill={`url(#color${level.key})`}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'comparison' && (
          <motion.div
            key="comparison"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* All States Comparison */}
            <div className="glass-card p-5">
              <h3 className="text-lg font-bold text-white mb-4">
                All States - {currentLevels.find(l => l.key === selectedLevel)?.label} Dropout Rate ({shiftYearLabel(selectedYear)})
              </h3>
              <div className="h-[600px] overflow-auto">
                <ResponsiveContainer width="100%" height={Math.max(600, getYearData(selectedYear).length * 35)}>
                  <BarChart
                    data={getYearData(selectedYear)
                      .filter(d => {
                        const val = isNewDataset ? d[selectedLevel] : d[`${selectedLevel}_Total`];
                        return val !== null && val !== undefined;
                      })
                      .sort((a, b) => {
                        const aVal = isNewDataset ? a[selectedLevel] : a[`${selectedLevel}_Total`];
                        const bVal = isNewDataset ? b[selectedLevel] : b[`${selectedLevel}_Total`];
                        return (bVal || 0) - (aVal || 0);
                      })
                      .map(d => ({
                        state: d.state,
                        value: isNewDataset ? d[selectedLevel] : d[`${selectedLevel}_Total`]
                      }))}
                    layout="vertical"
                    margin={{ left: 100, right: 30 }}
                  >
                    <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis
                      dataKey="state"
                      type="category"
                      width={100}
                      tick={{ fill: '#94a3b8', fontSize: 10 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} name="Dropout Rate">
                      {getYearData(selectedYear)
                        .filter(d => {
                          const val = isNewDataset ? d[selectedLevel] : d[`${selectedLevel}_Total`];
                          return val !== null && val !== undefined;
                        })
                        .sort((a, b) => {
                          const aVal = isNewDataset ? a[selectedLevel] : a[`${selectedLevel}_Total`];
                          const bVal = isNewDataset ? b[selectedLevel] : b[`${selectedLevel}_Total`];
                          return (bVal || 0) - (aVal || 0);
                        })
                        .map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getRiskColor(isNewDataset ? entry[selectedLevel] : entry[`${selectedLevel}_Total`])} />
                        ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-5">
                <h4 className="text-sm text-text-secondary mb-2">Highest Dropout</h4>
                <p className="text-xl font-bold text-danger">{topStates[0]?.state || 'N/A'}</p>
                <p className="text-2xl font-bold text-white">{topStates[0]?.value?.toFixed(2) || 'N/A'}%</p>
              </div>
              <div className="glass-card p-5">
                <h4 className="text-sm text-text-secondary mb-2">Lowest Dropout</h4>
                <p className="text-xl font-bold text-success">{bottomStates[0]?.state || 'N/A'}</p>
                <p className="text-2xl font-bold text-white">{bottomStates[0]?.value?.toFixed(2) || 'N/A'}%</p>
              </div>
              <div className="glass-card p-5">
                <h4 className="text-sm text-text-secondary mb-2">National Average</h4>
                <p className="text-xl font-bold text-primary">All India</p>
                <p className="text-2xl font-bold text-white">
                  {(isNewDataset ? nationalAvg?.[selectedLevel] : nationalAvg?.[`${selectedLevel}_Total`])?.toFixed(2) || 'N/A'}%
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'trends' && (
          <motion.div
            key="trends"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {selectedState ? (
              <>
                {/* State Trend */}
                <div className="glass-card p-5">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {selectedState} - Dropout Trend ({currentLevels.find(l => l.key === selectedLevel)?.label})
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stateTrend} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                          name="Dropout Rate"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Radar Chart for Selected State */}
                <div className="glass-card p-5">
                  <h3 className="text-lg font-bold text-white mb-4">
                    {selectedState} - All Education Levels ({shiftYearLabel(selectedYear)})
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        data={currentLevels.map(level => {
                          const stateData = getYearData(selectedYear).find(d => d.state === selectedState);
                          return {
                            level: level.label,
                            value: isNewDataset ? (stateData?.[level.key] || 0) : (stateData?.[`${level.key}_Total`] || 0)
                          };
                        })}
                      >
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="level" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <PolarRadiusAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                        <Radar
                          name="Dropout Rate"
                          dataKey="value"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.4}
                        />
                        <Tooltip content={<CustomTooltip />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            ) : (
              <div className="glass-card p-10 text-center">
                <MapPin className="w-16 h-16 text-text-secondary mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-white mb-2">Select a State</h3>
                <p className="text-text-secondary">
                  Choose a state from the filter above to view its dropout rate trends over the years.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {viewMode === 'gender' && (
          <motion.div
            key="gender"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="glass-card p-5">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                Gender-wise Dropout Analysis ({currentLevels.find(l => l.key === selectedLevel)?.label} - {shiftYearLabel(selectedYear)})
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Comparing Boys vs Girls dropout rates. Positive gap indicates higher dropout for girls.
              </p>
              <div className="h-[500px] overflow-auto">
                <ResponsiveContainer width="100%" height={Math.max(500, genderData.length * 40)}>
                  <BarChart
                    data={genderData.slice(0, 25)}
                    layout="vertical"
                    margin={{ left: 100, right: 30 }}
                  >
                    <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis
                      dataKey="state"
                      type="category"
                      width={100}
                      tick={{ fill: '#94a3b8', fontSize: 10 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="boys" name="Boys" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="girls" name="Girls" fill="#ec4899" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gender Gap Analysis */}
            <div className="glass-card p-5">
              <h3 className="text-lg font-bold text-white mb-4">States with Highest Gender Gap</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm text-text-secondary mb-3">Higher Girls Dropout</h4>
                  <div className="space-y-2">
                    {genderData
                      .filter(d => d.genderGap > 0)
                      .slice(0, 5)
                      .map((d, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <span className="text-white font-medium">{d.state}</span>
                          <span className="text-pink-400 font-bold">+{d.genderGap.toFixed(2)}%</span>
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-text-secondary mb-3">Higher Boys Dropout</h4>
                  <div className="space-y-2">
                    {genderData
                      .filter(d => d.genderGap < 0)
                      .slice(0, 5)
                      .map((d, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <span className="text-white font-medium">{d.state}</span>
                          <span className="text-blue-400 font-bold">{d.genderGap.toFixed(2)}%</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Distribution Pie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-5">
                <h3 className="text-lg font-bold text-white mb-4">National Average by Gender</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Boys', value: nationalAvg?.[`${selectedLevel}_Boys`] || 0, fill: '#3b82f6' },
                          { name: 'Girls', value: nationalAvg?.[`${selectedLevel}_Girls`] || 0, fill: '#ec4899' },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value?.toFixed(2)}%`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="glass-card p-5 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-white mb-4">Key Insights</h3>
                <ul className="space-y-3 text-text-secondary text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                    <span>
                      National average dropout for boys: <span className="text-white font-bold">
                        {nationalAvg?.[`${selectedLevel}_Boys`]?.toFixed(2) || 'N/A'}%
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink-500 mt-1.5" />
                    <span>
                      National average dropout for girls: <span className="text-white font-bold">
                        {nationalAvg?.[`${selectedLevel}_Girls`]?.toFixed(2) || 'N/A'}%
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent mt-1.5" />
                    <span>
                      Gender gap: <span className={`font-bold ${(nationalAvg?.[`${selectedLevel}_Girls`] || 0) > (nationalAvg?.[`${selectedLevel}_Boys`] || 0)
                          ? 'text-pink-400'
                          : 'text-blue-400'
                        }`}>
                        {Math.abs((nationalAvg?.[`${selectedLevel}_Girls`] || 0) - (nationalAvg?.[`${selectedLevel}_Boys`] || 0)).toFixed(2)}%
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardHome;
