
import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
    );
};

export default LoadingSpinner;
