🚀 SCORE – Secure Skill-Based Web Application

A full-stack MERN + Firebase web application that creates a secure freelancing ecosystem for students and verified alumni.

📖 About the Project

SCORE is a role-based academic freelancing platform designed to bridge the gap between student talent and real-world opportunities.

Unlike traditional freelancing platforms, SCORE ensures:

✅ Institutional verification
✅ Reduced fraud
✅ Student-focused ecosystem
✨ Features
🔐 Secure Authentication
Firebase Authentication (JWT-based)
Token verification & protected routes
👥 Role-Based Access
Student
Alumni
Recruiter
💼 Gig Marketplace
Post gigs (Alumni/Recruiters)
Apply to gigs (Students)
📊 Dashboards
Personalized dashboards per role
Application tracking system
☁️ Cloud Database
Firebase Firestore (NoSQL, scalable)
🔄 Alumni Transition
Students continue as alumni without re-registration
🛠️ Tech Stack
Frontend
React.js
HTML5, CSS3
Tailwind CSS
JavaScript (ES6+)
Backend
Node.js
Express.js
Database & Auth
Firebase Authentication
Firebase Firestore
Tools
Git & GitHub
Postman
VS Code
🏗️ Architecture
User → React Frontend → Node.js API → Firebase (Auth + Firestore)
Frontend → UI & user interaction
Backend → API & business logic
Database → Cloud storage
📂 Project Structure
Frontend
src/
├── components/
├── pages/
├── context/
├── firebase.js
├── App.js
└── index.js
Backend
backend/
├── config/
├── middleware/
├── routes/
├── controllers/
├── server.js
└── package.json
⚙️ Getting Started
1. Clone the repo
git clone https://github.com/your-username/score.git
cd score
2. Install dependencies
Frontend
cd client
npm install
npm start
Backend
cd backend
npm install
node server.js
3. Setup Firebase

Create a Firebase project and add your config:

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};
🔑 Core Modules
Authentication Module
Login, Register, Token Verification
Student Module
Browse gigs, Apply, Track status
Alumni Module
Create gigs, Manage applications
Database Module
Users, Gigs, Applications, Reviews
🧪 Testing
Unit Testing
Integration Testing
API Testing (Postman)
Security Testing
🔒 Security
Firebase Authentication
JWT Token Verification
Role-Based Access Control
Firestore Security Rules
🚀 Future Enhancements
💳 Payment & Escrow System
💬 Real-time Chat
🤖 AI-based Recommendations
📱 Mobile Application
🔔 Push Notifications
🎯 Project Objectives
Provide verified freelancing opportunities
Improve student employability
Build a secure digital ecosystem
Bridge academia ↔ industry gap
👨‍💻 Contributors
Lakshmipathy R
Roshni Dhimar
Sathya Sai Kumar R
📚 References
React Documentation
Node.js Documentation
Firebase Documentation
Software Engineering (Pressman)
⭐ Show Your Support

If you like this project:

⭐ Star the repo
🍴 Fork it
🛠️ Contribute
