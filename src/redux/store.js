import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import newsReducer from './slices/newsSlice';
import notificationReducer from './slices/notificationSlice';

const store = configureStore({
  reducer: {
    news: newsReducer,
    notification: notificationReducer,
    user: userReducer,
  },
});

export default store;
