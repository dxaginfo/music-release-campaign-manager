import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

// Check authentication status
export const checkAuth = createAsyncThunk('auth/check', async (_, { rejectWithValue }) => {
  try {
    const userData = await authService.checkAuthStatus();
    return userData;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Authentication check failed');
  }
});

// Login user
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const userData = await authService.login(credentials);
    return userData;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

// Register user
export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await authService.register(userData);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});

// Logout user
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authService.logout();
    return null;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Logout failed');
  }
});

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
