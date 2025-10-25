import React, { useState, useEffect, useCallback } from 'react';
import { getGroundedResponse, analyzeImage, getComplexResponse, generateVideoFromImage } from '../services/geminiService';
import type { GroundingChunk } from '../types';
// FIX: LoadingSpinner is a default export, so it should be imported without curly braces.
import LoadingSpinner from './LoadingSpinner';
import { BrainIcon, ChatBubbleIcon, ImageIcon, SendIcon, VideoCameraIcon, ArrowLeftIcon } from './icons';

type PlaygroundTab = 'chat' | 'image' | 'reasoning' | 'video';

const GeminiPlayground: React.FC<{ onBackToDashboard: () => void }> = ({ onBackToDashboard }) => {
    const [activeTab, setActiveTab] = useState<PlaygroundTab>('chat');
    
    const tabs: { id: PlaygroundTab; name: string; icon: React.ReactNode }[] = [
        { id: 'chat', name: 'Research Assistant', icon: <ChatBubbleIcon className="h-5 w-5" /> },
        { id: 'image', name: 'Image Analyzer', icon: <ImageIcon className="h-5 w-5" /> },
        { id: 'reasoning', name: 'Complex Reasoning', icon: <BrainIcon className="h-5 w-5" /> },
        { id: 'video', name: 'Video Generator', icon: <VideoCameraIcon className="h-5 w-5" /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'chat': return <ChatTab />;
            case 'image': return <ImageTab />;
            case 'reasoning': return <ReasoningTab />;
            case 'video': return <VideoTab />;
            default: return null;
        }
    };

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
                     <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Gemini Playground</h1>
                     <p className="text-md text-gray-600 dark:text-gray-400">Explore the powerful features of the Gemini API.</p>
                </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-4 sm:space-x-8" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${
                                activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
                            } flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none`}
                        >
                            {tab.icon} {tab.name}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div className="flex-1">
                {renderContent()}
            </div>
        </div>
    );
};

// --- Child Components for each Tab ---

const ChatTab: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState<{ text: string; sources: GroundingChunk[] } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        setIsLoading(true);
        setError(null);
        setResponse(null);
        try {
            const result = await getGroundedResponse(prompt);
            setResponse(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Ask anything with Google Search grounding</h2>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Who won the most recent F1 race?"
                    className="flex-1 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !prompt.trim()} className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors">
                    <SendIcon className="h-6 w-6" />
                </button>
            </form>
            {isLoading && <div className="flex justify-center p-4"><LoadingSpinner /></div>}
            {error && <div className="p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-400 dark:border-red-600 rounded-lg">{error}</div>}
            {response && (
                <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
                    <p className="whitespace-pre-wrap">{response.text}</p>
                    {response.sources.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Sources:</h3>
                            <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                                {response.sources.map((source, index) => (
                                    <li key={index}>
                                        <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
                                            {source.web.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const ImageTab: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || !imageFile || !imagePreview) return;
        setIsLoading(true);
        setError(null);
        setResponse(null);
        try {
            const base64Data = imagePreview.split(',')[1];
            const result = await analyzeImage(prompt, base64Data, imageFile.type);
            setResponse(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Analyze an image</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-4">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                    {imagePreview && <img src={imagePreview} alt="Preview" className="w-full max-h-64 object-contain rounded-lg border dark:border-gray-700" />}
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="What do you want to know about this image?"
                        className="w-full h-32 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !prompt.trim() || !imageFile} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors">
                        Analyze Image
                    </button>
                </form>
            </div>
            {isLoading && <div className="flex justify-center p-4"><LoadingSpinner /></div>}
            {error && <div className="p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-400 dark:border-red-600 rounded-lg">{error}</div>}
            {response && (
                <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <p className="whitespace-pre-wrap">{response}</p>
                </div>
            )}
        </div>
    );
};

const ReasoningTab: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        setIsLoading(true);
        setError(null);
        setResponse(null);
        try {
            const result = await getComplexResponse(prompt);
            setResponse(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Tackle a complex problem with Thinking Mode</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter a complex prompt, e.g., 'Develop a multi-faceted marketing strategy for a new EV truck, targeting three distinct customer personas...'"
                    className="w-full h-48 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !prompt.trim()} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors">
                    Generate Response
                </button>
            </form>
            {isLoading && <div className="flex justify-center p-4"><LoadingSpinner /></div>}
            {error && <div className="p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-400 dark:border-red-600 rounded-lg">{error}</div>}
            {response && (
                <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <p className="whitespace-pre-wrap">{response}</p>
                </div>
            )}
        </div>
    );
};

const VideoTab: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isKeySelected, setIsKeySelected] = useState(false);
    
    useEffect(() => {
        // @ts-ignore
        if (window.aistudio?.hasSelectedApiKey) {
            // @ts-ignore
            window.aistudio.hasSelectedApiKey().then(setIsKeySelected);
        }
    }, []);

    const handleSelectKey = async () => {
        // @ts-ignore
        if(window.aistudio?.openSelectKey) {
            // @ts-ignore
            await window.aistudio.openSelectKey();
            setIsKeySelected(true); // Assume success to avoid race conditions
        }
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || !imageFile || !imagePreview) return;
        setIsLoading(true);
        setError(null);
        setVideoUrl(null);
        setStatus(null);
        try {
            const base64Data = imagePreview.split(',')[1];
            const resultUrl = await generateVideoFromImage(prompt, base64Data, imageFile.type, aspectRatio, setStatus);
            setVideoUrl(resultUrl);
        } catch (err: any) {
            setError(err.message);
            if (err.message.includes("API key issue")) {
                 setIsKeySelected(false); // Reset key selection state
            }
        } finally {
            setIsLoading(false);
            setStatus(null);
        }
    };

    if (!isKeySelected) {
        return (
             <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center space-y-4">
                <h2 className="text-xl font-semibold">API Key Required</h2>
                <p className="text-gray-600 dark:text-gray-400">Video generation with Veo requires you to select your own API key. This key must be enabled for the "Generative Language API".</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">For more information, see the <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">billing documentation</a>.</p>
                <button onClick={handleSelectKey} className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    Select API Key
                </button>
            </div>
        )
    }
    
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Generate a video from an image</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                    {imagePreview && <img src={imagePreview} alt="Preview" className="w-full max-h-64 object-contain rounded-lg border dark:border-gray-700" />}
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe what should happen in the video..."
                        className="w-full h-24 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        disabled={isLoading}
                    />
                    <div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Aspect Ratio:</span>
                        <div className="flex gap-4 mt-2">
                            <label className="flex items-center gap-2"><input type="radio" name="aspectRatio" value="16:9" checked={aspectRatio === '16:9'} onChange={() => setAspectRatio('16:9')} className="text-blue-600 focus:ring-blue-500" /> Landscape (16:9)</label>
                            <label className="flex items-center gap-2"><input type="radio" name="aspectRatio" value="9:16" checked={aspectRatio === '9:16'} onChange={() => setAspectRatio('9:16')} className="text-blue-600 focus:ring-blue-500" /> Portrait (9:16)</label>
                        </div>
                    </div>
                    <button type="submit" disabled={isLoading || !prompt.trim() || !imageFile} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors">
                        Generate Video
                    </button>
                </form>
            </div>
             {(isLoading || status) && <div className="flex items-center justify-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg"><LoadingSpinner /> <p className="text-blue-700 dark:text-blue-300 font-medium">{status || "Loading..."}</p></div>}
            {error && <div className="p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-400 dark:border-red-600 rounded-lg">{error}</div>}
            {videoUrl && (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <video src={videoUrl} controls autoPlay loop className="w-full rounded-md" />
                </div>
            )}
        </div>
    );
};

export default GeminiPlayground;