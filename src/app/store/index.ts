import { combineReducers, configureStore } from '@reduxjs/toolkit';
import itemDetails from 'features/reduxSlices/itemDetails';
import selectedItems from 'features/reduxSlices/selectedItems';
import spacecrafts from 'features/reduxSlices/spacecrafts';
import { starTrekApi } from 'shared/api/services';

const rootReducer = combineReducers({
  selectedItems,
  spacecrafts,
  itemDetails,
  [starTrekApi.reducerPath]: starTrekApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(starTrekApi.middleware),
    preloadedState,
  });
};

export const store = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
