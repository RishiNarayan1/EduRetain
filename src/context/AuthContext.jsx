import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Normalize user object to consistently expose fullName
    const normalizeUser = (rawUser) => {
        if (!rawUser) return null;
        const fullName = rawUser.fullName || rawUser.name;
        return {
            ...rawUser,
            fullName,
            name: fullName || rawUser.name,
        };
    };

    useEffect(() => {
        // Check for active session
        const storedUser = localStorage.getItem('edu-retain-current-user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(normalizeUser(parsedUser));
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            const responseText = await response.text();
            let userData;

            try {
                userData = responseText ? JSON.parse(responseText) : null;
            } catch (e) {
                console.error('Failed to parse (login):', responseText);
                throw new Error('Server error: Invalid response format');
            }

            if (!response.ok) {
                throw new Error((userData && userData.message) || `Login failed (${response.status})`);
            }

            if (!userData) {
                throw new Error('Server returned empty response');
            }

            const normalizedUser = normalizeUser(userData);
            setUser(normalizedUser);
            setIsAuthenticated(true);
            localStorage.setItem('edu-retain-current-user', JSON.stringify(normalizedUser));
            return normalizedUser;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const payload = {
                email: userData.email,
                password: userData.password,
                fullName: userData.fullName || userData.name,
            };

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                credentials: 'include',
            });

            const responseText = await response.text();
            let newUser;

            try {
                newUser = responseText ? JSON.parse(responseText) : null;
            } catch (e) {
                console.error('Failed to parse (register):', responseText);
                throw new Error('Server error: Invalid response format');
            }

            if (!response.ok) {
                throw new Error((newUser && newUser.message) || `Registration failed (${response.status})`);
            }

            if (!newUser) {
                throw new Error('Server returned empty response');
            }

            // Optionally log them in automatically or require login
            return newUser;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('edu-retain-current-user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
