// store/sidebarSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {getUserDetails} from '@/utils/userDetails';

interface UserState {
  username?: string;
  userId?: number | null;
  picture?: string;
  emailId?: string;
  role?: string;
  state?: 'pending' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  username: '',
  userId: null,
  picture: '',
  emailId: '',
  role: '',
  state: 'pending',
};

export const getDetails = createAsyncThunk(
  'auth/getDetails',
  async (_, thunkAPI) => {
    try {
      const res = await getUserDetails();
      return res as UserState;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails(state, action: PayloadAction<UserState>) {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.picture = action.payload.picture;
      state.emailId = action.payload.emailId;
      state.role = action.payload.role;
    },
    // You can add logout reducer if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetails.pending, (state) => {
        state.state = 'loading';
      })
      .addCase(getDetails.fulfilled, (state, action: PayloadAction<UserState>) => {
        state.username = action.payload.username;
        state.emailId = action.payload.emailId;
        state.userId = action.payload.userId;
        state.role = action.payload.role;
        state.picture = action.payload.picture;
        state.state = 'succeeded';
      })
      .addCase(getDetails.rejected, (state) => {
        state.state = 'failed';
      });
  },
});

// Selectors
export const userState = (state: RootState) => state.user;

// Actions
export const { setUserDetails } = userSlice.actions;

// Reducer
export default userSlice.reducer;
