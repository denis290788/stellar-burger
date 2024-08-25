import { combineReducers } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from './slices/burgerConstructor';
import { feedSlice } from './slices/feed';
import { ingredientsSlice } from './slices/ingredients';
import { orderSlice } from './slices/order';
import { userSlice } from './slices/user';
import store from './store';

describe('rootReducer', () => {
  const rootReducer = combineReducers({
    [ingredientsSlice.name]: ingredientsSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [feedSlice.name]: feedSlice.reducer,
    [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
    [orderSlice.name]: orderSlice.reducer
  });
  test('корректно инициализируется rootReducer при передаче в стейт undefined и неизвестного экшена', () => {
    const initialState = {
      [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
      [userSlice.name]: userSlice.getInitialState(),
      [feedSlice.name]: feedSlice.getInitialState(),
      [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
      [orderSlice.name]: orderSlice.getInitialState()
    };

    const state = rootReducer(undefined, { type: '' });

    expect(state).toEqual(initialState);
  });
});
