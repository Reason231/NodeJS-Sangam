import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axios";

const initialState = {
  // first checks if the data contains in localStorage or not
  token: localStorage.getItem("token") || null,   
   user: (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");  // converts string into object 
    } catch {
      return null;
    }
  })(),
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated") ?? "false"),
  isLoading: false,
  initialized:true   // it will help the redux to get the value first before rendering other components. used in CheckAuth.jsx
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", formData);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data); // helps to reject the request down
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", formData);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false,
        state.token = "",
          state.user = null,
          state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false,
        state.token = "",
          state.user = null,
          state.isAuthenticated = false;
      });
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false,
          state.isAuthenticated = action.payload.isAuthenticated,
          state.user = action.payload.user,
          state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("isAuthenticated", action.payload.isAuthenticated);
      })
      .addCase(loginUser.rejected,(state,action)=>{
        state.isLoading=false,
        state.isAuthenticated=false,
        state.user=null,
        state.token=null
      })
  },
});

export default authSlice.reducer;
