# jaMoveoTask Web App 🎸🎤

A full-stack web application designed to enhance the rehearsal experience for bands was developed as part of a challenge by Moveo. Each band member can log in using their mobile device, register their instrument, and join live rehearsals where the admin controls the content displayed to everyone.

---

## 📌 Project Description

This web application aims to improve Moveo's band rehearsals through real-time collaboration and user-friendly design. The admin can create a rehearsal session and display selected lyrics and chords for all band members to follow in real time. Each participant logs in via their mobile device and sees only the relevant content based on their instrument.

---

## 🧪 How to Test the App

You can try the deployed version here:  
🌐 **[https://charming-gratitude-production.up.railway.app/](https://charming-gratitude-production.up.railway.app/)**

### Test Flow:

1. **Open the app in your browser.**
2. Register or log in with a user and choose:
   - **Role**: `Player`
   - **Instrument**: (e.g., Guitar, Drums, Vocals)
3. You will be redirected to the **Player Page**, waiting for the rehearsal to begin.

---

4. **Open a second browser tab** or use an incognito window.
5. Register or log in with a new user and choose:
   - **Role**: `Admin`
6. You’ll be redirected to the **Admin Dashboard**.
7. Select a song — for example: `Hello`.
8. Click on the selected song to start the rehearsal.

---

9. All connected `Players` and `Admin` will be redirected to the **Live Page**, where they will see the synchronized lyrics and chords.
10. Each musician can now rehearse their part in real-time — whether singing or playing an instrument — based on the content selected by the admin.

---


## 🚀 Features

- **Authentication System**
  - User registration and login with role-based access (Admin or Musician(player)).

- **Real-time Rehearsal Syncing**
  - Built using `Socket.IO` with a **Singleton architecture** to maintain a single, shared instance across the application.

- **Responsive Design**
  - UI implemented according to a shared **Figma design**, fully responsive and mobile-friendly.

- **Centralized API Logic**
  - A `requestApi` helper file to reduce repetitive code and manage all Axios requests in one place.

- **Error Handling**
  - Global error handler middleware to keep controllers clean and avoid clutter.

- **Instrument-Specific Views**
  - Lyrics and chords are rendered based on the instrument selected by the user.

- **Environment Variables**
  - Uses `.env` for managing sensitive configuration like database URI and ports.

- **MongoDB Atlas**
  - Cloud-hosted database solution used to store users, sessions, and song data.

---

## ⚙️ Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Axios
- Socket.IO-client
- React Device Detect
- Toast Message

### Backend
- Node.js (v20.12.2 or higher required)
- Express.js
- MongoDB Atlas
- Socket.IO
- dotenv
- Helmet
- CORS

---

## 🛠️ Installation & Usage

### Prerequisites
- [Node.js](https://nodejs.org/) **version 20.12.2 or higher**
- npm or yarn
- MongoDB Atlas account (or local Mongo if needed)

### Clone the repository

```bash
git clone https://github.com/saar1221/jaMoveoTask.git
cd JaMoveoTask
