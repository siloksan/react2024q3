import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Spacecraft } from 'entities/spacecraft/models';

export interface ItemDetailsState {
  value: Spacecraft | null;
}

const initialState: ItemDetailsState = {
  value: null,
};

export const itemDetails = createSlice({
  name: 'itemDetails',
  initialState,
  reducers: {
    saveDetails: (state, action: PayloadAction<Spacecraft>) => {
      state.value = action.payload;
    },
    removeDetails: (state) => {
      state.value = null;
    },
  },
});

export const { saveDetails, removeDetails } = itemDetails.actions;

export default itemDetails.reducer;
