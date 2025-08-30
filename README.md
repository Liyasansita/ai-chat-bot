live link:https://ai-chat-bot-6.onrender.com
live demo:https://drive.google.com/file/d/1hURXcNbVmceNatJaWxve8YRQIbob-E6R/view?usp=sharing

how to set up:
⚡ Run Instructions
🔹 Backend

Navigate to backend folder → cd backend

Run npm install

Add a .env file with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key


Start server → npm run dev

🔹 Frontend

Navigate to frontend folder → cd frontend

Run npm install

Add a .env file with:

VITE_API_URL=http://localhost:5000/api/v1


Start frontend → npm run dev
✨ Features
🔐 Authentication & Authorization

Custom authentication system using JWT and HTTP-only cookies.

Secure route protection with verification checks.

🛡 Data Validation

Server-side validation with express-validator middleware to ensure data integrity.

💬 Chat Storage & Sessions

Store and manage user chats in MongoDB.

Maintain user sessions for retrieving conversation history.

🎨 Frontend (React + Vite)

Built with modern React and Vite for fast development.

Sleek, responsive chat UI using Material UI.

Fully mobile-friendly design for all screen sizes.

🤖 AI Integration

Integrated OpenAI API to create an AI-powered chat experience.

A complete ChatGPT-like clone built with the MERN stack.
