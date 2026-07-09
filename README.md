# 🚀 SCORE – Secure Skill-Based Web Application

<p align="center">
  <b>A Full-Stack React + Firebase Platform for Secure Student Freelancing</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React.js-Frontend-blue?logo=react" />
  <img src="https://img.shields.io/badge/Node.js-Backend-green?logo=node.js" />
  <img src="https://img.shields.io/badge/Firebase-Database%20%26%20Auth-orange?logo=firebase" />
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
- Server-side ID token and role verification

### 👥 Role-Based System
- 🎓 Student → Apply for gigs, connect with mentors
- 🎓 Alumni → Post gigs, offer guidance
- 🧑‍💼 Recruiter → Post gigs, manage applications, interview talent

### 💼 Freelancing & Mentor Forums
- Gig posting, application management, and status tracking
- Real-time technical doubt forums with resolved-status management
- Real-time peer messages and mentor community chat rooms

### ☁️ Cloud-Based Architecture
- Firebase Firestore (NoSQL database for real-time document sync)
- Dynamic route-based code splitting for minimal load times
- Ready-to-deploy configurations for Vercel SPA routing

---

## 🛠️ Tech Stack

| Layer        | Technology |
|-------------|-----------|
| Frontend    | React.js (Vite), Tailwind CSS, Lucide Icons, Framer Motion |
| Backend     | Node.js, Express.js, Firebase Admin SDK |
| Database    | Firebase Firestore |
| Auth        | Firebase Authentication (JWT Tokens) |
| Hosting     | Vercel (Frontend), Node.js server (Backend) |
| Tools       | Git, GitHub, npm |

---

## 🏗️ System Architecture

```
User ➔ React Frontend (Vite) ────[Secure client-side ops]───➔ Firebase (Firestore / Auth)
            │
            └────────[Token & Role Verification]───────────➔ Express Backend API
```

- **Frontend:** Responsive client interface with route-level lazy loading and client-side database subscriptions.
- **Backend:** Decoupled lightweight role authorization gateway verifying JWT tokens from Firebase Auth.
- **Database:** Firebase Firestore manages real-time chat, applications, gigs, reviews, and technical doubt threads.

---

## 📂 Project Structure

```bash
score/ (root)
├── src/                  # React Frontend Source Code
│   ├── components/       # Global UI / Layout components
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Firebase services (auth, gig, doubt, etc.)
│   ├── pages/            # Public / marketing pages
│   └── studentApp/       # Portal pages (student, mentor, recruiter)
├── public/               # Public assets (favicons, robots.txt)
├── backend/              # Node.js + Express Backend Code
│   ├── routes/           # Verification endpoints
│   ├── firebase.js       # Firebase Admin Init
│   └── server.js         # Backend Entry point
├── vercel.json           # Vercel SPA router configuration
├── package.json          # Frontend packages & scripts
└── vite.config.js        # Vite configurations & plugins
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Lakshmipathy-r/score.git
cd score
```

### 2️⃣ Configure Environments

Create a `.env` file in the **root directory** (for the frontend):
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Create a `.env` file in the **`backend` directory**:
```env
PORT=5000
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/serviceAccountKey.json
CLIENT_ORIGIN=http://localhost:5173
```

### 3️⃣ Run Frontend (Root Directory)

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

### 4️⃣ Run Backend (Backend Directory)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start Express server
node server.js
```

---

## 🔒 Security Highlights
- Secure Route Guards check Firebase Auth resolved status dynamically
- Vercel catch-all rewrites avoid deep link routing failure
- Server-side ID token verification using Firebase Admin SDK
- Secure Firestore Security Rules protect document level access

---

## ⭐ Support

If you like this project:
- ⭐ Star the repository
- 🍴 Fork it
- 🛠️ Contribute

---

## 📄 License

This project is licensed under the MIT License.
