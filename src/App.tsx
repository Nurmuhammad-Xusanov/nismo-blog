// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './routes/home';
import { Chat, Login, ProtectedRoute, PublicRoute, } from './components';
import Dashboard from './routes/dashboard';
import Home from './routes/home';
import Post from './routes/post';




const App: React.FC = () => {
  return (
    <Router>
      <Routes>

      <Route path="/post" element={
          <ProtectedRoute>
            <Post />
          </ProtectedRoute>

        } />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>

        } />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
