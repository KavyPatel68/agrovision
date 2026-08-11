import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Sorry, I couldn't connect right now, please try again",
        details: "GEMINI_API_KEY is not configured on the server. Please set it in .env.local"
      });
    }

    const { message, conversationHistory = [], language = 'English' } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are the AgroVision Farming Assistant, an AI advisor for Indian farmers. You give practical, actionable advice on: crop selection, irrigation scheduling, pest and disease control (prefer organic/natural methods when possible), fertilizer recommendations, soil health, weather-based farming decisions, harvest timing, and government agricultural schemes. Keep answers concise (3-5 sentences unless the user asks for detail), use simple language avoiding excessive jargon, and where relevant mention that advice can vary by region/soil type and suggest consulting local agricultural extension officers for critical decisions. If the user's message is in a language other than English, respond in that same language. Current selected language: ${language}.`;

    // Build conversation history for context
    let priorHistory = (conversationHistory || []).filter(
      (msg) => !(msg.type === 'user' && msg.content === message)
    );

    // Gemini requires history to start with a user message
    const firstUserIdx = priorHistory.findIndex((msg) => msg.type === 'user');
    if (firstUserIdx !== -1) {
      priorHistory = priorHistory.slice(firstUserIdx);
    } else {
      priorHistory = [];
    }

    // Build contents array with history + new message
    const contents = [
      ...priorHistory.map((msg) => ({
        role: msg.type === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction,
      },
    });

    const responseText = response.text;

    return res.status(200).json({ reply: responseText });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      error: "Sorry, I couldn't connect right now, please try again",
      details: error.message
    });
  }
}
