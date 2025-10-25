import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { LogoIcon } from './icons';

interface AuthPageProps {
    onSignIn: (email: string, pass: string) => Promise<void>;
    onSignUp: (name: string, university: string, major: string, email: string, pass: string) => Promise<void>;
    onSignInWithGoogle: () => Promise<void>;
    error: string | null;
    isLoading: boolean;
}

const AuthPage: React.FC<AuthPageProps> = ({ onSignIn, onSignUp, onSignInWithGoogle, error, isLoading }) => {
    const [isSigningUp, setIsSigningUp] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="text-center">
                    <LogoIcon className="h-12 w-12 text-blue-600 dark:text-blue-500 mx-auto" />
                    <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {isSigningUp ? 'Create Your Account' : 'Welcome Back'}
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {isSigningUp
                            ? 'Already have an account? '
                            : "Don't have an account? "}
                        <button
                            onClick={() => setIsSigningUp(!isSigningUp)}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            {isSigningUp ? 'Sign In' : 'Sign Up'}
                        </button>
                    </p>
                </div>

                {isSigningUp ? (
                    <SignUp onSignUp={onSignUp} error={error} isLoading={isLoading} />
                ) : (
                    <SignIn onSignIn={onSignIn} onSignInWithGoogle={onSignInWithGoogle} error={error} isLoading={isLoading} />
                )}
            </div>
        </div>
    );
};

export default AuthPage;