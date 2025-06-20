import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Layout components
import MainLayout from './layouts/MainLayout';

// Page components
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CampaignList from './pages/campaigns/CampaignList';
import CampaignDetails from './pages/campaigns/CampaignDetails';
import CampaignForm from './pages/campaigns/CampaignForm';
import AssetLibrary from './pages/assets/AssetLibrary';
import MarketingCalendar from './pages/marketing/MarketingCalendar';
import AnalyticsDashboard from './pages/analytics/AnalyticsDashboard';
import TeamManagement from './pages/team/TeamManagement';
import Profile from './pages/profile/Profile';
import NotFound from './pages/NotFound';

// Auth actions
import { checkAuth } from './redux/slices/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    return children;
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        
        {/* Campaign routes */}
        <Route path="campaigns" element={<CampaignList />} />
        <Route path="campaigns/new" element={<CampaignForm />} />
        <Route path="campaigns/:id" element={<CampaignDetails />} />
        <Route path="campaigns/:id/edit" element={<CampaignForm />} />
        
        {/* Asset routes */}
        <Route path="assets" element={<AssetLibrary />} />
        
        {/* Marketing routes */}
        <Route path="marketing" element={<MarketingCalendar />} />
        
        {/* Analytics routes */}
        <Route path="analytics" element={<AnalyticsDashboard />} />
        
        {/* Team routes */}
        <Route path="team" element={<TeamManagement />} />
        
        {/* Profile routes */}
        <Route path="profile" element={<Profile />} />
      </Route>
      
      {/* Not Found route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
