import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import clsx from 'clsx';

const StatCard = ({ title, value, change, trend, icon: Icon, color }) => {
    return (
        <div className="glass-card p-6 relative overflow-hidden group">
            <div className={clsx("absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity", color)}>
                <Icon className="w-24 h-24" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className={clsx("p-2 rounded-lg bg-white/5", color)}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-text-secondary font-medium">{title}</h3>
                </div>

                <div className="flex items-end gap-3">
                    <span className="text-3xl font-bold text-white">{value}</span>
                    {change && (
                        <div className={clsx("flex items-center text-sm font-medium mb-1",
                            trend === 'up' ? 'text-danger' : 'text-success' // Higher dropout is bad (danger), lower is good (success)
                        )}>
                            {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                            <span>{change}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
