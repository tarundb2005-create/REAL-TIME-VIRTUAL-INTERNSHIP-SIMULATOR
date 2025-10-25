import React from 'react';
import type { InternshipTrack, InternshipDetails } from '../types';
import { AIEngineerIcon, DataScientistIcon, MarketingIcon, ProductManagerIcon, SoftwareEngineerIcon, GoogleIcon, CybersecurityIcon, UXDesignIcon } from './icons';

interface InternshipSelectionProps {
    onSelect: (details: InternshipDetails) => void;
    error: string | null;
}

interface TrackInfo {
    track: InternshipTrack;
    company: string;
    description: string;
    icon: React.ReactNode;
    companyIcon?: React.ReactNode;
}

const tracks: TrackInfo[] = [
    { 
        track: 'Data Science', 
        company: 'Google',
        icon: <DataScientistIcon className="h-10 w-10 mx-auto mb-4 text-blue-500"/>, 
        companyIcon: <GoogleIcon className="h-5 w-5"/>,
        description: "Analyze user data from products like YouTube and Search." 
    },
    { 
        track: 'Software Engineering', 
        company: 'CodeCrafters',
        icon: <SoftwareEngineerIcon className="h-10 w-10 mx-auto mb-4 text-green-500"/>, 
        description: "Design, build, and maintain robust software applications." 
    },
    { 
        track: 'AI', 
        company: 'InnovateAI',
        icon: <AIEngineerIcon className="h-10 w-10 mx-auto mb-4 text-purple-500"/>, 
        description: "Build intelligent systems and machine learning models." 
    },
    { 
        track: 'Cybersecurity', 
        company: 'SecureNet',
        icon: <CybersecurityIcon className="h-10 w-10 mx-auto mb-4 text-indigo-500"/>, 
        description: "Protect systems and data from digital threats and breaches." 
    },
    { 
        track: 'UX Design', 
        company: 'CreativeFlow',
        icon: <UXDesignIcon className="h-10 w-10 mx-auto mb-4 text-pink-500"/>, 
        description: "Craft intuitive and beautiful user-centric digital experiences." 
    },
    { 
        track: 'Product Management', 
        company: 'Visionary Products',
        icon: <ProductManagerIcon className="h-10 w-10 mx-auto mb-4 text-red-500"/>, 
        description: "Guide product strategy from conception to launch." 
    },
    { 
        track: 'Marketing', 
        company: 'GrowthLeap',
        icon: <MarketingIcon className="h-10 w-10 mx-auto mb-4 text-yellow-500"/>, 
        description: "Create and execute strategies to promote products." 
    },
];

const InternshipSelection: React.FC<InternshipSelectionProps> = ({ onSelect, error }) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-5xl text-center">
                <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100">Start a New Internship</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Choose your path and gain real-world experience, powered by AI.</p>
                
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">{error}</div>}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tracks.map(track => (
                        <button
                            key={`${track.track}-${track.company}`}
                            onClick={() => onSelect({ track: track.track, company: track.company, description: track.description })}
                            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 flex flex-col justify-between"
                        >
                            <div>
                                {track.icon}
                                <h2 className="text-xl font-semibold">{track.track}</h2>
                                 <div className="flex items-center justify-center gap-2 mt-1 mb-2">
                                    {track.companyIcon}
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{track.company}</p>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{track.description}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InternshipSelection;