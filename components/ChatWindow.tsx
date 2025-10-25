
import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';
import MessageComponent from './Message';
import LoadingSpinner from './LoadingSpinner';
import { SendIcon } from './icons';

interface ChatWindowProps {
    chatHistory: Message[];
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatHistory, onSendMessage, isLoading }) => {
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
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-6">
                    {chatHistory.map((msg, index) => (
                        <MessageComponent key={index} message={msg} />
                    ))}
                    {isLoading && (
                        <div className="flex justify-start items-center gap-4">
                            <img src="https://picsum.photos/seed/mentor/40/40" alt="Mentor" className="rounded-full h-10 w-10"/>
                            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-3">
                                <LoadingSpinner />
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="flex items-center gap-4">
                    <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                        placeholder="Type your submission or questions here..."
                        className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                        rows={2}
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !userInput.trim()}
                        className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <SendIcon className="h-6 w-6" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatWindow;
