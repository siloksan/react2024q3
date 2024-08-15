import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type FormData } from '@/utils/validate-schema';

export type SerializeUserData = Omit<FormData, 'image'> & { image: string; id: number };

const initialState: SerializeUserData[] = [];

export const usersData = createSlice({
  name: 'usersData',
  initialState,
  reducers: {
    submitForm: (state, action: PayloadAction<SerializeUserData>) => {
      state.push(action.payload);
    },
  },
});

export const { submitForm } = usersData.actions;

export const { reducer } = usersData;
