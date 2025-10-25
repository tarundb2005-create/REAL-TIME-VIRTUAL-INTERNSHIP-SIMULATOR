import { saveProgress, loadProgress, clearProgress } from './firebaseService';
import type { SavedProgress } from '../types';

/**
 * Saves the user's current internship progress to the Firebase Realtime Database.
 * @param uid The user's unique ID.
 * @param progress The progress object to save.
 */
export const saveInternshipProgress = (uid: string, progress: SavedProgress): Promise<void> => {
    return saveProgress(uid, progress);
};

/**
 * Loads a user's internship progress from the Firebase Realtime Database.
 * @param uid The user's unique ID.
 * @returns A promise that resolves to the saved progress object or null if none is found.
 */
export const loadInternshipProgress = (uid: string): Promise<SavedProgress | null> => {
    return loadProgress(uid);
};

/**
 * Clears a user's internship progress from the Firebase Realtime Database.
 * @param uid The user's unique ID.
 */
export const clearInternshipProgress = (uid: string): Promise<void> => {
    return clearProgress(uid);
};
