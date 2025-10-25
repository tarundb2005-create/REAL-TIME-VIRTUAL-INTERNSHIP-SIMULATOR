import type { SavedProgress } from '../types';

const getProgressKey = (uid: string): string => `internship_progress_${uid}`;

/**
 * Saves the user's current internship progress to localStorage.
 * @param uid The user's unique ID.
 * @param progress The progress object to save.
 */
export const saveInternshipProgress = (uid: string, progress: SavedProgress): void => {
    try {
        const progressKey = getProgressKey(uid);
        localStorage.setItem(progressKey, JSON.stringify(progress));
    } catch (error) {
        console.error("Failed to save progress to localStorage:", error);
    }
};

/**
 * Loads a user's internship progress from localStorage.
 * @param uid The user's unique ID.
 * @returns The saved progress object or null if none is found.
 */
export const loadInternshipProgress = (uid: string): SavedProgress | null => {
    try {
        const progressKey = getProgressKey(uid);
        const savedData = localStorage.getItem(progressKey);
        if (savedData) {
            return JSON.parse(savedData) as SavedProgress;
        }
        return null;
    } catch (error) {
        console.error("Failed to load progress from localStorage:", error);
        return null;
    }
};

/**
 * Clears a user's internship progress from localStorage.
 * @param uid The user's unique ID.
 */
export const clearInternshipProgress = (uid: string): void => {
    try {
        const progressKey = getProgressKey(uid);
        localStorage.removeItem(progressKey);
    } catch (error) {
        console.error("Failed to clear progress from localStorage:", error);
    }
};