import { configureStore } from '@reduxjs/toolkit';
import selectedItems from 'features/reduxSlices/selectedItems';

export const store = configureStore({
  reducer: {
    selectedItems,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
