import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PublicMessage from './pages/PublicMessage.jsx';
import NotFound from './pages/NotFound.jsx';
import { getToken } from './auth.js';

export default function App() {
  const [token, setToken] = useState(() => getToken());

  const handleAuth = (nextToken) => {
    setToken(nextToken);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? <Navigate to="/dashboard" replace /> : <AuthPage onAuth={handleAuth} />
        }
      />
      <Route
        path="/dashboard"
        element={
          token ? (
            <Dashboard token={token} onLogout={handleLogout} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="/send/:userId" element={<PublicMessage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
