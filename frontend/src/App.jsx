import { Routes, Route, Navigate } from "react-router";
import AppLayout from "./layouts/AppLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Player from "./pages/Player";
import Admin from "./pages/Admin ";
import PageNotFound from "./pages/PageNotFound";
import LivePage from "./pages/LivePage";
import Results from "./pages/Result";

function App() {
  return (
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
        <Route path="admin-result" element={<Results />} />
        <Route path="player" element={<Player />} />
        <Route path="live-page" element={<LivePage />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
