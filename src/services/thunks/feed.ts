import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeed = createAsyncThunk('feed/getFeed', async () => {
  const feed = await getFeedsApi();
  return feed;
});
