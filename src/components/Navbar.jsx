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
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side: Brand + Nav */}
        <div className="flex items-center space-x-12">
          {/* Logo */}
          <div 
            onClick={() => onNavigate && onNavigate('dashboard')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-xs group-hover:bg-emerald-700 transition-colors">
              <Sprout className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">AgroVision</span>
          </div>

          {/* Navigation links */}
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigate && onNavigate(tab.id)}
                  className={`flex items-center space-x-2 py-1 text-sm font-medium transition-all ${
                    isActive
                      ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600 pb-0.5'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right side: User info + Logout */}
        <div className="flex items-center space-x-6">
          <span className="text-sm font-medium text-gray-600">Demo User</span>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-gray-500 hover:text-red-600 px-3 py-2 rounded-xl hover:bg-red-50/50 text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
