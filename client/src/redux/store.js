import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import campaignReducer from './slices/campaignSlice';
import assetReducer from './slices/assetSlice';
import teamReducer from './slices/teamSlice';
import marketingReducer from './slices/marketingSlice';
import analyticsReducer from './slices/analyticsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    campaigns: campaignReducer,
    assets: assetReducer,
    teams: teamReducer,
    marketing: marketingReducer,
    analytics: analyticsReducer,
  },
});

export default store;
