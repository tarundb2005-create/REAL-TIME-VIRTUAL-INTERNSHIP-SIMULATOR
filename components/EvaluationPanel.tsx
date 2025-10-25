
import React from 'react';
import type { Evaluation } from '../types';
import { ChartBarIcon, FeedbackIcon } from './icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface EvaluationPanelProps {
    evaluation: Evaluation;
}

const EvaluationPanel: React.FC<EvaluationPanelProps> = ({ evaluation }) => {
    const scoreColor = evaluation.score >= 80 ? 'text-green-500' : evaluation.score >= 60 ? 'text-yellow-500' : 'text-red-500';
    
    const chartData = evaluation.history.map(item => ({
        name: item.taskTitle.split(' ').slice(0, 2).join(' '), // Shorten task title for chart label
        score: item.score
    }));

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
                <FeedbackIcon className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                <h3 className="text-xl font-bold ml-3 text-gray-800 dark:text-gray-100">Performance Evaluation</h3>
            </div>
            
            <div className="text-center my-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Latest Score</p>
                <p className={`text-6xl font-bold ${scoreColor}`}>{evaluation.score}<span className="text-3xl text-gray-400">/100</span></p>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">{evaluation.feedback}</p>

            {evaluation.history.length > 0 && (
                <div>
                    <div className="flex items-center mb-4">
                        <ChartBarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <h4 className="font-semibold text-gray-700 dark:text-gray-200 ml-2">Score History</h4>
                    </div>
                    <div className="h-48">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                                <XAxis dataKey="name" tick={{ fill: '#6b7280' }} fontSize={12} />
                                <YAxis domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                        borderColor: '#4b5563',
                                        color: '#f3f4f6'
                                    }}
                                />
                                <Bar dataKey="score">
                                {
                                    chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.score >= 80 ? '#22c55e' : entry.score >= 60 ? '#f59e0b' : '#ef4444'} />
                                    ))
                                }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EvaluationPanel;
