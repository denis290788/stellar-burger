import { getUserApi, userApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const checkUserAuth = createAsyncThunk<
  { user: TUser },
  void,
  { rejectValue: string }
>('user/checkUserAuth', async (_, { rejectWithValue }) => {
  try {
    const response = await getUserApi();
    if (response.success) {
      return response;
    } else {
      return rejectWithValue('Failed to fetch user data');
    }
  } catch (error) {
    return rejectWithValue('Failed to fetch user data');
  }
});
