import { GoogleGenerativeAI } from '@google/generative-ai';

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

    const genAI = new GoogleGenerativeAI(apiKey);

    const systemInstruction = `You are the AgroVision Farming Assistant, an AI advisor for Indian farmers. You give practical, actionable advice on: crop selection, irrigation scheduling, pest and disease control (prefer organic/natural methods when possible), fertilizer recommendations, soil health, weather-based farming decisions, harvest timing, and government agricultural schemes. Keep answers concise (3-5 sentences unless the user asks for detail), use simple language avoiding excessive jargon, and where relevant mention that advice can vary by region/soil type and suggest consulting local agricultural extension officers for critical decisions. If the user's message is in a language other than English, respond in that same language. Current selected language: ${language}.`;

    // Send context: history + system instruction
    let model;
    try {
      model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: systemInstruction,
      });
    } catch (e) {
      model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: systemInstruction,
      });
    }

    // Convert last 10 messages from client format to Gemini chat history format
    const formattedHistory = conversationHistory.slice(-10).map((msg) => ({
      role: msg.type === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return res.status(200).json({ reply: responseText });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ 
      error: "Sorry, I couldn't connect right now, please try again",
      details: error.message 
    });
  }
}
