import React, { useState, useCallback, useEffect } from 'react';
import type { InternshipDetails, Message, Task, Evaluation, User, CertificateData, SavedProgress, Theme } from './types';
import { getInitialTask, submitTaskAndGetResponse, getColleagueResponse } from './services/geminiService';
import { mockSignIn, mockSignUp, mockSignOut, mockGetCurrentUser, generateAndSaveCertificate, updateUserProgress, mockSignInWithGoogle } from './services/firebaseService';
import { saveInternshipProgress, loadInternshipProgress, clearInternshipProgress } from './services/progressService';


import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import TaskCard from './components/TaskCard';
import EvaluationPanel from './components/EvaluationPanel';
import InternshipSelection from './components/InternshipSelection';
import LoadingSpinner from './components/LoadingSpinner';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import Certificate from './components/Certificate';
import TeamChatPanel from './components/TeamChatPanel';
import GeminiPlayground from './components/GeminiPlayground';

type AppView = 'AUTH' | 'DASHBOARD' | 'SELECTION' | 'SIMULATION' | 'CERTIFICATE' | 'PLAYGROUND';

const App: React.FC = () => {
    const [view, setView] = useState<AppView>('AUTH');
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [selectedInternship, setSelectedInternship] = useState<InternshipDetails | null>(null);
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [teamChatHistory, setTeamChatHistory] = useState<Message[]>([]);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
    const [generatedCertificate, setGeneratedCertificate] = useState<CertificateData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isTeamChatLoading, setIsTeamChatLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSavedProgress, setHasSavedProgress] = useState<boolean>(false);
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'system');

    useEffect(() => {
        const root = window.document.documentElement;
        const isDark =
          theme === 'dark' ||
          (theme === 'system' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);
        root.classList.toggle('dark', isDark);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const user = mockGetCurrentUser();
        if (user) {
            setCurrentUser(user);
            if (loadInternshipProgress(user.uid)) {
                setHasSavedProgress(true);
            }
            setView('DASHBOARD');
        } else {
            setView('AUTH');
        }
        setIsLoading(false);
    }, []);

    const handleThemeToggle = () => {
        setTheme(prevTheme => {
            if (prevTheme === 'light') return 'dark';
            if (prevTheme === 'dark') return 'system';
            return 'light';
        });
    };

    const handleSignUp = async (name: string, university: string, major: string, email: string, pass: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const user = await mockSignUp(name, university, major, email, pass);
            setCurrentUser(user);
            setHasSavedProgress(false); // No progress for new user
            setView('DASHBOARD');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSignIn = async (email: string, pass: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const user = await mockSignIn(email, pass);
            setCurrentUser(user);
            if (loadInternshipProgress(user.uid)) {
                setHasSavedProgress(true);
            }
            setView('DASHBOARD');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignInWithGoogle = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const user = await mockSignInWithGoogle();
            setCurrentUser(user);
             if (loadInternshipProgress(user.uid)) {
                setHasSavedProgress(true);
            } else {
                setHasSavedProgress(false);
            }
            setView('DASHBOARD');
        } catch (err: any) {
             setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignOut = async () => {
        await mockSignOut();
        setCurrentUser(null);
        setView('AUTH');
        // Reset state
        setSelectedInternship(null);
        setChatHistory([]);
        setTeamChatHistory([]);
        setCurrentTask(null);
        setEvaluation(null);
        setGeneratedCertificate(null);
        setHasSavedProgress(false);
    };

    const handleResumeInternship = useCallback(() => {
        if (!currentUser) return;
        const savedProgress = loadInternshipProgress(currentUser.uid);
        if (savedProgress) {
            setSelectedInternship(savedProgress.selectedInternship);
            setChatHistory(savedProgress.chatHistory);
            setTeamChatHistory(savedProgress.teamChatHistory || []);
            setCurrentTask(savedProgress.currentTask);
            setEvaluation(savedProgress.evaluation);
            setView('SIMULATION');
        }
    }, [currentUser]);

    const startInternship = useCallback(async (internship: InternshipDetails) => {
        if(currentUser) {
            clearInternshipProgress(currentUser.uid);
            setHasSavedProgress(false);
        }
        setSelectedInternship(internship);
        setView('SIMULATION');
        setIsLoading(true);
        setError(null);
        try {
            const initialData = await getInitialTask(internship);
            const initialChat: Message[] = [{ author: 'mentor', text: initialData.mentorMessage }];
            const initialTeamChat: Message[] = [{ author: 'colleague', text: `Hey, welcome to the ${internship.company} team! I'm Alex, a Software Engineer on the project. Feel free to ping me here if you have any questions. Good luck with your first task!` }];
            const initialEval: Evaluation = {
                score: 0,
                feedback: "Welcome! Your performance evaluation will appear here once you submit your first task.",
                history: []
            };
            setChatHistory(initialChat);
            setTeamChatHistory(initialTeamChat);
            setCurrentTask(initialData.taskDetails);
            setEvaluation(initialEval);
            
            if (currentUser) {
                const progress: SavedProgress = {
                    selectedInternship: internship,
                    chatHistory: initialChat,
                    teamChatHistory: initialTeamChat,
                    currentTask: initialData.taskDetails,
                    evaluation: initialEval
                };
                saveInternshipProgress(currentUser.uid, progress);
                setHasSavedProgress(true);
            }

        } catch (err) {
            console.error("Error starting internship:", err);
            setError("Failed to start the simulation. Please try again.");
            setView('SELECTION');
        } finally {
            setIsLoading(false);
        }
    }, [currentUser]);

    const completeInternship = useCallback(async (finalEvaluation: Evaluation) => {
        if (!currentUser || !selectedInternship) return;
        setIsLoading(true);
        try {
            const certificate = await generateAndSaveCertificate(currentUser, selectedInternship, finalEvaluation);
            setGeneratedCertificate(certificate);
            clearInternshipProgress(currentUser.uid);
            setHasSavedProgress(false);
            setView('CERTIFICATE');
        } catch (err) {
            console.error("Error generating certificate:", err);
            setError("There was an issue generating your certificate. Please return to the dashboard.");
        } finally {
            setIsLoading(false);
        }
    }, [currentUser, selectedInternship]);
    
    const handleSendMessage = useCallback(async (userInput: string) => {
        if (!userInput.trim() || !selectedInternship || !currentTask || !currentUser) return;

        const userMessage: Message = { author: 'user', text: userInput };
        const newChatHistory = [...chatHistory, userMessage];
        setChatHistory(newChatHistory);
        setIsLoading(true);
        setError(null);

        try {
            const response = await submitTaskAndGetResponse(selectedInternship, currentTask, userInput, chatHistory);
            
            const mentorMessage: Message = { author: 'mentor', text: `${response.mentorFeedback}\n\n${response.mentorMessageForNextTask}` };
            const updatedChatHistory = [...newChatHistory, mentorMessage];
            setChatHistory(updatedChatHistory);
            
            const nextTask = response.nextTask;
            setCurrentTask(nextTask);
            
            let finalEvaluation: Evaluation | null = null;
            setEvaluation(prev => {
                const newHistoryEntry = prev ? { taskTitle: currentTask.title, score: response.performanceScore } : { taskTitle: currentTask.title, score: response.performanceScore };
                const newHistory = prev ? [...prev.history, newHistoryEntry] : [newHistoryEntry];
                if (newHistory.length > 5) newHistory.shift();

                finalEvaluation = {
                    score: response.performanceScore,
                    feedback: response.mentorFeedback,
                    history: newHistory
                };
                return finalEvaluation;
            });

            if (finalEvaluation) {
                await updateUserProgress(currentUser.uid, selectedInternship, finalEvaluation);
                 const progress: SavedProgress = {
                    selectedInternship,
                    chatHistory: updatedChatHistory,
                    teamChatHistory,
                    currentTask: nextTask,
                    evaluation: finalEvaluation
                };
                saveInternshipProgress(currentUser.uid, progress);
                setHasSavedProgress(true);
            }
            
            if (response.isInternshipComplete && finalEvaluation) {
                await completeInternship(finalEvaluation);
            }

        } catch (err) {
            console.error("Error submitting task:", err);
            const errorMessage = "Sorry, I encountered an issue processing your submission. Please try again.";
            setError(errorMessage);
            setChatHistory(prev => [...prev, {author: 'mentor', text: errorMessage}]);
        } finally {
            setIsLoading(false);
        }

    }, [selectedInternship, currentTask, chatHistory, teamChatHistory, currentUser, completeInternship]);

    const handleSendTeamMessage = useCallback(async (userInput: string) => {
        if (!userInput.trim() || !selectedInternship || !currentTask) return;
        
        const userMessage: Message = { author: 'user', text: userInput };
        const newTeamChatHistory = [...teamChatHistory, userMessage];
        setTeamChatHistory(newTeamChatHistory);
        setIsTeamChatLoading(true);

        try {
            const responseText = await getColleagueResponse(selectedInternship, currentTask, userInput);
            const colleagueMessage: Message = { author: 'colleague', text: responseText };
            setTeamChatHistory(prev => [...prev, colleagueMessage]);

        } catch (err) {
             console.error("Error getting colleague response:", err);
             const errorMessage = "Sorry, Alex seems to be busy right now. Try again in a bit.";
             setTeamChatHistory(prev => [...prev, {author: 'colleague', text: errorMessage}]);
        } finally {
            setIsTeamChatLoading(false);
        }

    }, [selectedInternship, currentTask, teamChatHistory]);

    const renderContent = () => {
        if (isLoading && view !== 'SIMULATION' && view !== 'PLAYGROUND') {
            return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
        }

        switch(view) {
            case 'AUTH':
                return <AuthPage onSignIn={handleSignIn} onSignUp={handleSignUp} onSignInWithGoogle={handleSignInWithGoogle} error={error} isLoading={isLoading} />;
            case 'DASHBOARD':
                return currentUser && <Dashboard 
                                        user={currentUser} 
                                        onStartInternship={() => setView('SELECTION')}
                                        onResumeInternship={handleResumeInternship}
                                        onGoToPlayground={() => setView('PLAYGROUND')}
                                        hasSavedProgress={hasSavedProgress}
                                       />;
            case 'SELECTION':
                return <InternshipSelection onSelect={startInternship} error={error} />;
            case 'PLAYGROUND':
                return <GeminiPlayground onBackToDashboard={() => setView('DASHBOARD')} />;
            case 'SIMULATION':
                return (
                    <div className="flex flex-1 overflow-hidden">
                        <Sidebar selectedInternship={selectedInternship} onBackToDashboard={() => setView('DASHBOARD')}/>
                        <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 overflow-hidden">
                            <div className="lg:col-span-2 flex flex-col h-full overflow-hidden">
                               <ChatWindow
                                   chatHistory={chatHistory}
                                   onSendMessage={handleSendMessage}
                                   isLoading={isLoading}
                               />
                            </div>
                            <div className="flex flex-col gap-4 overflow-y-auto">
                                {currentTask && <TaskCard task={currentTask} />}
                                <TeamChatPanel 
                                    chatHistory={teamChatHistory} 
                                    onSendMessage={handleSendTeamMessage} 
                                    isLoading={isTeamChatLoading} 
                                />
                                {evaluation && <EvaluationPanel evaluation={evaluation} />}
                            </div>
                        </main>
                    </div>
                );
            case 'CERTIFICATE':
                return generatedCertificate && <Certificate certificate={generatedCertificate} onBackToDashboard={() => setView('DASHBOARD')} />;
            default:
                return <AuthPage onSignIn={handleSignIn} onSignUp={handleSignUp} onSignInWithGoogle={handleSignInWithGoogle} error={error} isLoading={isLoading} />;
        }
    };

    return (
        <div className="h-screen w-full flex flex-col font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {currentUser && <Header user={currentUser} onSignOut={handleSignOut} theme={theme} onThemeToggle={handleThemeToggle} />}
            {renderContent()}
        </div>
    );
};

export default App;