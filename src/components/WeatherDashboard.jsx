import React from 'react';
import Navbar from './Navbar';
import { Thermometer, Droplets, Cloud, Compass } from 'lucide-react';

const WeatherDashboard = ({ onLogout, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar onLogout={onLogout} onNavigate={onNavigate} activeTab="weather" />
      
      <main className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Weather Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Real-time agricultural weather telemetrics and guidance</p>
          </div>
          <div>
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
              Real-time Data
            </span>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Temperature</span>
              <Thermometer className="w-5 h-5 text-gray-400 stroke-[1.5]" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-3 tracking-tight">28.5°C</div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Humidity</span>
              <Droplets className="w-5 h-5 text-gray-400 stroke-[1.5]" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-3 tracking-tight">65%</div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Rainfall</span>
              <Cloud className="w-5 h-5 text-gray-400 stroke-[1.5]" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-3 tracking-tight">2.5 <span className="text-lg font-medium text-gray-500">mm</span></div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Condition</span>
              <Compass className="w-5 h-5 text-gray-400 stroke-[1.5]" />
            </div>
            <div className="text-xl font-bold text-gray-900 mt-3 tracking-tight">Partly Cloudy</div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Weather-based Recommendations
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Actionable advice based on current weather conditions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50/60 rounded-xl p-6 border border-gray-100 flex items-start space-x-4">
              <div className="w-10 h-10 bg-white rounded-xl border border-gray-200/60 flex items-center justify-center flex-shrink-0 text-gray-500 shadow-xs">
                <Droplets className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-1">Irrigation Schedule</div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  Based on current weather, irrigate crops in early morning hours to minimize evaporation.
                </div>
              </div>
            </div>

            <div className="bg-gray-50/60 rounded-xl p-6 border border-gray-100 flex items-start space-x-4">
              <div className="w-10 h-10 bg-white rounded-xl border border-gray-200/60 flex items-center justify-center flex-shrink-0 text-gray-500 shadow-xs">
                <Thermometer className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-1">Temperature Alert</div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  Moderate temperature is optimal for most crops. Monitor young saplings for heat stress.
                </div>
              </div>
            </div>

            <div className="bg-gray-50/60 rounded-xl p-6 border border-gray-100 flex items-start space-x-4">
              <div className="w-10 h-10 bg-white rounded-xl border border-gray-200/60 flex items-center justify-center flex-shrink-0 text-gray-500 shadow-xs">
                <Cloud className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-1">Humidity Levels</div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  Current humidity is optimal for plant growth. Keep adequate soil drainage maintained.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WeatherDashboard;
