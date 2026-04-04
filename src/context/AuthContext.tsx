import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // Check for saved login state on mount
    useEffect(() => {
        const savedAuth = localStorage.getItem('eventify_auth');
        if (savedAuth) {
            const authData = JSON.parse(savedAuth);
            setIsLoggedIn(true);
            setUser(authData.user);
        }
    }, []);

    const login = async (email: string, _password: string) => {
        // Mock login logic
        const mockUser = {
            name: 'Shivam Gupta',
            email: email,
            role: 'Organizer'
        };
        setIsLoggedIn(true);
        setUser(mockUser);
        localStorage.setItem('eventify_auth', JSON.stringify({ isLoggedIn: true, user: mockUser }));
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('eventify_auth');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
