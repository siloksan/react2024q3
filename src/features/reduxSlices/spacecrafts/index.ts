import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Spacecraft } from 'entities/spacecraft/models';

export interface Spacecrafts {
  value: Spacecraft[] | null;
}

const initialState: Spacecrafts = {
  value: null,
};

export const selectedItems = createSlice({
  name: 'spacecrafts',
  initialState,
  reducers: {
    getSpaceCrafts: (state, action: PayloadAction<Spacecrafts>) => {
      state.value = action.payload.value;
    },
  },
});

export const { getSpaceCrafts } = selectedItems.actions;

export default selectedItems.reducer;
