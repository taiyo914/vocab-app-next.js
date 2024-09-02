// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // ここにリデューサーを追加
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
