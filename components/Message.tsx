
import React from 'react';
import type { Message } from '../types';

interface MessageProps {
    message: Message;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
    const isMentor = message.author === 'mentor';
    const isColleague = message.author === 'colleague';
    const isAI = isMentor || isColleague;

    const bubbleClasses = isAI
        ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-r-lg rounded-bl-lg'
        : 'bg-blue-600 text-white rounded-l-lg rounded-br-lg';
    
    const containerClasses = isAI ? 'justify-start' : 'justify-end';

    const avatarUrl = isMentor 
        ? 'https://picsum.photos/seed/mentor/40/40' 
        : isColleague
        ? 'https://picsum.photos/seed/colleague/40/40'
        : 'https://picsum.photos/seed/user/40/40';
        
    const avatarAlt = isMentor ? "Mentor" : isColleague ? "Colleague" : "User";

    return (
        <div className={`flex items-start gap-4 ${containerClasses}`}>
            {isAI && <img src={avatarUrl} alt={avatarAlt} className="rounded-full h-10 w-10 flex-shrink-0" />}
            <div className={`max-w-xl p-4 whitespace-pre-wrap ${bubbleClasses}`}>
                {message.text}
            </div>
            {!isAI && <img src={avatarUrl} alt={avatarAlt} className="rounded-full h-10 w-10 flex-shrink-0" />}
        </div>
    );
};

export default MessageComponent;