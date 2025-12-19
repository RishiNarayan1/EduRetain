import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-background text-text-primary font-sans selection:bg-primary/30 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Gradients - Similar to MainLayout but maybe more centered or subtle */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px]" />
            </div>

            {/* Content Container */}
            <div className="w-full max-w-md relative z-10">
                 <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
