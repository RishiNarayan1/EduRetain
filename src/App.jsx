import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import DashboardHome from './pages/DashboardHome';
import AnalyticsView from './pages/AnalyticsView';
import Simulator from './pages/Simulator';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="analytics" element={<AnalyticsView />} />
        <Route path="simulator" element={<Simulator />} />
      </Route>
    </Routes>
  );
}

export default App;
