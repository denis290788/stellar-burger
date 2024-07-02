import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { getOrders } from '../thunks/orders';

type TOrdersState = {
  data: TOrder[];
  status: RequestStatus;
};

const initialState: TOrdersState = {
  data: [],
  status: RequestStatus.Idle
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.data = action.payload;
      })
      .addCase(getOrders.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectorOrdersData: (state: TOrdersState) => state.data,
    selectorOrdersStatus: (state: TOrdersState) => state.status
  }
});

export const selectorOrders = ordersSlice.selectors;
