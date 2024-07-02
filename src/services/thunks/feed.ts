import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeed = createAsyncThunk<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>('feed/getFeed', async () => await getFeedsApi());
