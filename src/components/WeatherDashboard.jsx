import React from 'react';
import Navbar from './Navbar';
import { Thermometer, Droplets, Cloud } from 'lucide-react';

const WeatherDashboard = ({ onLogout, onNavigate }) => {
  return (
    <div className="min-h-screen">
      <Navbar onLogout={onLogout} onNavigate={onNavigate} activeTab="weather" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-800">Weather Dashboard</h1>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Real-time Data
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-medium">Temperature</span>
              <Thermometer className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">28.5°C</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-medium">Humidity</span>
              <Droplets className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">65%</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-medium">Rainfall</span>
              <Cloud className="w-5 h-5 text-cyan-600" />
            </div>
            <div className="text-2xl font-bold text-cyan-600">2.5 mm</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-medium">Condition</span>
              <Cloud className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-lg font-bold text-gray-800">Partly Cloudy</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Weather-based Recommendations
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            Actionable advice based on current weather conditions
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4 flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Droplets className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-800 mb-1">Irrigation Schedule</div>
                <div className="text-sm text-gray-600">
                  Based on current weather, irrigate crops in early morning hours.
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 flex items-start space-x-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Thermometer className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-800 mb-1">Temperature Alert</div>
                <div className="text-sm text-gray-600">
                  Moderate temperature is good for most crops. Monitor for heat stress.
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Cloud className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-800 mb-1">Humidity Levels</div>
                <div className="text-sm text-gray-600">
                  Current humidity is optimal for plant growth.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
