import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem('edu-retain-theme');
        return savedTheme || 'dark';
    });

    useEffect(() => {
        // Save theme to localStorage
        localStorage.setItem('edu-retain-theme', theme);
        
        // Apply theme class to document root
        if (theme === 'light') {
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
        } else {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const setThemeMode = (mode) => {
        setTheme(mode);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
