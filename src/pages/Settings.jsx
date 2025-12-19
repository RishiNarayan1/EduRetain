import React, { useMemo, useState } from 'react';
import { 
    Globe, LogOut, Moon, Sun, Download, User, Shield, 
    ChevronRight, Check, Database, FileText 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

import { useNavigate } from 'react-router-dom';
import {
    getYears,
    getTopStates,
    getBottomStates,
    getNationalAverage,
    getDataByYear,
} from '../utils/dorDataParser';
import {
    newYears,
    getNewDataByYear,
    getNewNationalAverage,
} from '../utils/newDorData';

const Settings = () => {
    const { language, changeLanguage, languageNames, availableLanguages, t } = useLanguage();
    const { theme, setThemeMode } = useTheme();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [selectedExportYear, setSelectedExportYear] = useState('2021-22');

    const downloadFile = (filename, content, mimeType) => {
        const blob = content instanceof Uint8Array
            ? new Blob([content], { type: mimeType })
            : new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    };

    const exportYears = useMemo(() => {
        const yearsSet = new Set([...getYears(), ...newYears, '2023-24']);
        return Array.from(yearsSet).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    }, []);

    const getLatestYear = (yearsArr) => {
        const sorted = [...yearsArr].sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
        return sorted[sorted.length - 1];
    };

    const getNewTopStates = (year, level, n = 5, direction = 'desc') => {
        const data = getNewDataByYear(year).filter(d => d[level] !== null && d[level] !== undefined);
        const sorted = [...data].sort((a, b) => (direction === 'desc' ? (b[level] || 0) - (a[level] || 0) : (a[level] || 0) - (b[level] || 0)));
        return sorted.slice(0, n).map(d => ({ state: d.state, value: d[level] }));
    };

    const getGenderInsights = (year, level, isNew) => {
        if (isNew) {
            const data = getNewDataByYear(year).filter(d => d[`${level}_Boys`] !== undefined && d[`${level}_Girls`] !== undefined);
            const mapped = data.map(d => ({
                state: d.state,
                boys: d[`${level}_Boys`],
                girls: d[`${level}_Girls`],
                gap: (d[`${level}_Girls`] || 0) - (d[`${level}_Boys`] || 0),
            }));
            const sorted = [...mapped].sort((a, b) => Math.abs(b.gap) - Math.abs(a.gap));
            return {
                topGapStates: sorted.slice(0, 5),
            };
        }

        // Old dataset
        const data = getDataByYear(year).filter(d => d[`${level}_Boys`] !== null && d[`${level}_Girls`] !== null);
        const mapped = data.map(d => ({
            state: d.state,
            boys: d[`${level}_Boys`],
            girls: d[`${level}_Girls`],
            gap: (d[`${level}_Girls`] || 0) - (d[`${level}_Boys`] || 0),
        }));
        const sorted = [...mapped].sort((a, b) => Math.abs(b.gap) - Math.abs(a.gap));
        return {
            topGapStates: sorted.slice(0, 5),
        };
    };

    const resolveDataset = (year) => {
        if (year === '2023-24') {
            const latestNew = getLatestYear(newYears);
            return { resolvedYear: latestNew, isNew: true, label: `${year} (using ${latestNew} data)` };
        }
        const isNew = newYears.includes(year);
        return { resolvedYear: year, isNew, label: year };
    };

    const buildAnalyticsSummary = (year, level = 'Secondary') => {
        const { resolvedYear, isNew, label } = resolveDataset(year);

        const national = isNew
            ? getNewNationalAverage(resolvedYear)
            : getNationalAverage(resolvedYear);

        const topSecondary = isNew
            ? getNewTopStates(resolvedYear, level, 5, 'desc')
            : getTopStates(resolvedYear, level, 5).map(d => ({ state: d.state, value: d.value }));

        const bottomSecondary = isNew
            ? getNewTopStates(resolvedYear, level, 5, 'asc')
            : getBottomStates(resolvedYear, level, 5).map(d => ({ state: d.state, value: d.value }));

        const gender = getGenderInsights(resolvedYear, level, isNew);

        return {
            generatedAt: new Date().toISOString(),
            reportYear: label,
            datasetType: isNew ? '2017-22' : '2012-15',
            national: isNew
                ? {
                    Primary: national?.Primary,
                    UpperPrimary: national?.UpperPrimary,
                    Secondary: national?.Secondary,
                  }
                : {
                    Primary: national?.Primary_Total,
                    UpperPrimary: national?.UpperPrimary_Total,
                    Secondary: national?.Secondary_Total,
                    HrSecondary: national?.HrSecondary_Total,
                  },
            overview: {
                topSecondary,
                bottomSecondary,
            },
            gender,
        };
    };

    const buildPdfReport = (summary) => {
        const lines = [];
        lines.push(`Edu-Retain Analytical Report`);
        lines.push(`Report Year: ${summary.reportYear}`);
        lines.push(`Dataset: ${summary.datasetType}`);
        lines.push(`Generated: ${summary.generatedAt}`);
        lines.push('');
        lines.push('Overview (National Averages)');
        Object.entries(summary.national || {}).forEach(([metric, value]) => {
            lines.push(`- ${metric}: ${value ?? 'N/A'}%`);
        });
        lines.push('');
        lines.push('State Comparison - Top Secondary (5)');
        summary.overview.topSecondary.forEach(item => {
            lines.push(`- ${item.state}: ${item.value ?? 'N/A'}%`);
        });
        lines.push('');
        lines.push('State Comparison - Bottom Secondary (5)');
        summary.overview.bottomSecondary.forEach(item => {
            lines.push(`- ${item.state}: ${item.value ?? 'N/A'}%`);
        });
        lines.push('');
        lines.push('Gender Analysis - Highest Gaps (5)');
        summary.gender.topGapStates.forEach(item => {
            lines.push(`- ${item.state}: Girls ${item.girls ?? 'N/A'}% vs Boys ${item.boys ?? 'N/A'}% (Gap: ${item.gap?.toFixed?.(2) ?? 'N/A'})`);
        });

        return lines.join('\n');
    };

    const escapePdfText = (text) => {
        return String(text)
            .replace(/\\/g, '\\\\')
            .replace(/\(/g, '\\(')
            .replace(/\)/g, '\\)');
    };

    const buildSimplePdf = (textContent) => {
        const lines = textContent.split('\n');
        const contentLines = [
            'BT',
            '/F1 12 Tf',
            '72 720 Td',
        ];
        lines.forEach((line, idx) => {
            if (idx === 0) {
                contentLines.push(`(${escapePdfText(line)}) Tj`);
            } else {
                contentLines.push('0 -16 Td');
                contentLines.push(`(${escapePdfText(line)}) Tj`);
            }
        });
        contentLines.push('ET');
        const contentStream = contentLines.join('\n');
        const contentLength = contentStream.length;

        const objects = [];
        objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
        objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
        objects.push('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n');
        objects.push(`4 0 obj\n<< /Length ${contentLength} >>\nstream\n${contentStream}\nendstream\nendobj\n`);
        objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');

        // Build PDF with byte offsets
        const parts = ['%PDF-1.4\n'];
        const offsets = [0];
        let position = parts[0].length;
        objects.forEach(obj => {
            offsets.push(position);
            parts.push(obj);
            position += obj.length;
        });

        const xrefStart = position;
        const totalObjs = objects.length + 1; // includes object 0
        const xrefLines = [];
        xrefLines.push(`xref\n0 ${totalObjs}\n`);
        xrefLines.push('0000000000 65535 f \n');
        for (let i = 1; i < totalObjs; i++) {
            const offset = offsets[i];
            xrefLines.push(offset.toString().padStart(10, '0') + ' 00000 n \n');
        }
        const xrefStr = xrefLines.join('');

        const trailer = `trailer\n<< /Size ${totalObjs} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

        const pdfString = parts.join('') + xrefStr + trailer;
        const encoder = new TextEncoder();
        return encoder.encode(pdfString);
    };

    const handleLogout = () => {
        const confirmed = window.confirm(t('nav.logoutConfirm') || 'Are you sure to log out?');
        if (!confirmed) return;
        
        logout();
        navigate('/login');
    };

    const handleExportData = () => {
        const summary = buildAnalyticsSummary(selectedExportYear, 'Secondary');
        const reportText = buildPdfReport(summary);
        const pdfBytes = buildSimplePdf(reportText);
        downloadFile('edu-retain-analytics.pdf', pdfBytes, 'application/pdf');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-gradient">
                    {t('settings.title') || 'Settings'}
                </h1>
                <p className="text-text-secondary mt-2">
                    {t('settings.subtitle') || 'Manage your preferences and account settings'}
                </p>
            </div>

            {/* Language Settings */}
            <section className="glass-panel p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/20 rounded-lg">
                        <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold">
                        {t('settings.language') || 'Language'}
                    </h2>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                    {t('settings.languageDescription') || 'Select your preferred language for the interface'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {availableLanguages.map((langCode) => (
                        <button
                            key={langCode}
                            onClick={() => changeLanguage(langCode)}
                            className={clsx(
                                "flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all",
                                language === langCode
                                    ? "bg-primary/20 border-primary/40"
                                    : "border-white/10 text-text-secondary hover:bg-white/5 hover:border-white/20"
                            )}
                        >
                            <span className="font-medium">{languageNames[langCode]}</span>
                            {language === langCode && <Check className="w-4 h-4 text-primary" />}
                        </button>
                    ))}
                </div>
            </section>

            {/* Theme Settings */}
            <section className="glass-panel p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-secondary/20 rounded-lg">
                        {theme === 'dark' ? (
                            <Moon className="w-5 h-5 text-secondary" />
                        ) : (
                            <Sun className="w-5 h-5 text-secondary" />
                        )}
                    </div>
                    <h2 className="text-lg font-semibold">
                        {t('settings.appearance') || 'Appearance'}
                    </h2>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                    {t('settings.themeDescription') || 'Customize the look and feel of the application'}
                </p>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setThemeMode('dark')}
                        className={clsx(
                            "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all",
                            theme === 'dark'
                                ? "bg-primary/20 border-primary/40"
                                : "border-white/10 text-text-secondary hover:bg-white/5"
                        )}
                    >
                        <Moon className="w-5 h-5" />
                        <span className="font-medium">{t('settings.darkMode') || 'Dark Mode'}</span>
                        {theme === 'dark' && <Check className="w-4 h-4 text-primary ml-auto" />}
                    </button>
                    <button
                        onClick={() => setThemeMode('light')}
                        className={clsx(
                            "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all",
                            theme === 'light'
                                ? "bg-primary/20 border-primary/40"
                                : "border-white/10 text-text-secondary hover:bg-white/5"
                        )}
                    >
                        <Sun className="w-5 h-5" />
                        <span className="font-medium">{t('settings.lightMode') || 'Light Mode'}</span>
                        {theme === 'light' && <Check className="w-4 h-4 text-primary ml-auto" />}
                    </button>
                </div>
            </section>

            {/* Data Export */}
            <section className="glass-panel p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-success/20 rounded-lg">
                        <Download className="w-5 h-5 text-success" />
                    </div>
                    <h2 className="text-lg font-semibold">
                        {t('settings.dataExport') || 'Data Export'}
                    </h2>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                    Choose a year and export a PDF with Overview, State Comparison, and Gender Analysis insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <select
                        value={selectedExportYear}
                        onChange={(e) => setSelectedExportYear(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                    >
                        {exportYears.map(year => (
                            <option key={year} value={year} className="bg-surface">{year}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleExportData}
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-success/20 border border-success/30 text-white hover:bg-success/30 transition-all font-medium"
                    >
                        <FileText className="w-5 h-5" />
                        Download PDF
                    </button>
                </div>
            </section>



            {/* Logout Section */}
            <section className="glass-panel p-6 rounded-xl border-danger/20">
                <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-danger/10 border border-danger/30 text-danger hover:bg-danger/20 hover:border-danger/50 transition-all font-medium"
                >
                    <LogOut className="w-5 h-5" />
                    <span>{t('nav.logout') || 'Logout'}</span>
                </button>
            </section>
        </div>
    );
};

export default Settings;
