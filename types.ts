export type Theme = 'light' | 'dark' | 'system';

export interface User {
  uid: string;
  name: string;
  email: string;
  university?: string;
  major?: string;
}

export type InternshipTrack = 
  | 'AI' 
  | 'Data Science' 
  | 'Software Engineering' 
  | 'Marketing' 
  | 'Product Management'
  | 'Cybersecurity'
  | 'UX Design';

export interface InternshipDetails {
    track: InternshipTrack;
    company: string;
    description: string;
}

export interface Message {
    author: 'user' | 'mentor' | 'colleague';
    text: string;
}

export interface Task {
    id: string;
    title: string;
    description:string;
    deliverables: string[];
}

export interface Evaluation {
    score: number;
    feedback: string;
    history: { taskTitle: string; score: number }[];
}

export interface CertificateData {
    id: string;
    userName: string;
    internshipTrack: InternshipTrack;
    company: string;
    completionDate: string;
}

export interface SavedProgress {
    internshipDetails: InternshipDetails;
    chatHistory: Message[];
    teamChatHistory: Message[];
    currentTaskIndex: number;
    tasks: Task[];
    evaluation: Evaluation;
    completed: boolean;
}

export interface GroundingChunk {
    web: {
        uri: string;
        title: string;
    };
}
