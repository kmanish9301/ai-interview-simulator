# 🚀 AI Interview Simulator

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Groq](https://img.shields.io/badge/AI-Groq_Llama_3.1-FF4500?style=for-the-badge)

An advanced, premium-designed AI Interview Preparation platform built with the MERN stack. It uses the lightning-fast Groq API to generate tailored, role-specific technical multiple-choice questions (MCQs), automatically evaluates your answers, and provides detailed feedback.

---

## ✨ Key Features

- **🧠 Smart AI Generation:** Generates highly specific technical questions based on any software engineering role (e.g., React Developer, DevOps, Node.js).
- **⚡ Instant Grading:** Zero waiting time. Instantly evaluates your answers against AI-generated correct solutions.
- **📊 Detailed Analytics:** Provides a comprehensive breakdown of your performance, including correct answers and in-depth explanations for why an answer is correct.
- **🎨 Premium UI/UX:** Built with Tailwind CSS v4 featuring an ultra-premium, dark-themed, glassmorphic design language.
- **🔒 Secure Authentication:** Full JWT-based user authentication (Register/Login) to securely save and access your past interview sessions.
- **📱 Responsive Design:** Flawlessly responsive across desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router DOM v7
- **HTTP Client:** Axios

### Backend (Server)
- **Framework:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcrypt
- **AI Integration:** Groq Cloud API (`llama-3.1-8b-instant`)

---

## ⚙️ Local Setup & Installation

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URI)
- A [Groq API Key](https://console.groq.com/)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd AI-Interview-Simulator
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=30d
```

Start the backend development server:
```bash
npm start
# The server will run on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal window, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend Vite server:
```bash
npm run dev
# The client will run on http://localhost:5173
```

---

## 📂 Project Structure

```text
AI-Interview-Simulator/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── context/        # React Context (Auth)
│   │   ├── pages/          # UI Views (Login, Interview, Result, etc.)
│   │   ├── services/       # Axios API handlers
│   │   ├── App.jsx         # Main App routing
│   │   └── index.css       # Premium Tailwind theme tokens
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── controllers/    # API Route Logic
│   │   ├── middleware/     # JWT Auth Protection
│   │   ├── models/         # Mongoose Schemas (User, Interview)
│   │   ├── routes/         # Express API Routes
│   │   └── services/       # Groq AI Service integration
│   ├── app.js              # Express App Entry Point
│   └── package.json
```

---

## 🚀 Usage Guide

1. **Sign Up / Log In:** Create an account to track your progress.
2. **Select a Role:** Choose a specialization from the custom dropdown on the home page.
3. **Take the Interview:** Answer the 10 AI-generated multiple-choice questions.
4. **Review Results:** Instantly view your score, check what you got wrong, and read the AI's explanation for the correct concepts.
5. **Revisit:** Access the `/result/:sessionId` route anytime to review your past performances.

---

*Built with ❤️ to help engineers nail their next technical interview.*
