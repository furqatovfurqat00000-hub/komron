
import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client using the environment variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAdDescription = async (title: string, category: string) => {
  try {
    // Using the recommended gemini-3-flash-preview for basic text generation tasks.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Напиши привлекательное и профессиональное описание для объявления на сайте. 
      Заголовок: ${title}
      Категория: ${category}
      Описание должно быть на русском языке, содержать преимущества и призыв к действию.`,
    });
    // Accessing .text as a property as per the latest SDK requirements.
    return response.text || "Не удалось сгенерировать описание.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Произошла ошибка при генерации описания.";
  }
};
