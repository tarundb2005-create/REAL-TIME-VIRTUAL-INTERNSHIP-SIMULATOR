import type { User, InternshipDetails, Evaluation, CertificateData } from '../types';

// --- MOCK DATABASE ---
// In a real app, this would be Firestore.
const MOCK_USERS: Record<string, User> = {};
const MOCK_PROGRESS: Record<string, any> = {};
const MOCK_CERTIFICATES: Record<string, CertificateData> = {};

// --- MOCK AUTHENTICATION ---

/**
 * Mocks the behavior of getting the currently signed-in user.
 * In a real app, this would use Firebase Auth's onAuthStateChanged listener.
 */
export const mockGetCurrentUser = (): User | null => {
    const userJson = sessionStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
};

/**
 * Mocks user sign-up.
 */
export const mockSignUp = (name: string, university: string, major: string, email: string, pass: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Object.values(MOCK_USERS).some(u => u.email === email)) {
                reject(new Error("An account with this email already exists."));
                return;
            }
            const uid = `uid_${Date.now()}`;
            const newUser: User = { uid, name, university, major, email };
            MOCK_USERS[uid] = newUser;
            sessionStorage.setItem('currentUser', JSON.stringify(newUser));
            resolve(newUser);
        }, 500);
    });
};

/**
 * Mocks user sign-in.
 */
export const mockSignIn = (email: string, pass: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = Object.values(MOCK_USERS).find(u => u.email === email);
            if (user) {
                // In a real app, you'd verify the password here.
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                resolve(user);
            } else {
                reject(new Error("Invalid email or password."));
            }
        }, 500);
    });
};

/**
 * Mocks user sign-in with Google.
 */
export const mockSignInWithGoogle = (): Promise<User> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const googleEmail = "intern.developer@google.com";
            let user = Object.values(MOCK_USERS).find(u => u.email === googleEmail);
            
            if (!user) {
                // First time signing in with Google, create a new user entry.
                const uid = `uid_google_${Date.now()}`;
                user = {
                    uid,
                    name: "Alex Johnson",
                    email: googleEmail,
                    university: "Stanford University", // Default info
                    major: "Computer Science" // Default info
                };
                MOCK_USERS[uid] = user;
            }

            sessionStorage.setItem('currentUser', JSON.stringify(user));
            resolve(user);
        }, 500);
    });
};

/**
 * Mocks user sign-out.
 */
export const mockSignOut = (): Promise<void> => {
    return new Promise((resolve) => {
        sessionStorage.removeItem('currentUser');
        resolve();
    });
};


// --- MOCK FIRESTORE ACTIONS ---

/**
 * Mocks saving user progress to Firestore.
 */
export const updateUserProgress = (uid: string, internship: InternshipDetails, evaluation: Evaluation): Promise<void> => {
    return new Promise((resolve) => {
        const key = `${uid}_${internship.company}_${internship.track}`;
        MOCK_PROGRESS[key] = {
            ...internship,
            evaluation,
            lastUpdated: new Date().toISOString()
        };
        console.log("Updated progress:", MOCK_PROGRESS[key]);
        resolve();
    });
};

/**
 * Mocks generating and saving a certificate to Firestore.
 */
export const generateAndSaveCertificate = (user: User, internship: InternshipDetails, evaluation: Evaluation): Promise<CertificateData> => {
     return new Promise((resolve) => {
        const certificateId = `cert_${Date.now()}_${user.uid.slice(0, 4)}`;
        const certificate: CertificateData = {
            id: certificateId,
            userName: user.name,
            internshipTrack: internship.track,
            company: internship.company,
            completionDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        };
        MOCK_CERTIFICATES[certificateId] = certificate;
        console.log("Generated certificate:", certificate);
        resolve(certificate);
    });
};