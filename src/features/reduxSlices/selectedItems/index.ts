import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Spacecraft } from 'entities/spacecraft/models';

export interface SelectedItemsState {
  value: Spacecraft[];
}

const initialState: SelectedItemsState = {
  value: [],
};

export const selectedItems = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<Spacecraft>) => {
      state.value.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<Spacecraft>) => {
      const filtered = state.value.filter((item) => item.uid !== action.payload.uid);
      state.value = filtered;
    },
    removeAll: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { selectItem, removeItem, removeAll } = selectedItems.actions;

export default selectedItems.reducer;
