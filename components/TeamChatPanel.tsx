
import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';
import MessageComponent from './Message';
import LoadingSpinner from './LoadingSpinner';
import { SendIcon } from './icons';

interface TeamChatPanelProps {
    chatHistory: Message[];
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

const TeamChatPanel: React.FC<TeamChatPanelProps> = ({ chatHistory, onSendMessage, isLoading }) => {
    const [userInput, setUserInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory, isLoading]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userInput.trim() && !isLoading) {
            onSendMessage(userInput);
            setUserInput('');
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col h-96">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 text-center border-b dark:border-gray-700 pb-2">Team Chat</h3>
            <div className="flex-1 overflow-y-auto pr-2">
                <div className="space-y-4">
                     {chatHistory.map((msg, index) => (
                        <MessageComponent key={index} message={msg} />
                    ))}
                    {isLoading && (
                        <div className="flex justify-start items-center gap-4">
                            <img src="https://picsum.photos/seed/colleague/40/40" alt="Colleague" className="rounded-full h-10 w-10"/>
                            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-3">
                                <LoadingSpinner />
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
            </div>
             <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask a colleague..."
                        className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !userInput.trim()}
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <SendIcon className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TeamChatPanel;
