import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  name: '',
  email: '',
  phone: '',
  locationRegional: '',
  locationEnglish: '',
  language: 'en',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      console.log('action.payload for language', action.payload);
      AsyncStorage.setItem('language', action.payload);
    },
    setLocationRegional: (state, action) => {
      state.locationRegional = action.payload;
      AsyncStorage.setItem('locationRegional', JSON.stringify(action.payload));
    },
    setLocationEnglish: (state, action) => {
      state.locationEnglish = action.payload;
      AsyncStorage.setItem('locationEnglish', JSON.stringify(action.payload));
    },
    loadLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
  extraReducers: builder => {},
});

export const { setLanguage, loadLanguage, setLocationRegional, setLocationEnglish } = userSlice.actions;
export default userSlice.reducer;
