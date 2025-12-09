import React from 'react';
import Sidebar from './Sidebar';
import AIPolicyAssistant from './AIPolicyAssistant';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-background text-text-primary font-sans selection:bg-primary/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[100px]" />
            </div>

            <Sidebar />
            <AIPolicyAssistant />

            <main className="ml-64 p-8 relative z-10 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
