import { useState } from 'react'
import LoginPage from './components/LoginPage.jsx'
import SignupPage from './components/SignupPage.jsx'
import Dashboard from './components/Dashboard.jsx'
import CropPrediction from './components/CropPrediction.jsx'
import WeatherDashboard from './components/WeatherDashboard.jsx'
import FarmingAssistant from './components/FarmingAssistant.jsx'

function App() {
  const [currentView, setCurrentView] = useState('login')
  const [user, setUser] = useState(null)

  const handleLogin = (email, password) => {
    setUser({ email, name: 'Demo User' })
    setCurrentView('dashboard')
  }

  const handleSignup = (userData) => {
    setUser(userData)
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView('login')
  }

  const handleNavigate = (view) => {
    setCurrentView(view)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {currentView === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          onSwitchToSignup={() => setCurrentView('signup')}
        />
      )}
      {currentView === 'signup' && (
        <SignupPage
          onSignup={handleSignup}
          onSwitchToLogin={() => setCurrentView('login')}
        />
      )}
      {currentView === 'dashboard' && (
        <Dashboard
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      )}
      {currentView === 'crop-prediction' && (
        <CropPrediction
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      )}
      {currentView === 'weather' && (
        <WeatherDashboard
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      )}
      {currentView === 'assistant' && (
        <FarmingAssistant
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  )
}

export default App
