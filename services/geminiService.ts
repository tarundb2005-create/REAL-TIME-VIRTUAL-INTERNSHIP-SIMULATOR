import { GoogleGenAI, Type } from "@google/genai";
import type { InternshipDetails, Task, Message, InitialTaskResponse, SubmissionResponse } from '../types';

const GEMINI_API_KEY = "AIzaSyCBd1ww6r3et54g2n4dztQBcWkg-IVdTBY";

if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is not set.");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const initialTaskSchema = {
    type: Type.OBJECT,
    properties: {
        mentorMessage: {
            type: Type.STRING,
            description: "A welcoming message for the new intern. Introduce yourself as their manager and set a positive tone for the internship."
        },
        taskDetails: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING, description: "A concise title for the first task." },
                description: { type: Type.STRING, description: "A detailed description of the task, including context, goals, and why it's important." },
                deliverables: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "A list of specific, actionable items the intern needs to produce."
                }
            },
            required: ['title', 'description', 'deliverables']
        }
    },
    required: ['mentorMessage', 'taskDetails']
};

const submissionResponseSchema = {
    type: Type.OBJECT,
    properties: {
        mentorFeedback: {
            type: Type.STRING,
            description: "Constructive, specific, and encouraging feedback on the intern's submission. Point out strengths and areas for improvement."
        },
        performanceScore: {
            type: Type.INTEGER,
            description: "An integer score from 0 to 100 evaluating the submission based on clarity, completeness, and adherence to the task."
        },
        mentorMessageForNextTask: {
            type: Type.STRING,
            description: "A transitional message that introduces the next task, linking it to the previous one if possible. If this is the final task, this message should congratulate the intern on completing their internship."
        },
        nextTask: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING, description: "A concise title for the next task. If the internship is complete, provide a title like 'Internship Complete!'." },
                description: { type: Type.STRING, description: "A detailed description of the next task. If the internship is complete, this can be a summary of their achievements." },
                deliverables: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "A list of specific deliverables for the next task. If the internship is complete, this can be an empty array."
                }
            },
             required: ['title', 'description', 'deliverables']
        },
        isInternshipComplete: {
            type: Type.BOOLEAN,
            description: "A boolean flag. Set this to true ONLY if this is the fifth task submission, marking the end of the internship. Otherwise, it should be false or omitted."
        }
    },
     required: ['mentorFeedback', 'performanceScore', 'mentorMessageForNextTask', 'nextTask']
};


export const getInitialTask = async (internship: InternshipDetails): Promise<InitialTaskResponse> => {
    const prompt = `Act as an AI Mentor simulating a Senior Manager for the ${internship.track} team at ${internship.company}.
Your persona is:
- **Encouraging & Supportive**: You are their direct manager and you are genuinely excited to have them on the team. Your tone is welcoming, positive, and motivating.
- **Professional & Clear**: You provide clear, well-defined tasks and articulate the business impact and context behind the work.
- **Company-Centric**: You embody the culture of ${internship.company}. For Google, this means being data-driven, innovative, and collaborative. Naturally weave in terms like "Googler," "Noogler" (for the new intern), and talk about achieving "impact at scale."

My role: I am a new intern on your team, excited to get started.

Your task is to craft a warm welcome and assign my very first task. This task must be realistic and typical for a new ${internship.track} intern at ${internship.company}. For a Data Science intern at Google, this could involve analyzing user engagement data for a product like YouTube or Google Search.

Your response must be in JSON, following the required schema. The 'mentorMessage' should be a personal welcome, and 'taskDetails' should be comprehensive (title, description, deliverables).`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: initialTaskSchema,
                temperature: 0.7,
            }
        });

        const jsonString = response.text.trim();
        const parsedResponse = JSON.parse(jsonString);
        return parsedResponse as InitialTaskResponse;

    } catch (error) {
        console.error("Gemini API error in getInitialTask:", error);
        throw new Error("Failed to fetch initial task from AI.");
    }
};

export const submitTaskAndGetResponse = async (
    internship: InternshipDetails,
    task: Task,
    submission: string,
    chatHistory: Message[]
): Promise<SubmissionResponse> => {
    
    const formattedHistory = chatHistory.map(m => `${m.author}: ${m.text}`).join('\n');
    const taskNumber = (chatHistory.filter(m => m.author === 'user').length); // This is the Nth submission

    const prompt = `Act as an AI Mentor simulating a Senior Manager for the ${internship.track} team at ${internship.company}.
Your persona is:
- **Encouraging & Constructive**: Your goal is to build the intern's confidence while guiding them toward excellence.
- **Professional & In-depth**: Your evaluation is specific and actionable. Avoid generic praise. Refer directly to parts of the submission.
- **Company-Centric**: Embody the culture of ${internship.company}. For Google, emphasize data-driven decisions and frame feedback in a way that encourages a "growth mindset."

My role: I am your intern, submitting my work for task number ${taskNumber} (out of 5).

Current Task: ${task.title}
My Submission:
---
${submission}
---
Previous conversation history:
---
${formattedHistory}
---

Your task is to evaluate my work and assign the next task.
1.  **Evaluate my submission**:
    - Craft the 'mentorFeedback'. Crucially, **always** start your feedback by highlighting specific strengths in their submission. After praising their work, gently introduce areas for improvement as 'next steps' or 'ways to level up'. For example: "This is a great start! Your analysis of the user-data is solid. To take this further, consider segmenting by region to see if we can spot any trends."
    - Provide a fair 'performanceScore' (0-100).
2.  **Assign the next task**: Provide a transitional 'mentorMessageForNextTask' and the 'nextTask' details. The next task should be a logical progression from the current one.
3.  **Check for completion**: If this is the 5th task submission, set 'isInternshipComplete' to true. The 'nextTask' should be a concluding summary and the 'mentorMessageForNextTask' a congratulatory message on successfully completing the internship. Otherwise, 'isInternshipComplete' must be false or omitted.

Your response must be in JSON, following the required schema.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: submissionResponseSchema,
                temperature: 0.6,
            }
        });

        const jsonString = response.text.trim();
        const parsedResponse = JSON.parse(jsonString);
        return parsedResponse as SubmissionResponse;

    } catch (error) {
        console.error("Gemini API error in submitTaskAndGetResponse:", error);
        throw new Error("Failed to process submission with AI.");
    }
};

export const getColleagueResponse = async (
    internship: InternshipDetails,
    task: Task,
    userMessage: string
): Promise<string> => {
    const prompt = `You are an AI simulating a team member for an intern.
Your Name: Alex
Your Role: A helpful Software Engineer working on the same product team.
Your Persona: You are a friendly, knowledgeable, and collaborative colleague. You are NOT the intern's manager. You are busy with your own work but happy to help when you can. Your tone should be slightly more informal and peer-to-peer than a manager's. You should NOT give evaluative feedback or scores. You provide pointers, suggestions, links to (mock) internal documentation, code snippets, or explanations.

Intern's Role: ${internship.track} at ${internship.company}
Intern's Current Task: "${task.title}"

The intern's question/message to you is:
---
${userMessage}
---

Your task is to provide a helpful response from your perspective as a peer colleague. Keep your response concise and to the point. Frame your answer as if you're chatting in a team channel.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.8,
                maxOutputTokens: 250,
            }
        });

        return response.text.trim();

    } catch (error) {
        console.error("Gemini API error in getColleagueResponse:", error);
        throw new Error("Failed to get response from colleague AI.");
    }
};