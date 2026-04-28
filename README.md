# 🚀 SCORE – Secure Skill-Based Web Application

<p align="center">
  <b>A Full-Stack MERN + Firebase Platform for Secure Student Freelancing</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React.js-Frontend-blue?logo=react" />
  <img src="https://img.shields.io/badge/Node.js-Backend-green?logo=node.js" />
  <img src="https://img.shields.io/badge/Firebase-Database-orange?logo=firebase" />
  <img src="https://img.shields.io/badge/Status-Completed-success" />
  <img src="https://img.shields.io/badge/License-MIT-lightgrey" />
</p>

---

## 📌 Overview

**SCORE** is a secure, role-based freelancing platform built exclusively for **students and verified alumni**, solving trust and accessibility issues in traditional freelancing systems.

> 🎯 Built as a **Final Year BCA Project** with real-world full-stack architecture.

---

## 📸 Screenshots

# Student
![imagealt](https://github.com/Lakshmipathy-r/score/blob/main/images/Screenshot%202026-04-28%20125945.png)
![imagealt](https://github.com/Lakshmipathy-r/score/blob/main/images/Screenshot%202026-04-28%20124855.png)
![imagealt](https://github.com/Lakshmipathy-r/score/blob/main/images/Screenshot%202026-04-28%20125432.png)
![imagealt](https://github.com/Lakshmipathy-r/score/blob/main/images/Screenshot%202026-04-28%20125200.png)
![imagealt](https://github.com/Lakshmipathy-r/score/blob/main/images/Screenshot%202026-04-28%20125459.png)
![imagealt](https://github.com/Lakshmipathy-r/score/blob/main/images/Screenshot%202026-04-28%20125513.png)

---

# Recruiter
![imagealt](https://github.com/Lakshmipathy-r/score/blob/main/images/Screenshot%202026-04-28%20125533.png)
![imagealt](https://github.com/Lakshmipathy-r/score/blob/main/images/Screenshot%202026-04-28%20125547.png)
![imagealt](https://github.com/Lakshmipathy-r/score/blob/main/images/Screenshot%202026-04-28%20125607.png)

---

# Mentor
![imagealt](https://github.com/Lakshmipathy-r/score/blob/main/images/Screenshot%202026-04-28%20125647.png)
![imagealt](https://github.com/Lakshmipathy-r/score/blob/main/images/Screenshot%202026-04-28%20125703.png)




---

## ✨ Key Features

### 🔐 Authentication & Security
- Firebase Authentication (JWT)
- Token-based route protection
- Firestore security rules

### 👥 Role-Based System
- 🎓 Student → Apply for gigs  
- 🎓 Alumni → Post gigs  
- 🧑‍💼 Recruiter → Manage opportunities  

### 💼 Freelancing System
- Gig posting & browsing  
- Application tracking  
- Structured workflow  

### ☁️ Cloud-Based Architecture
- Firebase Firestore (NoSQL)
- Scalable & real-time  

### 🔄 Smart Features
- Alumni transition system  
- Role-based dashboards  

---

## 🛠️ Tech Stack

| Layer        | Technology |
|-------------|-----------|
| Frontend    | React.js, Tailwind CSS |
| Backend     | Node.js, Express.js |
| Database    | Firebase Firestore |
| Auth        | Firebase Authentication |
| Tools       | Git, GitHub, Postman |

---

## 🏗️ System Architecture


User → React Frontend → Node.js API → Firebase (Auth + Firestore)


- **Frontend:** UI & client interaction  
- **Backend:** API & business logic  
- **Database:** Cloud data storage  

---

## 📂 Project Structure

```bash
client/
├── components/
├── pages/
├── context/
├── firebase.js
└── App.js
```
```bash
backend/
├── config/
├── middleware/
├── routes/
├── controllers/
└── server.js
```

---

## ⚙️ Installation

### 1️⃣ Clone the repo

```bash
git clone https://github.com/Lakshmipathy-r/score.git
cd score
```
### 2️⃣ Install dependencies
Frontend
```bash
 cd client
npm install
npm start
```
Backend
```bash
cd backend
npm install
node server.js
```
🔑 Environment Setup

### Create a Firebase project and add:
```bash
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};
```
---

### 🧪 Testing
- ✅ Unit Testing
- ✅ Integration Testing
- ✅ API Testing (Postman)
- ✅ Security Testing

### 🔒 Security Highlights
- JWT Token Verification
- Role-Based Access Control
- Firebase Authentication
- Firestore Security Rules

---

### 🚀 Future Enhancements
- 💳 Payment & Escrow System
- 💬 Real-time Chat
- 🤖 AI-based Gig Matching
- 📱 Mobile App
- 🔔 Push Notifications
- 🎯 Why This Project Matters

Solves real student freelancing problems
Demonstrates full-stack development
Implements secure authentication systems
Uses scalable cloud architecture

---

### ⭐ Support

If you like this project:

- ⭐ Star the repository
- 🍴 Fork it
- 🛠️ Contribute
- 📄 License

This project is licensed under the MIT License.
