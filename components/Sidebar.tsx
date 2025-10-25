import React from 'react';
import type { InternshipDetails, InternshipTrack } from '../types';
import { AIEngineerIcon, DataScientistIcon, MarketingIcon, ProductManagerIcon, SoftwareEngineerIcon, BriefcaseIcon, DashboardIcon, CybersecurityIcon, UXDesignIcon } from './icons';

interface SidebarProps {
    selectedInternship: InternshipDetails | null;
    onBackToDashboard: () => void;
}

const trackIcons: Record<InternshipTrack, React.ReactNode> = {
    'AI': <AIEngineerIcon className="h-6 w-6" />,
    'Data Science': <DataScientistIcon className="h-6 w-6" />,
    'Software Engineering': <SoftwareEngineerIcon className="h-6 w-6" />,
    'Marketing': <MarketingIcon className="h-6 w-6" />,
    'Product Management': <ProductManagerIcon className="h-6 w-6" />,
    'Cybersecurity': <CybersecurityIcon className="h-6 w-6" />,
    'UX Design': <UXDesignIcon className="h-6 w-6" />,
};


const Sidebar: React.FC<SidebarProps> = ({ selectedInternship, onBackToDashboard }) => {
    return (
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 flex-col justify-between hidden lg:flex">
            <div>
                <button
                    onClick={onBackToDashboard}
                    className="flex items-center p-3 mb-6 w-full rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <DashboardIcon className="h-6 w-6" />
                    <span className="ml-3 font-medium">Dashboard</span>
                </button>
                {selectedInternship && (
                    <>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">Your Internship</h2>
                        <div className="space-y-4">
                             <div className="flex items-center p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                                {trackIcons[selectedInternship.track]}
                                <span className="ml-3 font-medium">{selectedInternship.track}</span>
                            </div>
                             <div className="flex items-center p-3 rounded-lg text-gray-600 dark:text-gray-300">
                                <BriefcaseIcon className="h-6 w-6"/>
                                <span className="ml-3 font-medium">{selectedInternship.company}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                <p>&copy; 2024 Internship Simulator</p>
                <p>Powered by Gemini</p>
            </div>
        </aside>
    );
};

export default Sidebar;