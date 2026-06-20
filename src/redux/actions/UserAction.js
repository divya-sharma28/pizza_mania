import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";

export const userRegister = createAsyncThunk(
  "userRegister",
  async ({payload, resetForm}, { rejectWithValue }) => {
    try {
        console.log(payload)
      const response = await api.post(`/user-register`, payload);

      const result = response.data.data;
      resetForm();
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const userLogin = createAsyncThunk(
  "userLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(`/user-login`, payload);
      const result = response.data;

      return result;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  },
);
