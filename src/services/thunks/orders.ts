import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrders = createAsyncThunk<TOrder[]>(
  'orders/getOrders',
  async () => await getOrdersApi()
);
