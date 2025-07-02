# 📰 DigiBarta - AI Powered News Summarizer & Aggregator

**DigiBarta** is a full-stack, modern, responsive news platform that fetches the latest headlines, delivers AI-generated summaries, and provides real-time weather and location-aware updates — all without user login. It leverages powerful APIs and MongoDB for persistent storage, while offering infinite scroll, dark mode, trending topics, and more.

---

## 🚀 Live Demo

👉 [Visit DigiBarta](https://digibarta.vercel.app)

---

## 📌 Features

### 🔍 News Aggregation
- Fetches articles from **NewsAPI**
- Category-based filtering: `Technology`, `Health`, `Business`, `Science`, etc.
- Keyword-based search
- Trending tag-based filtering
- Infinite scroll loading

### 🧠 AI Summarization
- Uses **Gemini Pro (Google Generative Language API)** to generate bullet-point summaries
- One-click summarize with real-time loading feedback
- Summaries are saved locally or to MongoDB with visitor tracking

### 🌐 Geo + Weather
- Detects user’s location (browser-based)
- Shows real-time weather based on geolocation

### 🌓 UI/UX
- Fully responsive layout (mobile-first)
- Dark/Light theme toggle
- Article detail with “Show More / Show Less”
- Blurred summary card backgrounds
- Fallback images and loaders

---

## 🏗️ Tech Stack

### Frontend
- **React.js**
- **Tailwind CSS**
- **Framer Motion**
- **Axios**
- **React Router DOM**
- **React Masonry**
- Custom hooks, reusable components, and stateful logic

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **Axios** for NewsAPI and Gemini communication
- RESTful APIs:
  - `/api/news` – fetch and store news
  - `/api/summarize` – Gemini-based summary
  - `/api/full-article` – Extracts clean article content
  - `/api/proxy-image` – Handles image loading from CORS-blocked domains

---
# 🧑‍💻 Author
Made with ❤️ by Indranil Paul
