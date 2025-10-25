import React from 'react';
import type { InternshipDetails, Task, Message, Evaluation } from '../types';
import TaskCard from './TaskCard';
import ChatWindow from './ChatWindow';
import EvaluationPanel from './EvaluationPanel';
import TeamChatPanel from './TeamChatPanel';
import { BriefcaseIcon, AcademicCapIcon, PlaygroundIcon } from './icons';

interface DashboardProps {
    internshipDetails: InternshipDetails;
    currentTask: Task;
    chatHistory: Message[];
    teamChatHistory: Message[];
    evaluation: Evaluation;
    isMentorLoading: boolean;
    isColleagueLoading: boolean;
    onSendMessageToMentor: (message: string) => void;
    onSendMessageToColleague: (message: string) => void;
    onViewPlayground: () => void;
    onViewLearningHub: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
    internshipDetails,
    currentTask,
    chatHistory,
    teamChatHistory,
    evaluation,
    isMentorLoading,
    isColleagueLoading,
    onSendMessageToMentor,
    onSendMessageToColleague,
    onViewPlayground,
    onViewLearningHub,
}) => {
    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-8 gap-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        {internshipDetails.track} Internship
                    </h1>
                    <div className="flex items-center text-md text-gray-500 dark:text-gray-400 mt-1">
                        <BriefcaseIcon className="h-5 w-5 mr-2" />
                        <span>{internshipDetails.company}</span>
                    </div>
                </div>
                 <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <button 
                        onClick={onViewLearningHub}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 transition"
                    >
                       <AcademicCapIcon className="h-5 w-5"/> Learning Hub
                    </button>
                    <button 
                        onClick={onViewPlayground}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 transition"
                    >
                        <PlaygroundIcon className="h-5 w-5"/> Gemini Playground
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Left Column: Task & Evaluation */}
                <div className="xl:col-span-1 space-y-6">
                    <TaskCard task={currentTask} />
                    <EvaluationPanel evaluation={evaluation} />
                </div>
                
                {/* Middle Column: Mentor Chat */}
                <div className="xl:col-span-1 h-[75vh]">
                     <ChatWindow
                        chatHistory={chatHistory}
                        onSendMessage={onSendMessageToMentor}
                        isLoading={isMentorLoading}
                    />
                </div>

                {/* Right Column: Team Chat & other panels */}
                <div className="xl:col-span-1 space-y-6">
                    <TeamChatPanel
                        chatHistory={teamChatHistory}
                        onSendMessage={onSendMessageToColleague}
                        isLoading={isColleagueLoading}
                    />
                </div>

            </div>
        </div>
    );
};

export default Dashboard;