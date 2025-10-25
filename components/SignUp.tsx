import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface SignUpProps {
    onSignUp: (name: string, university: string, major: string, email: string, pass: string) => Promise<void>;
    error: string | null;
    isLoading: boolean;
}

const MOCK_OTP = "123456";

const SignUp: React.FC<SignUpProps> = ({ onSignUp, error, isLoading }) => {
    const [step, setStep] = useState<'details' | 'otp'>('details');
    const [name, setName] = useState('');
    const [university, setUniversity] = useState('');
    const [major, setMajor] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);

    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would trigger an API call to send an OTP
        console.log(`Simulating OTP sent to ${email}`);
        setLocalError(null);
        setStep('otp');
    };

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp === MOCK_OTP) {
            setLocalError(null);
            onSignUp(name, university, major, email, password);
        } else {
            setLocalError("Invalid OTP. Please try again.");
        }
    };

    if (step === 'otp') {
        return (
            <div className="space-y-4">
                <div className="text-center">
                    <p className="font-medium text-gray-700 dark:text-gray-200">Verify your email</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        An OTP has been sent to <span className="font-semibold">{email}</span>.
                        (Hint: it's {MOCK_OTP})
                    </p>
                </div>
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                    {localError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm" role="alert">{localError}</div>}
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        required
                        maxLength={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-[0.5em]"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                    >
                        {isLoading ? <LoadingSpinner /> : 'Verify & Create Account'}
                    </button>
                     <button
                        type="button"
                        onClick={() => setStep('details')}
                        className="w-full text-center text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        Back
                    </button>
                </form>
            </div>
        );
    }

    return (
        <form onSubmit={handleDetailsSubmit} className="space-y-4">
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm" role="alert">{error}</div>}
            
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="University / College"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="Major / Field of Study"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
                {isLoading ? <LoadingSpinner /> : 'Send Verification Code'}
            </button>
        </form>
    );
};

export default SignUp;