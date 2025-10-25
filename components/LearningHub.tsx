import React from 'react';
import { BookOpenIcon, VideoCameraIcon, CodeBracketIcon, ArrowLeftIcon } from './icons';

interface LearningResource {
    title: string;
    description: string;
    type: 'Article' | 'Video' | 'CodeLab';
    icon: React.ReactNode;
    link: string;
}

const resources: LearningResource[] = [
    {
        title: "Introduction to Large Language Models",
        description: "A comprehensive article from Google AI on the fundamentals of LLMs.",
        type: "Article",
        icon: <BookOpenIcon className="h-8 w-8 text-blue-500" />,
        link: "https://ai.google/discover/llms/"
    },
    {
        title: "Building with the Gemini API",
        description: "Official video tutorial series on how to get started with Gemini for your own projects.",
        type: "Video",
        icon: <VideoCameraIcon className="h-8 w-8 text-red-500" />,
        link: "https://www.youtube.com/watch?v=sT61ctL2c0Y"
    },
    {
        title: "Prompt Design 101",
        description: "Learn the art and science of crafting effective prompts to get the best results from generative models.",
        type: "Article",
        icon: <BookOpenIcon className="h-8 w-8 text-blue-500" />,
        link: "https://ai.google.dev/docs/prompt_best_practices"
    },
    {
        title: "CodeLab: Grounded Responses with Google Search",
        description: "A hands-on coding exercise to implement a research assistant using Gemini and Search grounding.",
        type: "CodeLab",
        icon: <CodeBracketIcon className="h-8 w-8 text-green-500" />,
        link: "https://codelabs.developers.google.com/gemini-api-react-grounding"
    },
    {
        title: "Multi-modal Magic: Working with Images",
        description: "Explore how to use Gemini's multi-modal capabilities to analyze and understand images.",
        type: "Video",
        icon: <VideoCameraIcon className="h-8 w-8 text-red-500" />,
        link: "https://www.youtube.com/watch?v=kAmvVbZ-Fsg"
    },
     {
        title: "The Gemini Era: A New Frontier in AI",
        description: "Discover the vision behind the Gemini models and what makes them a significant leap forward.",
        type: "Article",
        icon: <BookOpenIcon className="h-8 w-8 text-blue-500" />,
        link: "https://blog.google/technology/ai/google-gemini-ai/"
    }
];

const LearningHub: React.FC<{ onBackToDashboard: () => void }> = ({ onBackToDashboard }) => {
    return (
        <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 gap-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
            <div className="flex items-center gap-4">
                <button
                    onClick={onBackToDashboard}
                    className="flex-shrink-0 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Back to dashboard"
                >
                    <ArrowLeftIcon className="h-6 w-6" />
                </button>
                <div>
                     <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Learning Hub</h1>
                     <p className="text-md text-gray-600 dark:text-gray-400">Expand your knowledge with these curated resources.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                    <a href={resource.link} key={index} target="_blank" rel="noopener noreferrer" className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-start gap-4">
                            <div>{resource.icon}</div>
                            <div>
                                <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">{resource.type}</span>
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-1">{resource.title}</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{resource.description}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default LearningHub;