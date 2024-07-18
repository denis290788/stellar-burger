import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { getUser, login, logout, register, updateUser } from '../thunks/user';

export interface TUserState {
  isAuthChecked: boolean;
  user: TUser | null;
  loginRequest: boolean;
  requestStatus: RequestStatus;
}

const initialState: TUserState = {
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
      .addCase(register.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(login.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.requestStatus = RequestStatus.Success;
        state.isAuthChecked = true;
      })
      .addCase(login.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
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
      .addCase(updateUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(logout.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = false;
      })
      .addCase(logout.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    userDataSelector: (state: TUserState) => state.user,
    isAuthCheckedSelector: (state: TUserState) => state.isAuthChecked
  }
});

export const { userDataSelector, isAuthCheckedSelector } = userSlice.selectors;

export default userSlice.reducer;
