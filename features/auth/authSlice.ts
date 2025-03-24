import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/config/supabase";

type AuthState = {
  session: Session | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  session: null,
  loading: false,
  error: null,
};

// Sign Up (Register)
type SignUpPayload = { 
  email: string; 
  password: string;
  name: string;
  expo_push_token: string;
  allow_notifications: boolean;
  notification_frequency: string;
  last_notified: string;
  total_completed_tasks: number;

};

export const signUp = createAsyncThunk('auth/signUp', async ({ email, password, allow_notifications, expo_push_token, last_notified,name, notification_frequency, total_completed_tasks }: SignUpPayload, { rejectWithValue }) => {
  const { data, error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        name,
        expo_push_token,
        allow_notifications,
        notification_frequency,
        last_notified,
        total_completed_tasks
      }
    }
  });
  if (error) return rejectWithValue(error.message);
  return data.session;
});

// Sign In (Login)
type SignInPayload = { 
  email: string;
  password: string 
};

export const signIn = createAsyncThunk('auth/signIn', async ({ email, password }: SignInPayload, { rejectWithValue }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return rejectWithValue(error.message);
  return data.session;
});

// Sign Out (Logout)
export const signOut = createAsyncThunk('auth/signOut', async () => {
  await supabase.auth.signOut();
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUp.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signUp.fulfilled, (state, action) => { state.loading = false; state.session = action.payload; })
      .addCase(signUp.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      // Sign In
      .addCase(signIn.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signIn.fulfilled, (state, action) => { state.loading = false; state.session = action.payload; })
      .addCase(signIn.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      // Sign Out
      .addCase(signOut.fulfilled, (state) => { state.session = null; });
  },
});

// Fetch existing session (similar to useEffect logic in the context)
export const fetchSession = createAsyncThunk(
  'auth/fetchSession',
  async (_, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) return rejectWithValue(error.message);
    // Return the session (or null if none exists)
    return data.session;
  }
);

// A helper function to subscribe to auth state changes.
// This is not a thunk because it's used as a side-effect listener.
export const subscribeToAuthChanges = (dispatch: any) => {
  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    // Update the Redux state when the auth state changes.
    dispatch(setSession(session));
  });
  return () => {
    listener.subscription.unsubscribe();
  };
};

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//       user: null,
//       loading: false,
//       error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//       builder
//           // Sign Up
//           .addCase(signUp.pending, (state) => { state.loading = true; state.error = null; })
//           .addCase(signUp.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
//           .addCase(signUp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

//           // Sign In
//           .addCase(signIn.pending, (state) => { state.loading = true; state.error = null; })
//           .addCase(signIn.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
//           .addCase(signIn.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

//           // Sign Out
//           .addCase(signOut.fulfilled, (state) => { state.user = null; });
//   },
// });

export const { setSession } = authSlice.actions;
export default authSlice.reducer;