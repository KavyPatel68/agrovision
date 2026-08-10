import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import { Send, Globe } from 'lucide-react';

const quickQuestions = [
  'How often should I water my crops?',
  'How to control pests naturally?',
  'Best irrigation practices',
  'What fertilizer is best for rice?',
  'When to harvest wheat?',
  'Soil pH management'
];

const FarmingAssistant = ({ onLogout, onNavigate }) => {
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'assistant', content: "Hello! I'm your farming assistant. How can I help you today?" }
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

    // Send last ~10 messages for context (excluding the very first static welcome message if present)
    const conversationHistory = updatedMessages
      .filter((m) => m.type === 'user' || m.type === 'assistant')
      .slice(-10);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userText,
          conversationHistory,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setMessages((prev) => [
          ...prev,
          {
            type: 'assistant',
            content: data.error || "Sorry, I couldn't connect right now, please try again",
            isError: true,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: 'assistant',
            content: data.reply,
          },
        ]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          type: 'assistant',
          content: "Sorry, I couldn't connect right now, please try again",
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
    <div className="min-h-screen">
      <Navbar onLogout={onLogout} onNavigate={onNavigate} activeTab="assistant" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-800">Farming Assistant</h1>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Language:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Container */}
          <div className="bg-white rounded-xl shadow-sm h-96 flex flex-col lg:col-span-2">
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-green-600 text-white'
                        : msg.isError
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing / Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg flex items-center space-x-2">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <textarea
                  value={input}
                  disabled={isLoading}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                  rows={2}
                  placeholder={isLoading ? "Waiting for response..." : "Ask me anything about farming..."}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Questions Sidebar */}
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Questions</h3>
            <p className="text-gray-600 text-sm mb-4">
              Click on these common questions to get instant answers
            </p>
            <div className="space-y-2 overflow-y-auto">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  disabled={isLoading}
                  onClick={() => handleQuickQuestion(q)}
                  className="w-full text-left p-3 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmingAssistant;
