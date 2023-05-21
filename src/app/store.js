import { configureStore } from '@reduxjs/toolkit';
import reducer from '../slices/userSlice';
import bookmarks from '../slices/bookmarksSlice'
import  apiSlice  from '../api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: reducer,
    bookmarks: bookmarks
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});
