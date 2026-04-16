import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface ValidationResult {
  isSafe: boolean;
  reason?: string;
}

export async function moderateMessage(text: string): Promise<ValidationResult> {
  if (!text.trim()) return { isSafe: true };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // Using a fast model for moderation
      contents: `Analyze the following message for toxicity, hate speech, sexual content, or extreme bullying. 
      Respond with a JSON object: {"isSafe": boolean, "reason": "short explanation if unsafe"}.
      
      Message: "${text}"`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const result = JSON.parse(response.text || '{"isSafe": true}');
    return result;
  } catch (error) {
    console.error("Moderation failed:", error);
    // Be conservative: if AI fails, allow but maybe flag? Or just allow for UX.
    // For this app, we'll allow but log.
    return { isSafe: true };
  }
}

export async function moderateImage(base64: string): Promise<ValidationResult> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          text: "Is this image safe for a general audience? Specifically check for nudity or graphic violence. Respond with JSON: {\"isSafe\": boolean, \"reason\": \"string\"}"
        },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64
          }
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || '{"isSafe": true}');
    return result;
  } catch (error) {
    console.error("Image moderation failed:", error);
    return { isSafe: true };
  }
}
