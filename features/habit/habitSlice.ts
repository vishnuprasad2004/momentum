import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/config/supabase";

interface Habit {
    id?: string,
    user_id: string,
    title: string,
    emoji: string,
    entires: string[]
}

interface HabitState {
  habits:Habit[],
  loading:boolean,
  error: string | null
}


const initialState: HabitState = {
  habits:[],
  loading: false,
  error: null
}

export const fetchHabits = createAsyncThunk('habits/fetchHabits', async({ user_id }: {user_id:string}) => {
  const { data, error } = await supabase.from("habits").select("*").eq("user_id", user_id);
  if(error) throw error;
  return data;
})

export const addHabits = createAsyncThunk('habits/addHabits', async({ title, emoji, user_id }: { title:string, emoji:string, user_id:string }) => {
  const { data, error } = await supabase.from("habits").insert([{title, user_id, emoji, entries: []}]).select().single();
  if(error) throw error;
  return data;
})

export const addHabitRecord = createAsyncThunk('habits/addHabitRecord', async({ habit_id, user_id, entry }: { habit_id: string, user_id: string, entry: string }) => {
  const { error } = await supabase.rpc("add_entry", {id:habit_id, user_id, entry});
  if(error) throw error;
})

export const deleteHabit = createAsyncThunk("habits/deleteHabit", async({ user_id, habit_id }: {user_id: string, habit_id: string}) => {
  const { data, error } = await supabase.from("habits").delete().eq("id", habit_id).eq("user_id", user_id).select().single();
  if(error) throw error;
  return data;
})


export const habitSlice = createSlice({
  name: 'habits',
  initialState: {
    habits: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    
  }
})


