import { configureStore } from '@reduxjs/toolkit';
import { lessonsApi } from './services/lessons';
import { usersApi } from './services/users';

export const store = configureStore({
  reducer: {
    [lessonsApi.reducerPath]: lessonsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(lessonsApi.middleware, usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
