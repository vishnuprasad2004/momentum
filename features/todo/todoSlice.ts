import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '@/config/supabase';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  isCompleted: boolean;
  
};