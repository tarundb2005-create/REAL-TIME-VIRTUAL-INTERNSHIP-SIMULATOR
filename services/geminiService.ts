import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { GroundingChunk, InternshipDetails, Message, Task } from '../types';

// The API key is injected by the environment.
const getAi = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGroundedResponse = async (prompt: string): Promise<{ text: string; sources: GroundingChunk[] }> => {
    try {
        const ai = getAi();
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const text = response.text;
        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
        const sources: GroundingChunk[] =
            groundingMetadata?.groundingChunks
                ?.filter((chunk: any) => chunk.web?.uri && chunk.web?.title)
                .map((chunk: any) => ({
                    web: {
                        uri: chunk.web.uri,
                        title: chunk.web.title,
                    },
                })) || [];

        return { text, sources };

    } catch (error) {
        console.error("Error in getGroundedResponse:", error);
        throw new Error("Failed to get grounded response from Gemini.");
    }
};

export const analyzeImage = async (prompt: string, base64Data: string, mimeType: string): Promise<string> => {
    try {
        const ai = getAi();
        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: mimeType,
            },
        };
        const textPart = { text: prompt };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        return response.text;
    } catch (error) {
        console.error("Error in analyzeImage:", error);
        throw new Error("Failed to analyze image with Gemini.");
    }
};

export const getComplexResponse = async (prompt: string): Promise<string> => {
    try {
        const ai = getAi();
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                 // Using the "pro" model automatically enables more complex reasoning.
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error in getComplexResponse:", error);
        throw new Error("Failed to get complex response from Gemini.");
    }
};

export const generateVideoFromImage = async (
    prompt: string,
    base64Data: string,
    mimeType: string,
    aspectRatio: '16:9' | '9:16',
    setStatus: (status: string) => void
): Promise<string> => {
    try {
        const ai = getAi();

        setStatus("Initializing video generation...");
        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            image: {
                imageBytes: base64Data,
                mimeType: mimeType,
            },
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: aspectRatio
            }
        });

        setStatus("Processing video... This can take a few minutes.");
        let checks = 0;
        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
            operation = await ai.operations.getVideosOperation({ operation: operation });
            checks++;
            setStatus(`Processing video... (Status check ${checks})`);
        }
        
        setStatus("Finalizing video...");
        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

        if (!downloadLink) {
            throw new Error("Video generation completed, but no download link was found.");
        }
        
        return `${downloadLink}&key=${process.env.API_KEY}`;

    } catch (error: any) {
        console.error("Error in generateVideoFromImage:", error);
        if (error.message?.includes("not found") || error.message?.includes("permission") || error.message?.includes("entity")) {
            throw new Error("Video generation failed. This might be an API key issue. Please try selecting your API key again.");
        }
        throw new Error("Failed to generate video with Gemini.");
    }
};

// --- Mocked functions for internship simulation ---

export const getInternshipScenario = async (details: InternshipDetails): Promise<{ firstTask: Task; initialEvaluation: any }> => {
    console.log("Mocking internship scenario generation for", details);
    await new Promise(res => setTimeout(res, 1500)); // Simulate network delay
    return {
        firstTask: {
            id: 'task_1',
            title: `Onboarding: ${details.track} at ${details.company}`,
            description: `Welcome to your first day! Your first task is to review the company's internal documentation on our coding standards and recent projects related to ${details.track}. Then, introduce yourself to the team in the chat.`,
            deliverables: [
                "Acknowledge you have read the documentation.",
                "Send a brief introduction message in the team chat, mentioning your background."
            ],
        },
        initialEvaluation: {
            score: 0,
            feedback: "Welcome! Your journey starts now. Complete your first task to get your first evaluation.",
            history: [],
        }
    }
};

export const evaluateSubmission = async (
    submission: string,
    task: Task,
    internshipDetails: InternshipDetails,
    history: { taskTitle: string; score: number }[]
): Promise<{evaluation: any, nextTask: Task | null, mentorResponse: string, isComplete: boolean}> => {
    console.log("Mocking submission evaluation for", submission, task);
    await new Promise(res => setTimeout(res, 2000));

    const score = 75 + Math.floor(Math.random() * 20);
    const feedback = `Good work on "${task.title}". You demonstrated a solid understanding of the requirements. For your next submission, try to be more concise in your explanations. Overall, a great start!`;
    
    const currentTaskNumber = history.length + 1;
    const isComplete = currentTaskNumber >= 5;

    if (isComplete) {
         return {
            evaluation: { score, feedback },
            nextTask: null,
            mentorResponse: `Excellent work on the final task, "${task.title}"! Your final score is ${score}. ${feedback}. You have successfully completed all the tasks for this internship. Congratulations! A certificate has been generated for you.`,
            isComplete: true,
        };
    }
    
    const mentorResponse = `Thanks for your submission on "${task.title}". I've reviewed it and your performance score is ${score}. My feedback is: ${feedback}. Your next task is ready.`;

    const nextTask: Task = {
        id: `task_${currentTaskNumber + 1}`,
        title: `Task ${currentTaskNumber + 1}: Advanced ${internshipDetails.track}`,
        description: `This is a new challenging task based on your progress. For this task, you will need to ${['analyze a dataset', 'refactor a module', 'design a new component', 'draft a marketing brief', 'outline a feature spec'][currentTaskNumber]}.`,
        deliverables: ["A detailed report.", "A code sample or presentation slides."]
    };

    return {
        evaluation: { score, feedback },
        nextTask,
        mentorResponse,
        isComplete: false,
    };
};

export const getColleagueResponse = async (
    userMessage: string,
    teamChatHistory: Message[],
    internshipDetails: InternshipDetails
): Promise<string> => {
    console.log("Mocking colleague response to:", userMessage);
    await new Promise(res => setTimeout(res, 1000));
    return "That's a great question! I think you should check the internal wiki for documentation on that. Or maybe ask our mentor if you're still stuck. Good luck!";
};