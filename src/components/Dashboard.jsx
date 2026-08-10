import React, { useState } from 'react';
import Navbar from './Navbar';
import { TrendingUp, MapPin, Thermometer, Droplets, CheckCircle, X } from 'lucide-react';

export default function Dashboard({ onLogout, onNavigate }) {
  const [showToast, setShowToast] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar onLogout={onLogout} onNavigate={onNavigate} activeTab="dashboard" />
      
      <main className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Overview of your agricultural predictions and telemetry</p>
          </div>
          <div>
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
              1 Prediction Made
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Average Yield</span>
              <TrendingUp className="text-gray-400 w-5 h-5 stroke-[1.5]" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-3 tracking-tight">16.8 <span className="text-lg font-medium text-gray-500">Q/Ha</span></div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Farm Area</span>
              <MapPin className="text-gray-400 w-5 h-5 stroke-[1.5]" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-3 tracking-tight">4.2 <span className="text-lg font-medium text-gray-500">Ha</span></div>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Temperature</span>
              <Thermometer className="text-gray-400 w-5 h-5 stroke-[1.5]" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-3 tracking-tight">28°C</div>
          </div>
          
          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Rainfall</span>
              <Droplets className="text-gray-400 w-5 h-5 stroke-[1.5]" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-3 tracking-tight">145 <span className="text-lg font-medium text-gray-500">mm</span></div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Yield Trends */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900">Yield Trends</h3>
            <p className="text-xs text-gray-500 mt-1 mb-6">Monthly predicted vs actual yield comparison</p>
            
            <div className="relative h-64">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Grid pattern */}
                <defs>
                  <pattern id="grid" width="40" height="33.33" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 33.33" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="400" height="200" fill="url(#grid)" />
                
                {/* Y-axis labels */}
                <text x="15" y="25" className="text-[11px] fill-gray-400 font-medium">24</text>
                <text x="15" y="58" className="text-[11px] fill-gray-400 font-medium">18</text>
                <text x="15" y="91" className="text-[11px] fill-gray-400 font-medium">12</text>
                <text x="15" y="124" className="text-[11px] fill-gray-400 font-medium">6</text>
                <text x="20" y="157" className="text-[11px] fill-gray-400 font-medium">0</text>
                
                {/* X-axis labels */}
                <text x="40" y="190" className="text-[11px] fill-gray-400 font-medium">Jan</text>
                <text x="100" y="190" className="text-[11px] fill-gray-400 font-medium">Feb</text>
                <text x="160" y="190" className="text-[11px] fill-gray-400 font-medium">Mar</text>
                <text x="220" y="190" className="text-[11px] fill-gray-400 font-medium">Apr</text>
                <text x="280" y="190" className="text-[11px] fill-gray-400 font-medium">May</text>
                <text x="340" y="190" className="text-[11px] fill-gray-400 font-medium">Jun</text>
                
                {/* Lines */}
                <path d="M 50 140 L 110 110 L 170 90 L 230 70 L 290 100 L 350 130" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 50 130 L 110 100 L 170 85 L 230 65 L 290 90 L 350 120" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Muted Gray circles */}
                <circle cx="50" cy="140" r="3.5" fill="#9ca3af" />
                <circle cx="110" cy="110" r="3.5" fill="#9ca3af" />
                <circle cx="170" cy="90" r="3.5" fill="#9ca3af" />
                <circle cx="230" cy="70" r="3.5" fill="#9ca3af" />
                <circle cx="290" cy="100" r="3.5" fill="#9ca3af" />
                <circle cx="350" cy="130" r="3.5" fill="#9ca3af" />
                
                {/* Emerald circles */}
                <circle cx="50" cy="130" r="3.5" fill="#10b981" />
                <circle cx="110" cy="100" r="3.5" fill="#10b981" />
                <circle cx="170" cy="85" r="3.5" fill="#10b981" />
                <circle cx="230" cy="65" r="3.5" fill="#10b981" />
                <circle cx="290" cy="90" r="3.5" fill="#10b981" />
                <circle cx="350" cy="120" r="3.5" fill="#10b981" />
              </svg>
            </div>
            
            <div className="flex justify-center space-x-8 mt-6">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 bg-gray-400 rounded-full mr-2"></div>
                <span className="text-xs font-medium text-gray-500">Actual</span>
              </div>
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2"></div>
                <span className="text-xs font-medium text-gray-500">Predicted</span>
              </div>
            </div>
          </div>
          
          {/* Right: Crop Distribution */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900">Crop Distribution</h3>
            <p className="text-xs text-gray-500 mt-1 mb-6">Your farm crop allocation summary</p>
            
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-44 h-44">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" strokeWidth="18" strokeDasharray="175.93 328.07" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#6b7280" strokeWidth="18" strokeDasharray="125.66 378.34" strokeDashoffset="-175.93" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#9ca3af" strokeWidth="18" strokeDasharray="100.53 403.47" strokeDashoffset="-301.59" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#d1d5db" strokeWidth="18" strokeDasharray="100.53 403.47" strokeDashoffset="-402.12" />
                </svg>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/50">
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2.5"></div>
                  <span className="text-xs font-medium text-gray-700">Rice</span>
                </div>
                <span className="text-xs font-bold text-gray-900">35%</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/50">
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 bg-gray-600 rounded-full mr-2.5"></div>
                  <span className="text-xs font-medium text-gray-700">Wheat</span>
                </div>
                <span className="text-xs font-bold text-gray-900">25%</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/50">
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full mr-2.5"></div>
                  <span className="text-xs font-medium text-gray-700">Cotton</span>
                </div>
                <span className="text-xs font-bold text-gray-900">20%</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/50">
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 bg-gray-300 rounded-full mr-2.5"></div>
                  <span className="text-xs font-medium text-gray-700">Maize</span>
                </div>
                <span className="text-xs font-bold text-gray-900">20%</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success toast */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-5 flex items-center space-x-4 border-l-4 border-l-emerald-500 transition-all animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <div className="text-sm font-semibold text-gray-900">Success</div>
            <div className="text-xs text-gray-500 mt-0.5">Account setup complete</div>
          </div>
          <button onClick={() => setShowToast(false)} className="text-gray-400 hover:text-gray-600 ml-4 p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
