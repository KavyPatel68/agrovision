import React, { useState } from 'react';
import Navbar from './Navbar';
import { TrendingUp, MapPin, Thermometer, Droplets, CheckCircle, X } from 'lucide-react';

export default function Dashboard({ onLogout, onNavigate }) {
  const [showToast, setShowToast] = useState(true);

  return (
    <div className="min-h-screen">
      <Navbar onLogout={onLogout} onNavigate={onNavigate} activeTab="dashboard" />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-800">Dashboard</h1>
          <span className="text-green-600 font-medium">1 Predictions Made</span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Average Yield</span>
              <TrendingUp className="text-green-600 w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-gray-800">16.8 Q/Ha</div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Farm Area</span>
              <MapPin className="text-blue-600 w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-blue-600">4.2 Ha</div>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Temperature</span>
              <Thermometer className="text-orange-600 w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-orange-600">28°C</div>
          </div>
          
          {/* Card 4 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Rainfall</span>
              <Droplets className="text-cyan-600 w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-cyan-600">145 mm</div>
          </div>
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Yield Trends */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Yield Trends</h3>
            <p className="text-gray-600 text-sm mb-6">Monthly predicted vs actual yield</p>
            
            <div className="relative h-64">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Grid pattern */}
                <defs>
                  <pattern id="grid" width="40" height="33.33" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 33.33" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="400" height="200" fill="url(#grid)" />
                
                {/* Y-axis labels */}
                <text x="15" y="25" className="text-xs fill-gray-500">24</text>
                <text x="15" y="58" className="text-xs fill-gray-500">18</text>
                <text x="15" y="91" className="text-xs fill-gray-500">12</text>
                <text x="15" y="124" className="text-xs fill-gray-500">6</text>
                <text x="20" y="157" className="text-xs fill-gray-500">0</text>
                
                {/* X-axis labels */}
                <text x="40" y="190" className="text-xs fill-gray-500">Jan</text>
                <text x="100" y="190" className="text-xs fill-gray-500">Feb</text>
                <text x="160" y="190" className="text-xs fill-gray-500">Mar</text>
                <text x="220" y="190" className="text-xs fill-gray-500">Apr</text>
                <text x="280" y="190" className="text-xs fill-gray-500">May</text>
                <text x="340" y="190" className="text-xs fill-gray-500">Jun</text>
                
                {/* Lines */}
                <path d="M 50 140 L 110 110 L 170 90 L 230 70 L 290 100 L 350 130" fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
                <path d="M 50 130 L 110 100 L 170 85 L 230 65 L 290 90 L 350 120" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                
                {/* Orange circles */}
                <circle cx="50" cy="140" r="4" fill="#f97316" />
                <circle cx="110" cy="110" r="4" fill="#f97316" />
                <circle cx="170" cy="90" r="4" fill="#f97316" />
                <circle cx="230" cy="70" r="4" fill="#f97316" />
                <circle cx="290" cy="100" r="4" fill="#f97316" />
                <circle cx="350" cy="130" r="4" fill="#f97316" />
                
                {/* Green circles */}
                <circle cx="50" cy="130" r="4" fill="#22c55e" />
                <circle cx="110" cy="100" r="4" fill="#22c55e" />
                <circle cx="170" cy="85" r="4" fill="#22c55e" />
                <circle cx="230" cy="65" r="4" fill="#22c55e" />
                <circle cx="290" cy="90" r="4" fill="#22c55e" />
                <circle cx="350" cy="120" r="4" fill="#22c55e" />
              </svg>
            </div>
            
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Actual</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Predicted</span>
              </div>
            </div>
          </div>
          
          {/* Right: Crop Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Crop Distribution</h3>
            <p className="text-gray-600 text-sm mb-6">Your farm crop allocation</p>
            
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#22c55e" strokeWidth="20" strokeDasharray="175.93 328.07" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#fbbf24" strokeWidth="20" strokeDasharray="125.66 378.34" strokeDashoffset="-175.93" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#06b6d4" strokeWidth="20" strokeDasharray="100.53 403.47" strokeDashoffset="-301.59" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#f97316" strokeWidth="20" strokeDasharray="100.53 403.47" strokeDashoffset="-402.12" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Rice</span>
                </div>
                <span className="text-sm font-medium text-gray-800">35%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Wheat</span>
                </div>
                <span className="text-sm font-medium text-gray-800">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Cotton</span>
                </div>
                <span className="text-sm font-medium text-gray-800">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Maize</span>
                </div>
                <span className="text-sm font-medium text-gray-800">20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg border border-green-200 p-4 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <div className="font-medium text-gray-800">Success</div>
            <div className="text-sm text-gray-600">Account created successfully!</div>
          </div>
          <button onClick={() => setShowToast(false)} className="text-gray-400 hover:text-gray-600 ml-4">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
