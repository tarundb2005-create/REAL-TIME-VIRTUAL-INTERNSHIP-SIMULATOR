import React from 'react';
import { LogoIcon, SunIcon, MoonIcon, SystemIcon } from './icons';
import type { User, Theme } from '../types';

interface HeaderProps {
    user: User;
    onSignOut: () => void;
    theme: Theme;
    onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onSignOut, theme, onThemeToggle }) => {

    const renderThemeIcon = () => {
        switch (theme) {
            case 'light':
                return <SunIcon className="h-6 w-6" />;
            case 'dark':
                return <MoonIcon className="h-6 w-6" />;
            case 'system':
                return <SystemIcon className="h-6 w-6" />;
            default:
                return null;
        }
    };

    return (
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3">
                <LogoIcon className="h-8 w-8 text-blue-600 dark:text-blue-500" />
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Real-Time Virtual Internship Simulator
                </h1>
            </div>
            <div className="flex items-center gap-4">
                 <button
                    onClick={onThemeToggle}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-gray-800 focus:ring-blue-500"
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} mode`}
                >
                    {renderThemeIcon()}
                </button>
                 <div className="text-right">
                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                 </div>
                 <button 
                    onClick={onSignOut}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                 >
                    Sign Out
                 </button>
            </div>
        </header>
    );
};

export default Header;