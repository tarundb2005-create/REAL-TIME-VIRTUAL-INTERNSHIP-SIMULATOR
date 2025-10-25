import React from 'react';
import type { User } from '../types';

interface DashboardProps {
    user: User;
    onStartInternship: () => void;
    onResumeInternship: () => void;
    hasSavedProgress: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onStartInternship, onResumeInternship, hasSavedProgress }) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-10 text-center">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Welcome back, {user.name}!</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">Ready to build your career?</p>

                <div className="mt-8 text-left border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Your Profile</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">University</span>
                            <span className="text-lg text-gray-800 dark:text-gray-100">{user.university}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Major</span>
                            <span className="text-lg text-gray-800 dark:text-gray-100">{user.major}</span>
                        </div>
                         <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</span>
                            <span className="text-lg text-gray-800 dark:text-gray-100">{user.email}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-center gap-4">
                    {hasSavedProgress ? (
                        <>
                            <button
                                onClick={onResumeInternship}
                                className="w-full max-w-xs px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                Resume Internship
                            </button>
                            <button
                                onClick={onStartInternship}
                                className="w-full max-w-xs px-6 py-3 text-md font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300"
                            >
                                Start New (discards progress)
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onStartInternship}
                            className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            Start a New Internship
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;