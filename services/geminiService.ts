
import { GoogleGenAI } from "@google/genai";
import { Language } from "../translations";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAdDescription = async (title: string, category: string, lang: Language) => {
  try {
    const languageName = lang === 'ru' ? 'русском' : 'таджикском';
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Напиши привлекательное и профессиональное описание для объявления на сайте на ${languageName} языке. 
      Заголовок: ${title}
      Категория: ${category}
      Описание должно содержать преимущества и призыв к действию.`,
    });
    return response.text || "Ошибка генерации / Хатои генератсия";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Произошла ошибка / Хатоӣ рӯй дод";
  }
};
