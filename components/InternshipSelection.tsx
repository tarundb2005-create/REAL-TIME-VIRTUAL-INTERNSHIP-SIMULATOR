import React, { useState } from 'react';
import type { InternshipTrack, InternshipDetails } from '../types';
import { AIEngineerIcon, DataScientistIcon, MarketingIcon, ProductManagerIcon, SoftwareEngineerIcon, GoogleIcon, CybersecurityIcon, UXDesignIcon, BriefcaseIcon, AmazonIcon, MetaIcon, NetflixIcon, AppleIcon, AtlassianIcon, ZohoIcon } from './icons';

interface InternshipSelectionProps {
    onSelect: (details: InternshipDetails) => void;
    error: string | null;
}

// --- Data Structure ---
interface TrackInfo {
    track: InternshipTrack;
    description: string;
    icon: React.ReactNode;
}

interface CompanyInfo {
    name: string;
    icon: React.ReactNode;
    tracks: TrackInfo[];
}

const companies: CompanyInfo[] = [
    {
        name: 'Google',
        icon: <GoogleIcon className="h-10 w-10" />,
        tracks: [
            { track: 'Data Science', description: "Analyze user data from products like YouTube and Search.", icon: <DataScientistIcon className="h-10 w-10 mx-auto mb-4 text-blue-500"/> },
            { track: 'AI', description: "Develop and train large-scale models in Google's AI division.", icon: <AIEngineerIcon className="h-10 w-10 mx-auto mb-4 text-purple-500"/> }
        ]
    },
    {
        name: 'Amazon',
        icon: <AmazonIcon className="h-10 w-10" />,
        tracks: [
            { track: 'Software Engineering', description: "Work on the backbone of AWS, the world's largest cloud platform.", icon: <SoftwareEngineerIcon className="h-10 w-10 mx-auto mb-4 text-green-500"/> },
            { track: 'Data Science', description: "Analyze customer behavior to personalize the e-commerce experience.", icon: <DataScientistIcon className="h-10 w-10 mx-auto mb-4 text-blue-500"/> }
        ]
    },
    {
        name: 'Meta',
        icon: <MetaIcon className="h-10 w-10" />,
        tracks: [
            { track: 'AI', description: "Develop cutting-edge models for the Metaverse and Reality Labs.", icon: <AIEngineerIcon className="h-10 w-10 mx-auto mb-4 text-purple-500"/> },
            { track: 'Product Management', description: "Shape the future of social connection on Instagram and Facebook.", icon: <ProductManagerIcon className="h-10 w-10 mx-auto mb-4 text-red-500"/> }
        ]
    },
    {
        name: 'Netflix',
        icon: <NetflixIcon className="h-10 w-10" />,
        tracks: [
            { track: 'Software Engineering', description: "Optimize the high-performance streaming infrastructure.", icon: <SoftwareEngineerIcon className="h-10 w-10 mx-auto mb-4 text-green-500"/> },
            { track: 'Marketing', description: "Craft campaigns for blockbuster original series and films.", icon: <MarketingIcon className="h-10 w-10 mx-auto mb-4 text-yellow-500"/> }
        ]
    },
    {
        name: 'Apple',
        icon: <AppleIcon className="h-10 w-10" />,
        tracks: [
            { track: 'UX Design', description: "Design elegant interfaces for the next generation of Apple devices.", icon: <UXDesignIcon className="h-10 w-10 mx-auto mb-4 text-pink-500"/> },
            { track: 'Software Engineering', description: "Build powerful applications for the iOS and macOS ecosystems.", icon: <SoftwareEngineerIcon className="h-10 w-10 mx-auto mb-4 text-green-500"/> }
        ]
    },
     {
        name: 'JPMorgan Chase',
        icon: <BriefcaseIcon className="h-10 w-10 text-cyan-500" />,
        tracks: [
            { track: 'Cybersecurity', description: "Defend a leading global financial institution from threats.", icon: <CybersecurityIcon className="h-10 w-10 mx-auto mb-4 text-indigo-500"/> },
            { track: 'Software Engineering', description: "Engineer high-frequency trading and fintech platforms.", icon: <SoftwareEngineerIcon className="h-10 w-10 mx-auto mb-4 text-green-500"/> }
        ]
    },
    {
        name: 'Atlassian',
        icon: <AtlassianIcon className="h-10 w-10" />,
        tracks: [
            { track: 'Product Management', description: "Drive the roadmap for collaboration tools like Jira and Confluence.", icon: <ProductManagerIcon className="h-10 w-10 mx-auto mb-4 text-red-500"/> },
        ]
    },
    {
        name: 'Zoho',
        icon: <ZohoIcon className="h-10 w-10" />,
        tracks: [
             { track: 'Software Engineering', description: "Develop a wide range of SaaS applications for businesses.", icon: <SoftwareEngineerIcon className="h-10 w-10 mx-auto mb-4 text-green-500"/> }
        ]
    },
    {
        name: 'SecureNet',
        icon: <BriefcaseIcon className="h-10 w-10 text-indigo-500" />,
        tracks: [
            { track: 'Cybersecurity', description: "Protect systems and data from digital threats and breaches.", icon: <CybersecurityIcon className="h-10 w-10 mx-auto mb-4 text-indigo-500"/> }
        ]
    },
    {
        name: 'CreativeFlow',
        icon: <BriefcaseIcon className="h-10 w-10 text-pink-500" />,
        tracks: [
            { track: 'UX Design', description: "Craft intuitive and beautiful user-centric digital experiences.", icon: <UXDesignIcon className="h-10 w-10 mx-auto mb-4 text-pink-500"/> }
        ]
    },
];


const InternshipSelection: React.FC<InternshipSelectionProps> = ({ onSelect, error }) => {
    const [selectedCompany, setSelectedCompany] = useState<CompanyInfo | null>(null);

    const handleCompanySelect = (company: CompanyInfo) => {
        setSelectedCompany(company);
    };

    const handleTrackSelect = (track: TrackInfo) => {
        if (selectedCompany) {
            onSelect({
                track: track.track,
                company: selectedCompany.name,
                description: track.description
            });
        }
    };

    const renderCompanySelection = () => (
        <>
            <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100">Start a New Internship</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">First, choose a company to intern with.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {companies.map(company => (
                    <button
                        key={company.name}
                        onClick={() => handleCompanySelect(company)}
                        className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 flex flex-col items-center justify-center text-center"
                    >
                        <div className="mb-4">{company.icon}</div>
                        <h2 className="text-xl font-semibold">{company.name}</h2>
                    </button>
                ))}
            </div>
        </>
    );

    const renderTrackSelection = () => {
        if (!selectedCompany) return null;

        return (
            <>
                <div className="flex items-center w-full mb-10 relative justify-center">
                    <button onClick={() => setSelectedCompany(null)} className="absolute left-0 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                        &larr; Back to Companies
                    </button>
                    <div className="text-center">
                         <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                           Internships at {selectedCompany.name}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">Choose your desired role.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {selectedCompany.tracks.map(track => (
                        <button
                            key={track.track}
                            onClick={() => handleTrackSelect(track)}
                            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 flex flex-col justify-between"
                        >
                            <div>
                                {track.icon}
                                <h2 className="text-xl font-semibold">{track.track}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{track.description}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-5xl text-center">
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">{error}</div>}
                
                {selectedCompany ? renderTrackSelection() : renderCompanySelection()}
            </div>
        </div>
    );
};

export default InternshipSelection;