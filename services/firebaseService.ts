import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    onAuthStateChanged as fbOnAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut as fbSignOut, 
    type User as FirebaseUser
} from 'firebase/auth';
import { getDatabase, ref, set, get, remove } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';
import type { User, SavedProgress, CertificateData } from '../types';

// Initialize Firebase and its services once at the module level
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
console.log("Firebase service initialized.");

const createUserProfile = async (firebaseUser: FirebaseUser, additionalData: { name: string; university?: string; major?: string }) => {
    const userRef = ref(db, `users/${firebaseUser.uid}`);
    const profile: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        name: additionalData.name || firebaseUser.displayName || 'New User',
        university: additionalData.university || '',
        major: additionalData.major || '',
    };
    await set(userRef, profile);
    return profile;
};

const getUserProfile = async (uid: string): Promise<User | null> => {
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        return snapshot.val() as User;
    }
    return null;
};

export const onAuthStateChanged = (callback: (user: User | null) => void): (() => void) => {
    return fbOnAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
            const userProfile = await getUserProfile(firebaseUser.uid);
            callback(userProfile);
        } else {
            callback(null);
        }
    });
};

export const signUpWithEmail = async (name: string, university: string, major: string, email: string, pass: string): Promise<User> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const profile = await createUserProfile(userCredential.user, { name, university, major });
    return profile;
};

export const signInWithEmail = async (email: string, pass: string): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const profile = await getUserProfile(userCredential.user.uid);
    if (!profile) throw new Error("User profile not found.");
    return profile;
};

export const signInWithGoogle = async (): Promise<User> => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;
    
    let profile = await getUserProfile(firebaseUser.uid);
    if (!profile) {
        // First time signing in with Google, create a profile
        profile = await createUserProfile(firebaseUser, { name: firebaseUser.displayName || 'Google User' });
    }
    return profile;
};

export const signOut = (): Promise<void> => {
    return fbSignOut(auth);
};

// --- Realtime Database Functions for Internship Progress ---

export const saveProgress = async (uid: string, progress: SavedProgress): Promise<void> => {
    const progressRef = ref(db, `progress/${uid}`);
    await set(progressRef, progress);
};

export const loadProgress = async (uid: string): Promise<SavedProgress | null> => {
    const progressRef = ref(db, `progress/${uid}`);
    const snapshot = await get(progressRef);
    if (snapshot.exists()) {
        return snapshot.val() as SavedProgress;
    }
    return null;
};

export const clearProgress = async (uid: string): Promise<void> => {
    const progressRef = ref(db, `progress/${uid}`);
    await remove(progressRef);
};

// --- Realtime Database Functions for Certificates ---

export const saveCertificate = async (uid: string, certificate: CertificateData): Promise<void> => {
    const certRef = ref(db, `certificates/${uid}/${certificate.id}`);
    await set(certRef, certificate);
};

export const getCompletedInternships = async (uid: string): Promise<CertificateData[]> => {
    const certsRef = ref(db, `certificates/${uid}`);
    const snapshot = await get(certsRef);
    if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.values(data);
    }
    return [];
};