
import { GoogleGenAI, Type } from "@google/genai";
import { Theme, CarouselCard } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateThemeCards = async (theme: Theme, count: number): Promise<CarouselCard[]> => {
  const prompt = `Generate ${count} creative card concepts for a 3D carousel with the theme: ${theme}. 
  For each card, provide a title, a short description (max 10 words), and a vibrant RGB color (e.g., "142, 249, 252"). 
  Make them look beautiful in a light mode UI.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            color: { type: Type.STRING, description: "RGB string format 'R, G, B'" },
          },
          required: ["title", "description", "color"],
        },
      },
    },
  });

  try {
    const rawData = JSON.parse(response.text || "[]");
    return rawData.map((item: any, idx: number) => ({
      ...item,
      index: idx,
    }));
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    return [];
  }
};
