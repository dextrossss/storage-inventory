
import { GoogleGenAI } from "@google/genai";
import { StorageItem } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getInventoryInsights(items: StorageItem[]): Promise<string> {
    const lowStockItems = items.filter(i => i.quantity <= i.minStock).slice(0, 10);
    const summary = lowStockItems.map(i => `- ${i.name} (Qty: ${i.quantity}, Min: ${i.minStock})`).join('\n');

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `As an expert inventory manager, analyze this low stock list and provide 3 brief, actionable optimization tips. Focus on the food service context (bakery/cafe supplies). Keep it concise.\n\nItems:\n${summary}`,
        config: {
          systemInstruction: "You are a senior supply chain consultant. Provide professional, concise inventory advice."
        }
      });
      return response.text || "No insights available at this time.";
    } catch (error) {
      console.error("Gemini Insight Error:", error);
      return "Unable to load intelligent insights. Please check stock manually.";
    }
  }
}
