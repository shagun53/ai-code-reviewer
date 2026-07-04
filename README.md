# 🤖 AI-Powered Code Reviewer

A full-stack MERN application that uses AI to instantly review your code and provide structured feedback on bugs, readability, performance, and security.

## 🔗 Live Demo
**[Try it here → ai-code-reviewer-lime-alpha.vercel.app](https://ai-code-reviewer-lime-alpha.vercel.app)**

## ✨ Features
- Paste any code and get instant AI-powered review
- Structured feedback with severity levels (critical ❌, warning ⚠️, suggestion 💡)
- Detects bugs, security issues, performance problems, and best practices
- Suggests improved version of your code
- Review history saved to MongoDB
- Clean, responsive dark UI with pink accent theme

## 🛠️ Tech Stack
- **Frontend:** React + Vite, PrismJS for syntax highlighting
- **Backend:** Node.js + Express (MVC architecture — routes/controllers/services)
- **Database:** MongoDB Atlas
- **AI:** Groq API running Llama 3.3 70B

## 🚀 Run Locally

### Backend
```bash
cd BackEnd
npm install
# Create .env with GROQ_API_KEY and MONGO_URI
node server.js
```

### Frontend
```bash
cd FrontEnd
npm install
npm run dev
```

## 📁 Project Structure
```
├── BackEnd/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   └── config/
│   └── server.js
└── FrontEnd/
    └── src/
        ├── App.jsx
        └── App.css
```
