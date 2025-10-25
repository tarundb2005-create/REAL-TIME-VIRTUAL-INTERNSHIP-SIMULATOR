export type InternshipTrack = 'AI' | 'Data Science' | 'Software Engineering' | 'Marketing' | 'Product Management' | 'Cybersecurity' | 'UX Design';
export type Theme = 'light' | 'dark' | 'system';

export interface InternshipDetails {
    track: InternshipTrack;
    company: string;
    description: string;
}

export interface User {
    uid: string;
    email: string;
    name: string;
    university: string;
    major: string;
}

export interface Message {
    author: 'user' | 'mentor' | 'colleague';
    text: string;
}

export interface Task {
    title: string;
    description: string;
    deliverables: string[];
}

export interface PerformanceHistory {
    taskTitle: string;
    score: number;
}

export interface Evaluation {
    score: number;
    feedback: string;
    history: PerformanceHistory[];
}

export interface CertificateData {
    id: string;
    userName: string;
    internshipTrack: string;
    company: string;
    completionDate: string;
}

// Structure for saving progress to localStorage
export interface SavedProgress {
    selectedInternship: InternshipDetails;
    chatHistory: Message[];
    teamChatHistory: Message[];
    currentTask: Task;
    evaluation: Evaluation;
}

// Response from getInitialTask
export interface InitialTaskResponse {
    mentorMessage: string;
    taskDetails: Task;
}

// Response from submitTaskAndGetResponse
export interface SubmissionResponse {
    mentorFeedback: string;
    performanceScore: number;
    mentorMessageForNextTask: string;
    nextTask: Task;
    isInternshipComplete?: boolean;
}

// Type for Google Search grounding results
export interface GroundingChunk {
    web: {
        uri: string;
        title: string;
    };
}
