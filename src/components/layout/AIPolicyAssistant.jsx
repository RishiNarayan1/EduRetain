
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Download, Loader2, Sparkles, FileText } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { generateDropoutAnalysis } from '../../services/geminiService';
import { newDorData, getNewStates } from '../../utils/newDorData';
import { dorRawData, getStates } from '../../utils/dorDataParser';
import jsPDF from 'jspdf';

const AIPolicyAssistant = () => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { 
            id: 'init', 
            role: 'model', 
            text: "Hello! 👋 Welcome to EduRetain AI Assistant!\n\nI'm here to help you explore and understand educational dropout trends across India. I can assist you with:\n\n• Analyzing dropout rates for specific states\n• Comparing trends across different years\n• Gender-wise analysis of dropout patterns\n• Generating detailed policy reports\n\nFeel free to ask me questions like:\n\"What are the dropout rates in Kerala?\"\n\"Compare boys vs girls dropout in 2021\"\n\"Show trends for Secondary education\"\n\nHow may I assist you today?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Gather all available unique states for context detection
    const allStates = Array.from(new Set([...getStates(), ...getNewStates()]));

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            // Context Detection
            const lowerInput = userMessage.text.toLowerCase();
            const detectedState = allStates.find(s => lowerInput.includes(s.toLowerCase()));
            
            let contextData = {};
            
            if (detectedState) {
                // Fetch data specific to the state
                const newData = newDorData.filter(d => d.state === detectedState);
                const oldData = dorRawData.filter(d => d.state === detectedState);
                contextData = {
                    state: detectedState,
                    recentData: newData,
                    historicalData: oldData,
                    note: "Data includes 2012-2015 (historical) and 2017-2022 (recent). Recent data has synthetic gender breakdown."
                };
            } else {
                // General context - provide national averages or top level stats
                // Filtering to keep context size manageable
                const recentNational = newDorData.filter(d => d.state === "All India");
                const oldNational = dorRawData.filter(d => d.state === "All India");
                contextData = {
                    scope: "National",
                    recentNationalAverages: recentNational,
                    historicalNationalAverages: oldNational,
                    availableStates: allStates
                };
            }

            // Call Gemini
            const analysis = await generateDropoutAnalysis(userMessage.text, contextData);

            const botMessage = {
                id: Date.now() + 1,
                role: 'model',
                text: analysis.chatResponse,
                reportContent: analysis.detailedReport,
                insights: analysis.keyInsights
            };

            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { 
                id: Date.now() + 1, 
                role: 'model', 
                text: "I sincerely apologize for the inconvenience! I'm experiencing a temporary issue while processing your request. 🙏\n\nPlease try one of the following:\n\n• Rephrase your question with more specific details\n• Explore the interactive dashboard charts above\n• Try asking about a specific state or education level\n\nI'm here to help, so please don't hesitate to ask again. Thank you for your patience!" 
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleDownloadReport = (content, title = "Analysis Report") => {
        const doc = new jsPDF();
        
        // Header
        doc.setFillColor(30, 41, 59); // Dark blue header
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text("EduRetain AI Analysis", 20, 25);
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 150, 25);
        
        // Content
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        
        const splitText = doc.splitTextToSize(content, 170);
        let y = 50;
        
        // Simple pagination
        splitText.forEach(line => {
            if (y > 280) {
                doc.addPage();
                y = 20;
            }
            doc.text(line, 20, y);
            y += 7;
        });

        doc.save(`${title.replace(/\s+/g, '_')}_EduRetain.pdf`);
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
                <div className="relative">
                    <Bot className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                    </span>
                </div>
            </button>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-screen w-96 glass-panel z-50 border-l border-white/10 shadow-2xl flex flex-col backdrop-blur-xl bg-slate-900/95"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary/20 rounded-lg">
                                    <Sparkles className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">AI Assistant</h2>
                                    <p className="text-xs text-text-secondary">Powered by Gemini</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-text-secondary hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                            {messages.map((msg) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={msg.id}
                                    className={clsx(
                                        "flex gap-3",
                                        msg.role === 'user' ? "justify-end" : "justify-start"
                                    )}
                                >
                                    {msg.role === 'model' && (
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-5 h-5 text-primary" />
                                        </div>
                                    )}
                                    
                                    <div className={clsx(
                                        "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed",
                                        msg.role === 'user' 
                                            ? "bg-primary text-white rounded-tr-none" 
                                            : "bg-white/10 text-text-secondary rounded-tl-none border border-white/5"
                                    )}>
                                        <p className="whitespace-pre-wrap">{msg.text}</p>
                                        
                                        {/* Key Insights Chips */}
                                        {msg.insights && msg.insights.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {msg.insights.map((insight, idx) => (
                                                    <span key={idx} className="text-xs px-2 py-1 bg-white/5 rounded-full border border-white/10 text-accent">
                                                        {insight}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Download Report Button */}
                                        {msg.reportContent && (
                                            <button
                                                onClick={() => handleDownloadReport(msg.reportContent)}
                                                className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors w-full justify-center group"
                                            >
                                                <FileText className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                                                <span className="text-white font-medium">Download Full Report</span>
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            
                            {isTyping && (
                                <div className="flex gap-3 justify-start">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 text-primary animate-spin" />
                                        <span className="text-xs text-text-secondary">Analyzing data...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white/5 border-t border-white/10">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your question here..."
                                    className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-500"
                                    disabled={isTyping}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className="p-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-primary/20"
                                >
                                    <Send className="w-5 h-5" />
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
