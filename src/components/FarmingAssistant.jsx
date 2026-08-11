import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import { Send, Globe } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const quickQuestions = [
  'How often should I water my crops?',
  'How to control pests naturally?',
  'Best irrigation practices',
  'What fertilizer is best for rice?',
  'When to harvest wheat?',
  'Soil pH management'
];

const SYSTEM_INSTRUCTION = `You are the AgroVision Farming Assistant, an AI advisor for Indian farmers. You give practical, actionable advice on: crop selection, irrigation scheduling, pest and disease control (prefer organic/natural methods when possible), fertilizer recommendations, soil health, weather-based farming decisions, harvest timing, and government agricultural schemes. Keep answers concise (3-5 sentences unless the user asks for detail), use simple language avoiding excessive jargon, and where relevant mention that advice can vary by region/soil type and suggest consulting local agricultural extension officers for critical decisions. If the user's message is in a language other than English, respond in that same language.`;

const FarmingAssistant = ({ onLogout, onNavigate }) => {
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'assistant', content: "Hello! I'm your AgroVision farming assistant. How can I help you today?" }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessageToApi = async (userText, currentMessages) => {
    if (!userText.trim() || isLoading) return;

    const userMessage = { type: 'user', content: userText };
    const updatedMessages = [...currentMessages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error('VITE_GEMINI_API_KEY is not set.');
      }

      const ai = new GoogleGenAI({ apiKey });

      // Build prior history (excluding the new message just added)
      let priorHistory = updatedMessages
        .filter((m) => m.type === 'user' || m.type === 'assistant')
        .slice(0, -1) // exclude the message we just added
        .slice(-10);  // keep last 10 for context

      // Gemini requires history to start with a user message
      const firstUserIdx = priorHistory.findIndex((m) => m.type === 'user');
      if (firstUserIdx !== -1) {
        priorHistory = priorHistory.slice(firstUserIdx);
      } else {
        priorHistory = [];
      }

      const contents = [
        ...priorHistory.map((m) => ({
          role: m.type === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        })),
        {
          role: 'user',
          parts: [{ text: `[Language preference: ${language}]\n${userText}` }],
        },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      setMessages((prev) => [
        ...prev,
        { type: 'assistant', content: response.text },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          type: 'assistant',
          content: "Sorry, I couldn't connect right now. Please try again.",
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    sendMessageToApi(input, messages);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickQuestion = (question) => {
    sendMessageToApi(question, messages);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar onLogout={onLogout} onNavigate={onNavigate} activeTab="assistant" />

      <main className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Farming Assistant</h1>
            <p className="text-sm text-gray-500 mt-1">Ask questions or receive real-time Gemini AI agricultural recommendations</p>
          </div>
          <div className="flex items-center space-x-3 bg-white px-3.5 py-1.5 rounded-xl border border-gray-200/80 shadow-xs">
            <Globe className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-medium text-gray-600">Language:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-xs border-0 bg-transparent text-gray-900 font-semibold focus:ring-0 outline-none cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
            </select>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Container */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-[500px] flex flex-col lg:col-span-2">
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.type === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-xs shadow-xs'
                        : msg.isError
                        ? 'bg-red-50 text-red-700 border border-red-200 rounded-tl-xs'
                        : 'bg-gray-100/80 text-gray-900 rounded-tl-xs'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing / Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100/80 text-gray-800 px-5 py-3.5 rounded-2xl rounded-tl-xs flex items-center space-x-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-gray-100 p-4 bg-white rounded-b-2xl">
              <div className="flex items-center space-x-3">
                <textarea
                  value={input}
                  disabled={isLoading}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                  rows={2}
                  placeholder={isLoading ? "AI is generating advice..." : "Ask me anything about crop health, irrigation, fertilizers..."}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className={`p-3 rounded-xl transition-all flex items-center justify-center ${
                    isLoading || !input.trim()
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Questions Sidebar */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col space-y-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Quick Questions</h3>
              <p className="text-xs text-gray-500 mt-1">
                Click any prompt to get instant AI guidance
              </p>
            </div>
            <div className="space-y-2.5 overflow-y-auto">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  disabled={isLoading}
                  onClick={() => handleQuickQuestion(q)}
                  className="w-full text-left p-3.5 text-xs text-gray-700 bg-gray-50/70 border border-gray-100 rounded-xl hover:bg-gray-100/80 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmingAssistant;
