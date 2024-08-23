import { burgerConstructorSlice } from './slices/burgerConstructor';
import { feedSlice } from './slices/feed';
import { ingredientsSlice } from './slices/ingredients';
import { orderSlice } from './slices/order';
import { userSlice } from './slices/user';
import store from './store';

describe('rootReducer', () => {
  test('корректно инициализируется rootReducer', () => {
    const initialState = {
      [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
      [userSlice.name]: userSlice.getInitialState(),
      [feedSlice.name]: feedSlice.getInitialState(),
      [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
      [orderSlice.name]: orderSlice.getInitialState()
    };

    const state = store.getState();

    expect(state).toEqual(initialState);
  });
});
