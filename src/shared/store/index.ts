import itemDetails from '@/features/reduxSlices/itemDetails';
import selectedItems from '@/features/reduxSlices/selectedItems';
import spacecrafts from '@/features/reduxSlices/spacecrafts';
import { Action } from '@reduxjs/toolkit/react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { starTrekApi } from '../api/services';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
  selectedItems,
  spacecrafts,
  itemDetails,
  [starTrekApi.reducerPath]: starTrekApi.reducer,
});

// const reducer = (state: RootState, action: Action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     };
//     return nextState;
//   } else {
//     return rootReducer(state, action);
//   }
// };


export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(starTrekApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });
