import React from 'react';
import { Home, TrendingUp, Cloud, UserCheck, LogOut, Sprout } from 'lucide-react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'crop-prediction', label: 'Predict Yield', icon: TrendingUp },
  { id: 'weather', label: 'Weather', icon: Cloud },
  { id: 'assistant', label: 'Assistant', icon: UserCheck },
];

export default function Navbar({ onLogout, onNavigate, activeTab }) {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">AgroVision</span>
          </div>

          {/* Nav tabs */}
          <div className="flex space-x-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigate && onNavigate(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Demo User</span>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
