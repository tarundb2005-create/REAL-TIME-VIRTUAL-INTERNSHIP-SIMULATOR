import React from 'react';
import type { CertificateData } from '../types';
import { LogoIcon } from './icons';

interface CertificateProps {
    certificate: CertificateData;
    onBackToDashboard: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ certificate, onBackToDashboard }) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-10 border-4 border-blue-500 relative">
                     <div className="absolute top-8 left-8">
                        <LogoIcon className="h-16 w-16 text-blue-500" />
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-semibold text-gray-500 dark:text-gray-400 tracking-widest uppercase">
                            Certificate of Completion
                        </p>
                        <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mt-8">
                            {certificate.userName}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                            has successfully completed the
                        </p>
                        <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mt-2">
                            {certificate.internshipTrack} Virtual Internship
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                            at <span className="font-bold">{certificate.company}</span>
                        </p>
                        <div className="mt-10 border-t-2 border-gray-300 dark:border-gray-600 w-1/3 mx-auto"></div>
                        <div className="flex justify-between items-center mt-6">
                             <div>
                                <p className="font-semibold text-gray-700 dark:text-gray-200">Date Issued</p>
                                <p className="text-gray-500 dark:text-gray-400">{certificate.completionDate}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-700 dark:text-gray-200">Certificate ID</p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs font-mono">{certificate.id}</p>
                            </div>
                        </div>
                    </div>
                </div>
                 <div className="text-center mt-8">
                    <button
                        onClick={onBackToDashboard}
                        className="px-6 py-3 text-md font-semibold text-white bg-gray-600 rounded-lg shadow-lg hover:bg-gray-700 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-400"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Certificate;
