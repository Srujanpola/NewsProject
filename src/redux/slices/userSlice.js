import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  name: '',
  email: '',
  phone: '',
  location: '',
  language: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      AsyncStorage.setItem('language', action.payload);
    },
    loadLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
  extraReducers: builder => {},
});

export const { setLanguage, loadLanguage } = userSlice.actions;
export default userSlice.reducer;
