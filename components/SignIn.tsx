import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { GoogleIcon } from './icons';

interface SignInProps {
    onSignIn: (email: string, pass: string) => Promise<void>;
    onSignInWithGoogle: () => Promise<void>;
    error: string | null;
    isLoading: boolean;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn, onSignInWithGoogle, error, isLoading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSignIn(email, password);
    };

    return (
        <div className="space-y-4">
             {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm" role="alert">{error}</div>}
             
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                >
                    {isLoading ? <LoadingSpinner /> : 'Sign In'}
                </button>
            </form>
            
            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            <button
                type="button"
                onClick={onSignInWithGoogle}
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-3 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                <GoogleIcon className="h-5 w-5" />
                Sign in with Google
            </button>
        </div>
    );
};

export default SignIn;