
import { GoogleGenAI, Type } from "@google/genai";
import { LatinQuestion, ClauseType } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateNewQuestion(): Promise<LatinQuestion | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a random Latin sentence that demonstrates one of the following clause types: Indirect Statement, Purpose Clause, Indirect Command, Adverbial Result, Fearing Clause, Noun Result, Namely-That, or a Cum Clause (Temporal, Circumstantial, Causal, Concessive).",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            latin: { type: Type.STRING, description: "The Latin sentence." },
            translation: { type: Type.STRING, description: "English translation." },
            correctCategory: { 
              type: Type.STRING, 
              enum: Object.values(ClauseType),
              description: "The specific clause category." 
            },
            explanation: { type: Type.STRING, description: "Why it belongs to this category based on grammatical rules." },
            hint: { type: Type.STRING, description: "A short hint for the student." }
          },
          required: ["latin", "translation", "correctCategory", "explanation", "hint"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text.trim()) as LatinQuestion;
  } catch (error) {
    console.error("Error generating question:", error);
    return null;
  }
}
