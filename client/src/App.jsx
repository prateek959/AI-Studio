import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";
import History from "./pages/History";
import VideoDetails from "./pages/VideoDetails";

import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {

  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}

        <Route
          path="/"
          element={
            token
              ?
              <Navigate to="/dashboard" />
              :
              <LandingPage />
          }
        />

        <Route
          path="/login"
          element={
            token
              ?
              <Navigate to="/dashboard" />
              :
              <Login />
          }
        />

        <Route
          path="/signup"
          element={
            token
              ?
              <Navigate to="/dashboard" />
              :
              <Signup />
          }
        />

        {/* PROTECTED */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/generate"
          element={
            <ProtectedRoute>
              <Generate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/video/:id"
          element={
            <ProtectedRoute>
              <VideoDetails />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default App;