import { getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrder = createAsyncThunk<TOrder, number>(
  'order/getOrder',
  async (number: number) => {
    const responce = await getOrderByNumberApi(number);
    return responce.orders[0];
  }
);
