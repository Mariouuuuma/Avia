import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import supabase from '../../Utils/api';

interface DataState {
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
  session: any;
  user: any;
}

const initialState: DataState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  session: {},
  user: {},
};


  
  // Create the login async thunk
  export const login = createAsyncThunk(
    'auth/login',
    async (queries:{email:string,password:string}, thunkAPI) => {
      try {
        const { email, password } = queries;
        const { data, error } = await supabase.auth.signInWithPassword({
          email:queries?.email,
          password:queries?.password
        });
        
        if (error) {
          return thunkAPI.rejectWithValue(error.message); // Return error message
        }
  
        // Return the data upon successful login
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue('Une erreur s\'est produite lors de la connexion.');
      }
    }
  );
  
  // Create the auth slice
  const authSlice = createSlice({
    name: 'auth',
    initialState:initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.session=action.payload.session // Assuming 'user' data is returned upon successful login
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error =
          typeof action.payload === 'string'
            ? action.payload // Set error to the rejection reason if it's a string
            : 'Une erreur s\'est produite lors de la connexion.'; // Default error message
      });
    },
  });
  
  export default authSlice.reducer;