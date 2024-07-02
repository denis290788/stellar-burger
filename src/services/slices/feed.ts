import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { getFeed } from '../thunks/feed';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: RequestStatus;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeed.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectorFeedData: (state: TFeedState) => state.orders,
    selectorFeedTotal: (state: TFeedState) => state.total,
    selectorFeedTotalToday: (state: TFeedState) => state.totalToday,
    selectorFeedStatus: (state: TFeedState) => state.status
  }
});

// export const {
//   selectorFeedData,
//   selectorFeedTotal,
//   selectorFeedTotalToday,
//   selectorFeedStatus
// } = feedSlice.selectors;

export const selectorFeed = feedSlice.selectors;
