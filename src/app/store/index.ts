import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as countries } from '../features/country';
import { reducer as usersData } from '../features/submit-form';

const rootReducer = combineReducers({
  countries,
  usersData,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
