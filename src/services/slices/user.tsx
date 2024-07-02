import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { checkUserAuth } from '../thunks/user';

export interface TUserState {
  isAuthChecked: boolean;
  data: TUser | null;
  requestStatus: RequestStatus;
}

const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  requestStatus: RequestStatus.Idle
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.data = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.requestStatus = RequestStatus.Success;
        state.isAuthChecked = true;
      })
      //   .addCase(registerUser.fulfilled, (state, action) => {
      //     state.data = action.payload.user;
      //     state.requestStatus = RequestStatus.Success;
      //   })
      //   .addCase(loginUser.fulfilled, (state, action) => {
      //     state.data = action.payload.user;
      //     state.requestStatus = RequestStatus.Success;
      //   })
      .addCase(checkUserAuth.pending, (state, action) => {
        state.requestStatus = RequestStatus.Loading;
      })
      //   .addCase(registerUser.pending, (state, action) => {
      //     state.requestStatus = RequestStatus.Loading;
      //   })
      //   .addCase(loginUser.pending, (state, action) => {
      //     state.requestStatus = RequestStatus.Loading;
      //   })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
      });
    //   .addCase(registerUser.rejected, (state, action) => {
    //     state.requestStatus = RequestStatus.Failed;
    //   })
    //   .addCase(loginUser.rejected, (state, action) => {
    //     state.requestStatus = RequestStatus.Failed;
    //   });
  },
  selectors: {
    userDataSelector: (state: TUserState) => state.data,
    isAuthCheckedSelector: (state: TUserState) => state.isAuthChecked
  }
});

export const { userDataSelector, isAuthCheckedSelector } = userSlice.selectors;
export const { setUser, setIsAuthChecked } = userSlice.actions;

export default userSlice.reducer;
