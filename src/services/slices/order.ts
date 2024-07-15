import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { getOrders, makeOrder } from '../thunks/order';
import { getOrder } from '../thunks/order';

type TOrderState = {
  order: TOrder | null;
  orders: TOrder[];
  requestStatus: RequestStatus;
};

const initialState: TOrderState = {
  order: null,
  orders: [],
  requestStatus: RequestStatus.Idle
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.requestStatus = RequestStatus.Idle;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.orders.push(action.payload.order);
      })
      .addCase(makeOrder.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })

      .addCase(getOrder.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.order = action.payload;
      })
      .addCase(getOrder.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })

      .addCase(getOrders.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    selectorOrderData: (state) => state.order,
    selectorOrderStatus: (state) => state.requestStatus,
    selectorOrdersData: (state) => state.orders
  }
});

export const { resetOrder } = orderSlice.actions;

export const { selectorOrderData, selectorOrderStatus, selectorOrdersData } =
  orderSlice.selectors;
