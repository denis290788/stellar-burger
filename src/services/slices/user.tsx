import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import {
  checkUserAuth,
  login,
  logout,
  register,
  updateUser
} from '../thunks/user';
import { TLoginData } from '@api';

export interface TUserState {
  isAuthChecked: boolean;
  user: TUser | null;
  requestStatus: RequestStatus;
}

const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  requestStatus: RequestStatus.Idle
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // .addCase(checkUserAuth.fulfilled, (state, action) => {
      //   state.data = action.payload.user;
      //   state.requestStatus = RequestStatus.Success;
      //   state.isAuthChecked = true;
      // })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.requestStatus = RequestStatus.Success;
      })
      // .addCase(checkUserAuth.pending, (state, action) => {
      //   state.requestStatus = RequestStatus.Loading;
      // })
      .addCase(register.pending, (state, action) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(login.pending, (state, action) => {
        state.requestStatus = RequestStatus.Loading;
      })
      // .addCase(checkUserAuth.rejected, (state, action) => {
      //   state.requestStatus = RequestStatus.Failed;
      // });
      .addCase(register.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(login.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(logout.fulfilled, () => initialState);
  },
  selectors: {
    userDataSelector: (state: TUserState) => state.user,
    isAuthCheckedSelector: (state: TUserState) => state.isAuthChecked
  }
});

export const { userDataSelector, isAuthCheckedSelector } = userSlice.selectors;
export const { setUser, setIsAuthChecked } = userSlice.actions;

export default userSlice.reducer;
