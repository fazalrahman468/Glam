import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localStorage from 'redux-persist/es/storage';

const API_URL = 'https://glamparlor.onrender.com';

export const loginUser = createAsyncThunk('user/loginUser', async userCred => {
  const request = await axios.post(`${API_URL}/api/auth`, userCred);
  const response = request.data.user;
  localStorage.setItem('user', JSON.stringify(response));
  return response;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extreReducer: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        console.log(action.error.message);
        if (action.error.message === 'Request failed with status code 401') {
          state.error = 'Access Denied!. Invalid Cred';
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default userSlice.reducer;
