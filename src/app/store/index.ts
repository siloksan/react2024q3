import { configureStore } from '@reduxjs/toolkit';
import selectedItems from 'features/reduxSlices/selectedItems';
import spacecrafts from 'features/reduxSlices/spacecrafts';
import { starTrekApi } from 'shared/api/services';

export const store = configureStore({
  reducer: {
    selectedItems,
    spacecrafts,
    [starTrekApi.reducerPath]: starTrekApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(starTrekApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
