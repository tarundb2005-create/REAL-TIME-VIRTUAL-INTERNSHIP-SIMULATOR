import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut, getCompletedInternships, saveCertificate } from './services/firebaseService';
import { getInternshipScenario, evaluateSubmission, getColleagueResponse } from './services/geminiService';
import { saveInternshipProgress, loadInternshipProgress, clearInternshipProgress } from './services/progressService';
import type { User, Theme, InternshipDetails, Message, Task, Evaluation, CertificateData, SavedProgress } from './types';
import AuthPage from './components/AuthPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import InternshipSelection from './components/InternshipSelection';
import Dashboard from './components/Dashboard';
import Certificate from './components/Certificate';
import GeminiPlayground from './components/GeminiPlayground';
import LearningHub from './components/LearningHub';
import LoadingSpinner from './components/LoadingSpinner';

type AppView = 'dashboard' | 'selection' | 'certificate' | 'playground' | 'learningHub';

const App: React.FC = () => {
    // --- State Management ---
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [authError, setAuthError] = useState<string | null>(null);

    const [internshipDetails, setInternshipDetails] = useState<InternshipDetails | null>(null);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [teamChatHistory, setTeamChatHistory] = useState<Message[]>([]);
    const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
    const [completedInternships, setCompletedInternships] = useState<CertificateData[]>([]);
    
    const [isMentorLoading, setIsMentorLoading] = useState(false);
    const [isColleagueLoading, setIsColleagueLoading] = useState(false);
    const [isStartingInternship, setIsStartingInternship] = useState(false);
    
    const [appView, setAppView] = useState<AppView>('selection');
    const [theme, setTheme] = useState<Theme>('system');

    // --- Effects ---
    // Handle auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // User is signed in, load their data from the database
                const savedProgress = await loadInternshipProgress(currentUser.uid);
                const completed = await getCompletedInternships(currentUser.uid);
                setCompletedInternships(completed);

                if (savedProgress) {
                    setInternshipDetails(savedProgress.internshipDetails);
                    setChatHistory(savedProgress.chatHistory);
                    setTeamChatHistory(savedProgress.teamChatHistory);
                    setCurrentTask(savedProgress.tasks[savedProgress.currentTaskIndex]);
                    setEvaluation(savedProgress.evaluation);
                    setAppView(savedProgress.completed ? 'certificate' : 'dashboard');
                } else {
                    setAppView('selection');
                }
            }
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Handle theme changes
    useEffect(() => {
        const applyTheme = () => {
            if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        };
        applyTheme();
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', applyTheme);
        return () => mediaQuery.removeEventListener('change', applyTheme);
    }, [theme]);


    // Auto-save progress to the database
    useEffect(() => {
        if (user && internshipDetails && currentTask && evaluation && appView === 'dashboard') {
            const progress: SavedProgress = {
                internshipDetails,
                chatHistory,
                teamChatHistory,
                currentTaskIndex: evaluation.history.length,
                tasks: [currentTask], // In a real app, you'd store all tasks
                evaluation,
                completed: false
            };
            saveInternshipProgress(user.uid, progress);
        }
    }, [chatHistory, teamChatHistory, currentTask, evaluation, internshipDetails, user, appView]);

    // --- Auth Handlers ---
    const onSignIn = async (email: string, pass: string) => {
        setAuthLoading(true); setAuthError(null);
        try {
            await signInWithEmail(email, pass);
        } catch (err: any) {
            setAuthError(err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const onSignUp = async (name: string, university: string, major: string, email: string, pass: string) => {
        setAuthLoading(true); setAuthError(null);
        try {
            await signUpWithEmail(name, university, major, email, pass);
        } catch (err: any) {
            setAuthError(err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const onSignInWithGoogle = async () => {
        setAuthLoading(true); setAuthError(null);
        try {
            await signInWithGoogle();
        } catch (err: any) {
            setAuthError(err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const onSignOut = async () => {
        await signOut();
        setUser(null);
        // Reset all app state
        setInternshipDetails(null);
        setCurrentTask(null);
        setChatHistory([]);
        setTeamChatHistory([]);
        setEvaluation(null);
        setAppView('selection');
    };


    // --- Internship Logic Handlers ---
    const handleSelectInternship = async (details: InternshipDetails) => {
        if (!user) return;
        setIsStartingInternship(true);
        try {
            const scenario = await getInternshipScenario(details);
            setInternshipDetails(details);
            setCurrentTask(scenario.firstTask);
            setEvaluation(scenario.initialEvaluation);
            setChatHistory([{ author: 'mentor', text: `Welcome to your internship at ${details.company}! I'm your mentor. Your first task is ready for you. Let me know if you have any questions.` }]);
            setTeamChatHistory([{author: 'colleague', text: "Hey, welcome to the team! Glad to have you here. Let us know if you need anything."}]);
            setAppView('dashboard');
            await clearInternshipProgress(user.uid); // Clear any old progress from DB
        } catch (error) {
            console.error("Failed to start internship:", error);
        } finally {
            setIsStartingInternship(false);
        }
    };

    const handleSendMessageToMentor = async (message: string) => {
        if (!user || !currentTask || !internshipDetails || !evaluation) return;
        const newUserMessage: Message = { author: 'user', text: message };
        setChatHistory(prev => [...prev, newUserMessage]);
        setIsMentorLoading(true);

        try {
            const { evaluation: newEvaluation, nextTask, mentorResponse, isComplete } = await evaluateSubmission(message, currentTask, internshipDetails, evaluation.history);
            
            const newMentorMessage: Message = { author: 'mentor', text: mentorResponse };
            setChatHistory(prev => [...prev, newMentorMessage]);

            const updatedEvaluation = {
                score: newEvaluation.score,
                feedback: newEvaluation.feedback,
                history: [...evaluation.history, { taskTitle: currentTask.title, score: newEvaluation.score }]
            };
            setEvaluation(updatedEvaluation);
            
            if (isComplete) {
                const certData: CertificateData = {
                    id: `cert-${user.uid.slice(0, 8)}-${Date.now()}`,
                    userName: user.name,
                    internshipTrack: internshipDetails.track,
                    company: internshipDetails.company,
                    completionDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                };
                
                // Save certificate to DB and clear progress
                await saveCertificate(user.uid, certData);
                await clearInternshipProgress(user.uid);
                
                setCompletedInternships(prev => [...prev, certData]);
                setAppView('certificate');

            } else if (nextTask) {
                setCurrentTask(nextTask);
            }

        } catch (error) {
            console.error(error);
            const errorMessage: Message = { author: 'mentor', text: "Sorry, I encountered an error. Please try again." };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsMentorLoading(false);
        }
    };

    const handleSendMessageToColleague = async (message: string) => {
        const newUserMessage: Message = { author: 'user', text: message };
        setTeamChatHistory(prev => [...prev, newUserMessage]);
        setIsColleagueLoading(true);

        try {
            const responseText = await getColleagueResponse(message, teamChatHistory, internshipDetails!);
            const newColleagueMessage: Message = { author: 'colleague', text: responseText };
             setTimeout(() => { // Simulate delay
                setTeamChatHistory(prev => [...prev, newColleagueMessage]);
            }, 1200);
        } catch (error) {
            console.error(error);
            const errorMessage: Message = { author: 'colleague', text: "Oops, my connection dropped. What was that?" };
            setTeamChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsColleagueLoading(false);
        }
    };
    
    const handleBackToDashboard = () => setAppView(internshipDetails ? 'dashboard' : 'selection');
    
    const handleBackToSelection = async () => {
        if (!user) return;
        await clearInternshipProgress(user.uid);
        setInternshipDetails(null);
        setCurrentTask(null);
        setChatHistory([]);
        setTeamChatHistory([]);
        setEvaluation(null);
        setAppView('selection');
    };


    const handleThemeToggle = () => {
        if (theme === 'system') setTheme('light');
        else if (theme === 'light') setTheme('dark');
        else setTheme('system');
    };

    // --- Render Logic ---
    if (authLoading) {
        return <div className="h-screen w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900"><LoadingSpinner /></div>;
    }

    if (!user) {
        return <AuthPage onSignIn={onSignIn} onSignUp={onSignUp} onSignInWithGoogle={onSignInWithGoogle} error={authError} isLoading={false} />;
    }
    
    const certificateData: CertificateData | null = (appView === 'certificate' && internshipDetails) ? {
        id: `cert-${user.uid.slice(0,8)}-${internshipDetails.company.replace(/\s/g, '')}`,
        userName: user.name,
        internshipTrack: internshipDetails.track,
        company: internshipDetails.company,
        completionDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    } : null;


    return (
        <div className={`flex h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
            {internshipDetails && <Sidebar selectedInternship={internshipDetails} onBackToDashboard={handleBackToSelection} />}

            <main className="flex-1 flex flex-col">
                <Header user={user} onSignOut={onSignOut} theme={theme} onThemeToggle={handleThemeToggle} />
                
                {isStartingInternship && (
                    <div className="flex-1 flex flex-col items-center justify-center p-4">
                        <LoadingSpinner />
                        <p className="mt-4 text-lg font-semibold">Configuring your virtual workspace...</p>
                    </div>
                )}
                
                {!isStartingInternship && (
                    <>
                        {appView === 'selection' && <InternshipSelection onSelect={handleSelectInternship} error={null} />}
                        {appView === 'dashboard' && currentTask && evaluation && (
                            <Dashboard
                                internshipDetails={internshipDetails!}
                                currentTask={currentTask}
                                chatHistory={chatHistory}
                                teamChatHistory={teamChatHistory}
                                evaluation={evaluation}
                                isMentorLoading={isMentorLoading}
                                isColleagueLoading={isColleagueLoading}
                                onSendMessageToMentor={handleSendMessageToMentor}
                                onSendMessageToColleague={handleSendMessageToColleague}
                                onViewPlayground={() => setAppView('playground')}
                                onViewLearningHub={() => setAppView('learningHub')}
                            />
                        )}
                        {appView === 'certificate' && certificateData && <Certificate certificate={certificateData} onBackToDashboard={handleBackToSelection} />}
                        {appView === 'playground' && <GeminiPlayground onBackToDashboard={handleBackToDashboard} />}
                        {appView === 'learningHub' && <LearningHub onBackToDashboard={handleBackToDashboard} />}
                    </>
                )}
            </main>
        </div>
    );
};

export default App;
