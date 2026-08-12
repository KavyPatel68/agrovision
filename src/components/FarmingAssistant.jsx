import React, { useState, useRef, useEffect, useCallback } from 'react';
import Navbar from './Navbar';
import { Send, Globe, Clock, RefreshCw } from 'lucide-react';

const quickQuestions = [
  'How often should I water my crops?',
  'How to control pests naturally?',
  'Best irrigation practices',
  'What fertilizer is best for rice?',
  'When to harvest wheat?',
  'Soil pH management'
];

const SYSTEM_INSTRUCTION = `You are the AgroVision Farming Assistant, an AI advisor for Indian farmers. You give practical, actionable advice on: crop selection, irrigation scheduling, pest and disease control (prefer organic/natural methods when possible), fertilizer recommendations, soil health, weather-based farming decisions, harvest timing, and government agricultural schemes. Keep answers concise (3-5 sentences unless the user asks for detail), use simple language avoiding excessive jargon, and where relevant mention that advice can vary by region/soil type and suggest consulting local agricultural extension officers for critical decisions. If the user's message is in a language other than English, respond in that same language.`;

// Models to try in order — fallback if one hits quota
const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-1.5-flash-latest', 'gemini-2.0-flash-lite'];

// Extract retry seconds from Gemini rate limit error message
const parseRetrySeconds = (msg = '') => {
  const match = msg.match(/retry in ([\d.]+)s/i);
  return match ? Math.ceil(parseFloat(match[1])) : 60;
};

const FarmingAssistant = ({ onLogout, onNavigate }) => {
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);
  const [retryCountdown, setRetryCountdown] = useState(0); // seconds remaining
  const [pendingRetry, setPendingRetry] = useState(null);  // { userText, messages }
  const [messages, setMessages] = useState([
    { type: 'assistant', content: "Hello! I'm your AgroVision farming assistant. How can I help you today?" }
  ]);

  const messagesEndRef = useRef(null);
  const countdownRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Countdown timer for rate limit
  useEffect(() => {
    if (retryCountdown <= 0) {
      clearInterval(countdownRef.current);
      return;
    }
    countdownRef.current = setInterval(() => {
      setRetryCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdownRef.current);
  }, [retryCountdown > 0]);

  // Auto-retry when countdown reaches 0
  useEffect(() => {
    if (retryCountdown === 0 && pendingRetry) {
      const { userText, msgs } = pendingRetry;
      setPendingRetry(null);
      callGeminiApi(userText, msgs);
    }
  }, [retryCountdown]);

  const callGeminiApi = useCallback(async (userText, currentMessages) => {
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setMessages((prev) => [...prev, {
        type: 'assistant',
        content: '⚠️ API key not configured. Please set VITE_GEMINI_API_KEY.',
        isError: true
      }]);
      setIsLoading(false);
      return;
    }

    // Build conversation history
    let priorHistory = currentMessages
      .filter((m) => m.type === 'user' || m.type === 'assistant')
      .slice(0, -1)
      .slice(-10);
    const firstUserIdx = priorHistory.findIndex((m) => m.type === 'user');
    priorHistory = firstUserIdx !== -1 ? priorHistory.slice(firstUserIdx) : [];

    const contents = [
      ...priorHistory.map((m) => ({
        role: m.type === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
      { role: 'user', parts: [{ text: `[Language: ${language}]\n${userText}` }] },
    ];

    // Try each model in order
    let lastError = null;
    for (const model of GEMINI_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
            contents,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          const msg = errData?.error?.message || `HTTP ${res.status}`;
          // If quota exceeded, try next model
          if (res.status === 429 || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED')) {
            lastError = msg;
            continue; // try next model
          }
          throw new Error(msg);
        }

        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.';
        setMessages((prev) => [...prev, { type: 'assistant', content: reply }]);
        setIsLoading(false);
        return; // success — exit
      } catch (err) {
        lastError = err.message;
        // Only continue loop for quota errors
        if (!err.message.includes('quota') && !err.message.includes('RESOURCE_EXHAUSTED') && !err.message.includes('429')) {
          break;
        }
      }
    }

    // All models failed — show rate limit message with countdown
    const waitSecs = parseRetrySeconds(lastError || '');
    const isRateLimit = lastError && (
      lastError.includes('quota') ||
      lastError.includes('RESOURCE_EXHAUSTED') ||
      lastError.includes('429') ||
      lastError.includes('retry')
    );

    if (isRateLimit) {
      setRetryCountdown(waitSecs);
      setPendingRetry({ userText, msgs: currentMessages });
      setMessages((prev) => [
        ...prev,
        {
          type: 'assistant',
          content: `rate_limit:${waitSecs}`,
          isError: true,
          isRateLimit: true,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { type: 'assistant', content: `Sorry, something went wrong. Please try again. (${lastError})`, isError: true },
      ]);
    }
    setIsLoading(false);
  }, [language]);

  const sendMessageToApi = useCallback(async (userText, currentMessages) => {
    if (!userText.trim() || isLoading || retryCountdown > 0) return;
    const userMessage = { type: 'user', content: userText };
    const updatedMessages = [...currentMessages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    await callGeminiApi(userText, updatedMessages);
  }, [isLoading, retryCountdown, callGeminiApi]);

  const handleManualRetry = () => {
    if (pendingRetry) {
      clearInterval(countdownRef.current);
      setRetryCountdown(0);
      const { userText, msgs } = pendingRetry;
      setPendingRetry(null);
      // Remove the rate-limit message before retrying
      setMessages((prev) => prev.filter((m) => !m.isRateLimit));
      callGeminiApi(userText, msgs);
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
              <option value="Gujarati">Gujarati</option>
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
                  {msg.isRateLimit ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl rounded-tl-xs px-5 py-4 max-w-xs lg:max-w-md">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-semibold text-amber-800">Rate Limit Reached</span>
                      </div>
                      <p className="text-xs text-amber-700 mb-3">
                        Free API quota used up. Auto-retrying in{' '}
                        <span className="font-bold text-amber-900">{retryCountdown}s</span>...
                      </p>
                      <button
                        onClick={handleManualRetry}
                        className="flex items-center space-x-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Retry Now</span>
                      </button>
                    </div>
                  ) : (
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
                  )}
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
