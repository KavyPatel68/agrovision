# 🌱 AgroVision — AI-Powered Crop Yield Prediction

> An intelligent farming assistant for Indian farmers, powered by Google Gemini AI.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?logo=google)](https://ai.google.dev/)

---

## 📖 About

**AgroVision** is an AI-powered web application that helps Indian farmers make smarter agricultural decisions. It provides:

- 🌾 **Crop Yield Prediction** — AI-driven yield estimates based on farm data, soil type, and season
- 🌦️ **Weather Dashboard** — Real-time weather insights and crop-specific recommendations
- 🤖 **Farming Assistant** — Live chat powered by Google Gemini AI for instant farming advice
- 📊 **Analytics Dashboard** — Visual yield trends and crop distribution charts

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| AI Backend | Google Gemini 2.5 Flash (`@google/genai`) |
| Serverless API | Vercel Functions (`api/chat.js`) |
| Deployment | Vercel (recommended) |

---

## ⚙️ Setup & Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/KavyPatel68/agrovision.git
cd agrovision
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up your Gemini API key
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
> Get your free API key from [Google AI Studio](https://aistudio.google.com/apikey)

### 4. Start the development server
```bash
npm run dev
```

The app will be running at **http://localhost:5173**

---

## 🚀 Deploy to Vercel

1. Import this repo at [vercel.com/new](https://vercel.com/new)
2. Add environment variable: `GEMINI_API_KEY = your_key_here`
3. Click **Deploy** — your live URL will be generated instantly!

---

## 📁 Project Structure

```
agrovision/
├── api/
│   └── chat.js          # Gemini AI serverless endpoint
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Dashboard.jsx
│   │   ├── CropPrediction.jsx
│   │   ├── WeatherDashboard.jsx
│   │   ├── FarmingAssistant.jsx
│   │   ├── LoginPage.jsx
│   │   └── SignupPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

---

## 📸 Screenshots

> *(Screenshots coming soon — run locally to see the full UI)*

| Dashboard | Farming Assistant | Crop Prediction |
|---|---|---|
| *Coming soon* | *Coming soon* | *Coming soon* |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📜 License

MIT © [KavyPatel68](https://github.com/KavyPatel68)
