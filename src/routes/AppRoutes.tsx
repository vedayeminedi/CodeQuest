
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Login } from '../pages/Login';
import { useAuth } from '../context/AuthContext';

import { Dashboard } from '../pages/Dashboard';
import { LearningPaths } from '../pages/LearningPaths';
import { LearningPathDetail } from '../pages/LearningPathDetail';
import { Challenges } from '../pages/Challenges';
import { ChallengeWorkspace } from '../pages/ChallengeWorkspace';
import { AITutor } from '../pages/AITutor';
import { Leaderboard } from '../pages/Leaderboard';
import { Achievements } from '../pages/Achievements';
import { Analytics } from '../pages/Analytics';
import { Profile } from '../pages/Profile';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { firebaseUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1020] text-white">
        Checking login...
      </div>
    );
  }

  if (!firebaseUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const LoginRoute: React.FC = () => {
  const { firebaseUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1020] text-white">
        Checking login...
      </div>
    );
  }

  if (firebaseUser) {
    return <Navigate to="/" replace />;
  }

  return <Login />;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learning-paths" element={<LearningPaths />} />
        <Route path="/learning-paths/:pathId" element={<LearningPathDetail />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/workspace/:challengeId" element={<ChallengeWorkspace />} />
        <Route path="/ai-tutor" element={<AITutor />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

