import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import AppLayout from "./layouts/AppLayout";
import { AuthProvider } from "./contexts/AuthContext";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Player from "./pages/Player";
import Admin from "./pages/Admin ";
import PageNotFound from "./pages/PageNotFound";
import Live from "./pages/Live";
import Results from "./pages/Result";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route index path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          <Route
            path="main"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="admin" element={<Admin />} />
            <Route path="admin-result" element={<Results />} />{" "}
            <Route path="player" element={<Player />} />
            <Route path="live" element={<Live />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
