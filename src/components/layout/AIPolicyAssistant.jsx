import React, { useState } from 'react';
import { Bot, ChevronRight, ChevronLeft, Lightbulb, X } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const AIPolicyAssistant = () => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const suggestions = [
        {
            id: 1,
            type: 'critical',
            titleKey: 'ai.suggestions.critical1.title',
            messageKey: 'ai.suggestions.critical1.message',
            recommendationKey: 'ai.suggestions.critical1.recommendation'
        },
        {
            id: 2,
            type: 'warning',
            titleKey: 'ai.suggestions.warning1.title',
            messageKey: 'ai.suggestions.warning1.message',
            recommendationKey: 'ai.suggestions.warning1.recommendation'
        },
        {
            id: 3,
            type: 'info',
            titleKey: 'ai.suggestions.info1.title',
            messageKey: 'ai.suggestions.info1.message',
            recommendationKey: 'ai.suggestions.info1.recommendation'
        }
    ];

    const handleGenerateReport = () => {
        const reportContent = suggestions.map(s =>
            `[${s.type.toUpperCase()}] ${t(s.titleKey)}\nProblem: ${t(s.messageKey)}\n${t('ai.recommendation')}: ${t(s.recommendationKey)}\n`
        ).join('\n----------------------------------------\n\n');

        const header = "EduRetain - AI Policy Analysis Report\nGenerated on: " + new Date().toLocaleString() + "\n\n";
        const fullContent = header + reportContent;

        const blob = new Blob([fullContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'EduRetain_Policy_Report.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={clsx(
                    "fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-primary text-white p-3 rounded-l-xl shadow-lg transition-transform duration-300 hover:bg-primary/90",
                    isOpen ? "translate-x-full" : "translate-x-0"
                )}
            >
                <Bot className="w-6 h-6" />
            </button>

            {/* Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-screen w-80 glass-panel z-50 border-l border-white/10 shadow-2xl"
                    >
                        <div className="p-6 h-full flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2">
                                    <Bot className="w-6 h-6 text-primary" />
                                    <h2 className="text-xl font-bold text-white">{t('ai.title')}</h2>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-text-secondary hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
                                {suggestions.map((item) => (
                                    <div key={item.id} className="bg-surface/50 border border-white/5 rounded-xl p-4 hover:bg-surface/80 transition-colors">
                                        <div className="flex items-start gap-3 mb-2">
                                            <div className={clsx(
                                                "p-2 rounded-lg",
                                                item.type === 'critical' ? 'bg-danger/20 text-danger' :
                                                    item.type === 'warning' ? 'bg-warning/20 text-warning' :
                                                        'bg-success/20 text-success'
                                            )}>
                                                <Lightbulb className="w-4 h-4" />
                                            </div>
                                            <h3 className="font-bold text-white text-sm leading-tight">{t(item.titleKey)}</h3>
                                        </div>
                                        <p className="text-xs text-text-secondary mb-3">{t(item.messageKey)}</p>
                                        <div className="bg-white/5 p-3 rounded-lg">
                                            <p className="text-xs font-medium text-primary">{t('ai.recommendation')}:</p>
                                            <p className="text-xs text-white mt-1">{t(item.recommendationKey)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/10">
                                <button
                                    onClick={handleGenerateReport}
                                    className="w-full py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors"
                                >
                                    {t('ai.generateReport')}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIPolicyAssistant;
