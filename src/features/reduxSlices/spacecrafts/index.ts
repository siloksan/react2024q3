import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Spacecraft } from 'entities/spacecraft/models';

export interface Spacecrafts {
  value: Spacecraft[];
}

const initialState: Spacecrafts = {
  value: [],
};

export const selectedItems = createSlice({
  name: 'spacecrafts',
  initialState,
  reducers: {
    setSpacecrafts: (state, action: PayloadAction<Spacecraft[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setSpacecrafts } = selectedItems.actions;

export default selectedItems.reducer;
