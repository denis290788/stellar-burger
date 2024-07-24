import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { getUser, login, logout, register, updateUser } from '../thunks/user';
import { access } from 'fs';

export interface TUserState {
  error: string | null;
  isAuthChecked: boolean;
  user: TUser | null;
  loginRequest: boolean;
  requestStatus: RequestStatus;
}

const initialState: TUserState = {
  error: null,
  isAuthChecked: false,
  user: null,
  loginRequest: false,
  requestStatus: RequestStatus.Idle
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.requestStatus = RequestStatus.Success;
        state.isAuthChecked = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
        state.error = action.error.message!;
      })
      .addCase(login.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.requestStatus = RequestStatus.Success;
        state.isAuthChecked = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
        state.error = action.error.message!;
      })
      .addCase(getUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.requestStatus = RequestStatus.Success;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.requestStatus = RequestStatus.Success;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
        state.error = action.error.message!;
      })
      .addCase(logout.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = false;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(logout.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
        state.error = action.error.message!;
      });
  },
  selectors: {
    userDataSelector: (state: TUserState) => state.user,
    isAuthCheckedSelector: (state: TUserState) => state.isAuthChecked,
    userRequestStatus: (state: TUserState) => state.requestStatus,
    errorSelector: (state: TUserState) => state.error
  }
});

export const {
  userDataSelector,
  isAuthCheckedSelector,
  userRequestStatus,
  errorSelector
} = userSlice.selectors;

export default userSlice.reducer;
