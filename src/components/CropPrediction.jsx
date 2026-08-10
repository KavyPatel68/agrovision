import React, { useState } from 'react';
import Navbar from './Navbar';
import { MapPin, Sprout, Mountain, Droplets, ChevronRight } from 'lucide-react';

const CropPrediction = ({ onLogout, onNavigate }) => {
  const [formData, setFormData] = useState({
    state: 'Odisha',
    district: '',
    village: '',
    pincode: '',
    farmSize: '',
    unit: 'Hectare',
    cropName: '',
    variety: '',
    sowingDate: '',
    season: '',
    soilType: '',
    fertilizerType: '',
    soilPH: '',
    organicCarbon: '',
    irrigationSource: '',
    irrigationFrequency: '',
    waterAvailability: ''
  });

  const getDistricts = () => {
    return [
      'Bhubaneswar', 'Cuttack', 'Puri', 'Balasore', 'Bhadrak', 'Jajpur', 'Kendrapada',
      'Jagatsinghpur', 'Khordha', 'Nayagarh', 'Ganjam', 'Gajapati', 'Koraput', 'Rayagada',
      'Malkangiri', 'Nabarangpur', 'Nuapada', 'Kalahandi', 'Bargarh', 'Sambalpur',
      'Jharsuguda', 'Sundargarh', 'Deogarh', 'Angul', 'Dhenkanal', 'Keonjhar', 'Mayurbhanj',
      'Balangir', 'Sonepur', 'Boudh'
    ];
  };

  const updateField = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      if (field === 'state') {
        newData.district = '';
      }
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Predicted Yield: 16.8 Q/Ha - This is a demo prediction');
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen">
      <Navbar onLogout={onLogout} onNavigate={onNavigate} activeTab="crop-prediction" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-800">Crop Yield Prediction</h1>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">AI-Powered Analysis</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1 - Farm Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">Farm Details</h2>
            </div>
            <p className="text-gray-600 text-sm mb-6">Basic information about your farm location and size</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select 
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  value={formData.state}
                  onChange={(e) => updateField('state', e.target.value)}
                >
                  <option value="Odisha">Odisha</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                <select 
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  value={formData.district}
                  onChange={(e) => updateField('district', e.target.value)}
                >
                  <option value="">Select District</option>
                  {getDistricts().map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Village/Area</label>
                <input 
                  type="text"
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  value={formData.village}
                  onChange={(e) => updateField('village', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                <input 
                  type="text"
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  value={formData.pincode}
                  onChange={(e) => updateField('pincode', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Farm Size <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number"
                  required
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  value={formData.farmSize}
                  onChange={(e) => updateField('farmSize', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <select 
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  value={formData.unit}
                  onChange={(e) => updateField('unit', e.target.value)}
                >
                  <option value="Hectare">Hectare</option>
                  <option value="Acre">Acre</option>
                  <option value="Bigha">Bigha</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2 - Crop Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <Sprout className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">Crop Information</h2>
            </div>
            <p className="text-gray-600 text-sm mb-6">Details about the crop you want to predict</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crop Name <span className="text-red-500">*</span>
                </label>
                <select 
                  required
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  value={formData.cropName}
                  onChange={(e) => updateField('cropName', e.target.value)}
                >
                  <option value="">Select Crop</option>
                  <option value="Rice">Rice</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Maize">Maize</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Soybean">Soybean</option>
                  <option value="Groundnut">Groundnut</option>
                  <option value="Mustard">Mustard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Variety/Seed Type</label>
                <select 
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  value={formData.variety}
                  onChange={(e) => updateField('variety', e.target.value)}
                >
                  <option value="">Select Variety</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Traditional">Traditional</option>
                  <option value="High Yield">High Yield</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sowing Date</label>
                <input 
                  type="date"
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  value={formData.sowingDate}
                  onChange={(e) => updateField('sowingDate', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Season <span className="text-red-500">*</span>
                </label>
                <select 
                  required
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  value={formData.season}
                  onChange={(e) => updateField('season', e.target.value)}
                >
                  <option value="">Select Season</option>
                  <option value="Kharif">Kharif</option>
                  <option value="Rabi">Rabi</option>
                  <option value="Summer">Summer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3 - Soil & Inputs */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <Mountain className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">Soil & Inputs</h2>
            </div>
            <p className="text-gray-600 text-sm mb-6">Information about your soil type and fertilizer usage</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soil Type <span className="text-red-500">*</span>
                </label>
                <select 
                  required
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  value={formData.soilType}
                  onChange={(e) => updateField('soilType', e.target.value)}
                >
                  <option value="">Select Soil Type</option>
                  <option value="Clay">Clay</option>
                  <option value="Sandy">Sandy</option>
                  <option value="Loamy">Loamy</option>
                  <option value="Red Soil">Red Soil</option>
                  <option value="Black Soil">Black Soil</option>
                  <option value="Alluvial">Alluvial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fertilizer Used</label>
                <select 
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  value={formData.fertilizerType}
                  onChange={(e) => updateField('fertilizerType', e.target.value)}
                >
                  <option value="">Select Fertilizer</option>
                  <option value="Organic">Organic</option>
                  <option value="NPK">NPK</option>
                  <option value="Urea">Urea</option>
                  <option value="DAP">DAP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soil pH Level</label>
                <input 
                  type="number"
                  step="0.1"
                  min="0"
                  max="14"
                  placeholder="e.g., 6.5"
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  value={formData.soilPH}
                  onChange={(e) => updateField('soilPH', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organic Carbon %</label>
                <input 
                  type="number"
                  step="0.01"
                  placeholder="e.g., 0.75"
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  value={formData.organicCarbon}
                  onChange={(e) => updateField('organicCarbon', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section 4 - Irrigation & Water */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <Droplets className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">Irrigation & Water</h2>
            </div>
            <p className="text-gray-600 text-sm mb-6">Water management and irrigation details</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Irrigation Source <span className="text-red-500">*</span>
                </label>
                <select 
                  required
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  value={formData.irrigationSource}
                  onChange={(e) => updateField('irrigationSource', e.target.value)}
                >
                  <option value="">Select Source</option>
                  <option value="Tube Well">Tube Well</option>
                  <option value="Canal">Canal</option>
                  <option value="Rain-fed">Rain-fed</option>
                  <option value="Drip Irrigation">Drip Irrigation</option>
                  <option value="Sprinkler">Sprinkler</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Irrigation Frequency <span className="text-red-500">*</span>
                </label>
                <select 
                  required
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  value={formData.irrigationFrequency}
                  onChange={(e) => updateField('irrigationFrequency', e.target.value)}
                >
                  <option value="">Select Frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Every 2 days">Every 2 days</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Water Availability</label>
                <select 
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  value={formData.waterAvailability}
                  onChange={(e) => updateField('waterAvailability', e.target.value)}
                >
                  <option value="">Select Availability</option>
                  <option value="Good">Good</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <span>Predict Yield</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CropPrediction;
