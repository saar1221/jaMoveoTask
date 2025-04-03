import React, { useContext } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext"; // נניח שאתה משתמש ב-context לניהול המשתמש

import PlayerPage from "./pages/PlayerPage";
import AdminPage from "./pages/AdminPage";
import PageNotFound from "./pages/PageNotFound";

function ProtectedRoute({ role, children }) {
  const { user } = useContext(useAuthContext);

  if (!user || user.role !== role) {
    return <Navigate to="/not-found" />; // אם המשתמש לא מחובר או לא מתאים ל-role, להפנות לדף לא נמצא
  }

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/main/player"
          element={
            <ProtectedRoute role="player">
              <PlayerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/main/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/not-found" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />{" "}
        {/* אם הדף לא קיים, להפנות לדף לא נמצא */}
      </Routes>
    </Router>
  );
}
