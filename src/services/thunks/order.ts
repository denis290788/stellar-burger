import { getOrdersApi, orderBurgerApi } from '@api';
import { getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const makeOrder = createAsyncThunk(
  'order/makeOrder',
  async (ingredients: string[]) => {
    const order = await orderBurgerApi(ingredients);
    return order;
  }
);

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response;
  }
);

export const getOrders = createAsyncThunk<TOrder[]>(
  'order/getOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);
