import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '@/config/supabase';


interface Todo {
  id?: string;
  user_id: string;
  title: string;
  deadline: string;
  is_completed: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

// Fetch todos from Supabase
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async ({ user_id }: { user_id: string }) => {
  const { data, error } = await supabase.from('todos').select('*').eq('user_id', user_id);
  if (error) {
    throw error;
  }
  return data;
});

// Add a new todo to Supabase
export const addTodo = createAsyncThunk('todos/addTodo', async ({title, deadline, user_id}: {title:string, deadline:string, user_id:string}) => {
  const { data, error } = await supabase.from('todos').insert([{ title, deadline, user_id, is_completed: false }]).select().single();
  if (error) throw error;
  return data;
});

// Delete a todo from Supabase
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: string) => {
  const { error } = await supabase.from('todos').delete().eq('id', id).single();
  if (error) throw error;
  return id; // Ensure the id is returned as the payload
});

// Toggle todo completion in Supabase
export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (id: string) => {
  const { data, error } = await supabase
    .from('todos')
    .update({ is_completed: true })
    .eq('id', id)
    .select("*")
    .single();
  console.log(data);
  
  const {} = await supabase.rpc('increment_total_tasks', {user_id: data.user_id})
  if (error) throw error;  
  return data;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.loading = false;
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload; // Update the todo with new is_completed value
        }
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});


export default todoSlice.reducer;