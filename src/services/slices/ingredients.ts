import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';

import { getIngredients } from '../thunks/ingredients';

export type TIngredientState = {
  data: TIngredient[];
  status: RequestStatus;
};

export const initialState: TIngredientState = {
  data: [],
  status: RequestStatus.Idle
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.data = action.payload;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectorIngredientsData: (state) => state.data,
    selectorIngredientsStatus: (state) => state.status
  }
});

export const { selectorIngredientsData, selectorIngredientsStatus } =
  ingredientsSlice.selectors;
