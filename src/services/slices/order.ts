import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { makeOrder } from '../thunks/order';
import { getOrder } from '../thunks/getOrder';

type TOrderState = {
  info: TOrder | null;
  requestStatus: RequestStatus;
};

const initialState: TOrderState = {
  info: null,
  requestStatus: RequestStatus.Idle
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state, action) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.info = action.payload.order;
      })
      .addCase(getOrder.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.info = action.payload;
      })
      .addCase(getOrder.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    selectorOrderData: (state: TOrderState) => state.info,
    selectorOrderStatus: (state: TOrderState) => state.requestStatus
  }
});

export const selectorOrder = orderSlice.selectors;
