import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoggerForm from './pages/LoggerForm';
import WeeklyUpdatesList from './pages/WeeklyUpdatesList';
import Dashboard from './pages/Dashboard';
import NAVTrackerDetailed from './pages/NAVTrackerDetailed';
import Login from './pages/Login';
import TradeLog from './pages/TradeLog';
import ExcelUploadPage from './pages/ExcelUploadPage';
import Indicators from './pages/Indicators';
import EconomicCalendar from './pages/EconomicCalendar';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/logger" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <LoggerForm />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/weekly-updates" element={
              <ProtectedRoute>
                <Layout>
                  <WeeklyUpdatesList />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/nav-tracker-detailed" element={
              <ProtectedRoute>
                <Layout>
                  <NAVTrackerDetailed />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/trade-log" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <TradeLog />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/indicators" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <Indicators />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/economic-calendar" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <EconomicCalendar />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/excel-upload" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <ExcelUploadPage />
                </Layout>
              </ProtectedRoute>
            } />

            {/* Redirect any unknown routes to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
