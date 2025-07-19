import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  news: [],
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },
    addNews: (state, action) => {
      state.news.unshift(action.payload);
    },
  },
});

export const { setNews, addNews } = newsSlice.actions;
export default newsSlice.reducer; 