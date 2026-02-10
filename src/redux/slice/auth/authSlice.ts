import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../service/auth/Login.service";
import type {
  LoginPayload,
  LoginResponse,
} from "../../service/auth/Login.service";

// Define the initial state interface
interface AuthState {
  user: LoginResponse["user"] | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Initial state
// Try to rehydrate token from localStorage on app load
const initialToken = localStorage.getItem("token");

const initialState: AuthState = {
  user: null, // You might decoding the token or fetch user profile separately
  token: initialToken,
  isAuthenticated: !!initialToken,
  loading: false,
  error: null,
  success: false,
};

// Async thunk for login
export const login = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const response = await loginUser(payload);
    // Store token in localStorage upon success
    if (response.token) {
      localStorage.setItem("token", response.token);
    }
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Login failed");
  }
});

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    resetLoginState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user || null;
        state.success = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.success = false;
        state.error = action.payload ?? "Login failed";
      });
  },
});

export const { logout, clearAuthError, resetLoginState } = authSlice.actions;
export default authSlice.reducer;
