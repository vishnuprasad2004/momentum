import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/config/supabase";


export const habitSlice = createSlice({
  name: 'habit',
  initialState: {
    habits: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    
  }
})


