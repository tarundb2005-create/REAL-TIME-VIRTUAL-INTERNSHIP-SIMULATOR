
import React from 'react';
import type { Task } from '../types';
import { TaskIcon, CheckCircleIcon } from './icons';

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
                <TaskIcon className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                <h3 className="text-xl font-bold ml-3 text-gray-800 dark:text-gray-100">Current Task</h3>
            </div>
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">{task.title}</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{task.description}</p>
            <div>
                <h5 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Deliverables:</h5>
                <ul className="space-y-2">
                    {task.deliverables.map((item, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-300">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskCard;
