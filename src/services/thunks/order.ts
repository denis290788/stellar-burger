import { getOrdersApi, orderBurgerApi } from '@api';
import { getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

// export const makeOrder = createAsyncThunk(
//   'order/makeOrder',
//   async (ingredients: string[]) => await orderBurgerApi(ingredients)
// );

export const makeOrder = createAsyncThunk(
  'order/makeOrder',
  async (ingredients: string[]) => {
    const order = await orderBurgerApi(ingredients);
    console.log(order.order);
    return order;
  }
);

export const getOrder = createAsyncThunk<TOrder, number>(
  'order/getOrder',
  async (number: number) => {
    const responce = await getOrderByNumberApi(number);
    return responce.orders[0];
  }
);

export const getOrders = createAsyncThunk<TOrder[]>(
  'order/getOrders',
  async () => {
    const orders = await getOrdersApi();
    console.log(orders);
    return orders;
  }
);
