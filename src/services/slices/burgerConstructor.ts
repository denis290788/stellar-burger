import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TBurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addToConstructor: {
      prepare: (ingredients: TIngredient) => ({
        payload: { ...ingredients, id: nanoid() }
      }),
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      }
    },
    removeFromConstructor: (state, { payload }: PayloadAction<number>) => {
      state.ingredients.splice(payload, 1);
    },
    reorderConstructor: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.ingredients = ingredients;
    },
    resetConstructor: () => initialState
  },
  selectors: {
    selectorConstructorBun: (state: TBurgerConstructorState) => state.bun,
    selectorConstructorIngredients: (state: TBurgerConstructorState) =>
      state.ingredients
  }
});

export const {
  addToConstructor,
  removeFromConstructor,
  reorderConstructor,
  resetConstructor
} = burgerConstructorSlice.actions;

export const { selectorConstructorBun, selectorConstructorIngredients } =
  burgerConstructorSlice.selectors;
