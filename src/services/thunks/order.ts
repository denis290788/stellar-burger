import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const makeOrder = createAsyncThunk(
  'order/orderBurger',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);
