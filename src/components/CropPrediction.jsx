import React, { useState } from 'react';
import Navbar from './Navbar';
import { MapPin, Sprout, Mountain, Droplets, ChevronRight } from 'lucide-react';

const stateDistricts = {
  'Gujarat': [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar',
    'Junagadh', 'Gandhinagar', 'Anand', 'Mehsana', 'Patan', 'Banaskantha',
    'Sabarkantha', 'Arvalli', 'Kheda', 'Panchmahals', 'Dahod', 'Narmada',
    'Bharuch', 'Navsari', 'Valsad', 'Dang', 'Tapi', 'Surendranagar',
    'Morbi', 'Kutch', 'Porbandar', 'Amreli', 'Gir Somnath', 'Botad'
  ],
  'Maharashtra': [
    'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur',
    'Kolhapur', 'Amravati', 'Sangli', 'Satara', 'Raigad', 'Ratnagiri',
    'Sindhudurg', 'Dhule', 'Nandurbar', 'Jalgaon', 'Buldhana', 'Akola',
    'Washim', 'Yavatmal', 'Wardha', 'Gondia', 'Bhandara', 'Chandrapur',
    'Gadchiroli', 'Nanded', 'Hingoli', 'Parbhani', 'Jalna', 'Osmanabad',
    'Latur', 'Beed', 'Ahmednagar'
  ],
  'Uttar Pradesh': [
    'Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Prayagraj', 'Meerut',
    'Bareilly', 'Aligarh', 'Moradabad', 'Gorakhpur', 'Ghaziabad', 'Noida',
    'Mathura', 'Muzaffarnagar', 'Bulandshahr', 'Hapur', 'Shamli', 'Saharanpur',
    'Firozabad', 'Etah', 'Mainpuri', 'Farrukhabad', 'Kannauj', 'Hardoi',
    'Unnao', 'Raebareli', 'Sultanpur', 'Ayodhya', 'Ambedkar Nagar', 'Basti',
    'Gonda', 'Balrampur', 'Shravasti', 'Bahraich', 'Lakhimpur Kheri', 'Sitapur',
    'Azamgarh', 'Mau', 'Ballia', 'Ghazipur', 'Jaunpur'
  ],
  'Punjab': [
    'Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali',
    'Hoshiarpur', 'Gurdaspur', 'Firozpur', 'Faridkot', 'Muktsar', 'Moga',
    'Barnala', 'Sangrur', 'Fatehgarh Sahib', 'Rupnagar', 'Tarn Taran',
    'Nawanshahr', 'Kapurthala', 'Mansa', 'Pathankot', 'Fazilka'
  ],
  'Haryana': [
    'Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Sonipat',
    'Rohtak', 'Hisar', 'Sirsa', 'Bhiwani', 'Fatehabad', 'Jind',
    'Kaithal', 'Kurukshetra', 'Yamunanagar', 'Panchkula', 'Rewari',
    'Mahendragarh', 'Jhajjar', 'Palwal', 'Nuh', 'Charkhi Dadri'
  ],
  'Madhya Pradesh': [
    'Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar',
    'Rewa', 'Satna', 'Dewas', 'Chhindwara', 'Ratlam', 'Shivpuri',
    'Vidisha', 'Hoshangabad', 'Betul', 'Khandwa', 'Khargone', 'Barwani',
    'Dhar', 'Jhabua', 'Alirajpur', 'Mandsaur', 'Neemuch', 'Rajgarh',
    'Raisen', 'Sehore', 'Narsimhapur', 'Mandla', 'Dindori', 'Balaghat',
    'Seoni', 'Katni', 'Panna', 'Damoh', 'Siddhi', 'Singrauli'
  ],
  'Rajasthan': [
    'Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur',
    'Bharatpur', 'Alwar', 'Sikar', 'Sri Ganganagar', 'Hanumangarh',
    'Nagaur', 'Pali', 'Barmer', 'Jaisalmer', 'Jalore', 'Sirohi',
    'Dungarpur', 'Banswara', 'Chittorgarh', 'Bhilwara', 'Rajsamand',
    'Tonk', 'Bundi', 'Jhalawar', 'Baran', 'Sawai Madhopur', 'Karauli',
    'Dholpur', 'Dausa', 'Jhunjhunu', 'Churu'
  ],
  'Andhra Pradesh': [
    'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool',
    'Tirupati', 'Kakinada', 'Rajahmundry', 'Eluru', 'Ongole',
    'Anantapur', 'Kadapa', 'Chittoor', 'Srikakulam', 'Vizianagaram',
    'West Godavari', 'East Godavari', 'Krishna', 'Prakasam'
  ],
  'Telangana': [
    'Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam',
    'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Medak', 'Rangareddy',
    'Sangareddy', 'Siddipet', 'Jagitial', 'Peddapalli', 'Mancherial',
    'Nirmal', 'Kamareddy', 'Rajanna Sircilla', 'Jayashankar', 'Bhadradri'
  ],
  'Karnataka': [
    'Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi', 'Kalaburagi',
    'Davanagere', 'Ballari', 'Vijayapura', 'Tumakuru', 'Shivamogga', 'Raichur',
    'Bidar', 'Yadgir', 'Koppal', 'Gadag', 'Dharwad', 'Uttara Kannada',
    'Udupi', 'Chikkamagaluru', 'Hassan', 'Kodagu', 'Mandya', 'Chamrajnagar',
    'Ramanagara', 'Chikkaballapura', 'Kolar', 'Chitradurga', 'Haveri'
  ],
  'Tamil Nadu': [
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
    'Tirunelveli', 'Vellore', 'Erode', 'Thanjavur', 'Dindigul',
    'Tiruppur', 'Krishnagiri', 'Dharmapuri', 'Cuddalore', 'Nagapattinam',
    'Tiruvarur', 'Pudukottai', 'Sivaganga', 'Virudhunagar', 'Thoothukudi',
    'Kanyakumari', 'Ramanathapuram', 'Namakkal', 'Karur', 'Ariyalur',
    'Perambalur', 'Villupuram', 'Kallakurichi', 'Ranipet', 'Tirupathur'
  ],
  'West Bengal': [
    'Kolkata', 'Darjeeling', 'Jalpaiguri', 'Koch Bihar', 'Alipurduar',
    'North Dinajpur', 'South Dinajpur', 'Malda', 'Murshidabad', 'Birbhum',
    'Barddhaman', 'Bankura', 'Purulia', 'West Midnapore', 'East Midnapore',
    'Jhargram', 'Hooghly', 'Howrah', 'North 24 Parganas', 'South 24 Parganas',
    'Nadia'
  ],
  'Bihar': [
    'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga',
    'Ara', 'Begusarai', 'Katihar', 'Munger', 'Chhapra', 'Bettiah',
    'Motihari', 'Saharsa', 'Supaul', 'Madhepura', 'Kishanganj', 'Araria',
    'Sitamarhi', 'Sheohar', 'Vaishali', 'Samastipur', 'Madhubani', 'Nalanda',
    'Nawada', 'Aurangabad', 'Jehanabad', 'Arwal', 'Rohtas', 'Kaimur',
    'Buxar', 'Bhojpur', 'Gopalganj', 'Siwan', 'Saran'
  ],
  'Odisha': [
    'Bhubaneswar', 'Cuttack', 'Puri', 'Balasore', 'Bhadrak', 'Jajpur',
    'Kendrapada', 'Jagatsinghpur', 'Khordha', 'Nayagarh', 'Ganjam', 'Gajapati',
    'Koraput', 'Rayagada', 'Malkangiri', 'Nabarangpur', 'Nuapada', 'Kalahandi',
    'Bargarh', 'Sambalpur', 'Jharsuguda', 'Sundargarh', 'Deogarh', 'Angul',
    'Dhenkanal', 'Keonjhar', 'Mayurbhanj', 'Balangir', 'Sonepur', 'Boudh'
  ],
  'Himachal Pradesh': [
    'Shimla', 'Kangra', 'Mandi', 'Solan', 'Sirmaur', 'Una',
    'Hamirpur', 'Bilaspur', 'Chamba', 'Kullu', 'Kinnaur', 'Lahaul & Spiti'
  ]
};

const stateList = Object.keys(stateDistricts).sort();

export default function CropPrediction({ onLogout, onNavigate }) {
  const [formData, setFormData] = useState({
    state: '',
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

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      // Reset district when state changes
      ...(field === 'state' ? { district: '' } : {})
    }));
  };

  const districts = formData.state ? (stateDistricts[formData.state] || []) : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Predicted Yield: 16.8 Q/Ha - Demo prediction completed');
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar onLogout={onLogout} onNavigate={onNavigate} activeTab="crop-prediction" />
      
      <main className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Crop Yield Prediction</h1>
            <p className="text-sm text-gray-500 mt-1">Enter your farm details for AI-driven yield forecasts</p>
          </div>
          <div>
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
              AI-Powered Analysis
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Farm Details */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-3 mb-1">
              <MapPin className="w-4 h-4 text-gray-400 stroke-[1.5]" />
              <h2 className="text-base font-semibold text-gray-900">Farm Details</h2>
            </div>
            <p className="text-xs text-gray-500 mb-6">Location and size parameters for your farm</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  State <span className="text-emerald-600">*</span>
                </label>
                <select
                  value={formData.state}
                  required
                  onChange={(e) => updateField('state', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select State</option>
                  {stateList.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  District <span className="text-emerald-600">*</span>
                </label>
                <select
                  value={formData.district}
                  required
                  onChange={(e) => updateField('district', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Village / Area</label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => updateField('village', e.target.value)}
                  placeholder="Enter village name"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Pincode</label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => updateField('pincode', e.target.value)}
                  placeholder="Enter 6-digit pincode"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Farm Size <span className="text-emerald-600">*</span>
                </label>
                <input
                  type="number"
                  required
                  step="0.1"
                  value={formData.farmSize}
                  onChange={(e) => updateField('farmSize', e.target.value)}
                  placeholder="e.g. 4.2"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Unit</label>
                <select
                  value={formData.unit}
                  onChange={(e) => updateField('unit', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="Hectare">Hectare</option>
                  <option value="Acre">Acre</option>
                  <option value="Bigha">Bigha</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Crop Information */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-3 mb-1">
              <Sprout className="w-4 h-4 text-gray-400 stroke-[1.5]" />
              <h2 className="text-base font-semibold text-gray-900">Crop Information</h2>
            </div>
            <p className="text-xs text-gray-500 mb-6">Crop variety and cultivation timeline</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Crop Name <span className="text-emerald-600">*</span>
                </label>
                <select
                  value={formData.cropName}
                  required
                  onChange={(e) => updateField('cropName', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
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
                <label className="block text-xs font-medium text-gray-700 mb-2">Variety / Seed Type</label>
                <select
                  value={formData.variety}
                  onChange={(e) => updateField('variety', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Variety</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Traditional">Traditional</option>
                  <option value="High Yield">High Yield</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Sowing Date</label>
                <input
                  type="date"
                  value={formData.sowingDate}
                  onChange={(e) => updateField('sowingDate', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Season <span className="text-emerald-600">*</span>
                </label>
                <select
                  value={formData.season}
                  required
                  onChange={(e) => updateField('season', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Season</option>
                  <option value="Kharif">Kharif</option>
                  <option value="Rabi">Rabi</option>
                  <option value="Summer">Summer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Soil & Inputs */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-3 mb-1">
              <Mountain className="w-4 h-4 text-gray-400 stroke-[1.5]" />
              <h2 className="text-base font-semibold text-gray-900">Soil & Inputs</h2>
            </div>
            <p className="text-xs text-gray-500 mb-6">Soil composition and fertilizer usage</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Soil Type <span className="text-emerald-600">*</span>
                </label>
                <select
                  value={formData.soilType}
                  required
                  onChange={(e) => updateField('soilType', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
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
                <label className="block text-xs font-medium text-gray-700 mb-2">Fertilizer Used</label>
                <select
                  value={formData.fertilizerType}
                  onChange={(e) => updateField('fertilizerType', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Fertilizer</option>
                  <option value="Organic">Organic</option>
                  <option value="NPK">NPK</option>
                  <option value="Urea">Urea</option>
                  <option value="DAP">DAP</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Soil pH Level</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="14"
                  value={formData.soilPH}
                  onChange={(e) => updateField('soilPH', e.target.value)}
                  placeholder="e.g. 6.5"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Organic Carbon %</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.organicCarbon}
                  onChange={(e) => updateField('organicCarbon', e.target.value)}
                  placeholder="e.g. 0.75"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Irrigation & Water */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-3 mb-1">
              <Droplets className="w-4 h-4 text-gray-400 stroke-[1.5]" />
              <h2 className="text-base font-semibold text-gray-900">Irrigation & Water</h2>
            </div>
            <p className="text-xs text-gray-500 mb-6">Water sources and watering frequencies</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Irrigation Source <span className="text-emerald-600">*</span>
                </label>
                <select
                  value={formData.irrigationSource}
                  required
                  onChange={(e) => updateField('irrigationSource', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
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
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Irrigation Frequency <span className="text-emerald-600">*</span>
                </label>
                <select
                  value={formData.irrigationFrequency}
                  required
                  onChange={(e) => updateField('irrigationFrequency', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Every 2 days">Every 2 days</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-2">Water Availability</label>
                <select
                  value={formData.waterAvailability}
                  onChange={(e) => updateField('waterAvailability', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Availability</option>
                  <option value="Good">Good</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3.5 px-8 text-sm font-medium shadow-sm flex items-center space-x-2 transition-all cursor-pointer"
            >
              <span>Predict Yield</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
