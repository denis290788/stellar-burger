import { RequestStatus } from '@utils-types';
import { initialState, orderSlice, resetOrder } from './order';
import { getOrder, getOrders, makeOrder } from '../thunks/order';

describe('orderSlice', () => {
  const testOrder = {
    _id: '1',
    ingredients: ['643d69a5c3f7b9001cfa093c'],
    status: 'done',
    name: 'name',
    createdAt: '2024-08-23T17:22:37.284Z',
    updatedAt: '2024-08-23T17:22:37.763Z',
    number: 50897
  };

  const testError = new Error('error message');

  test('устанавливается статус Loading при запросе makeOrder', () => {
    const actualState = orderSlice.reducer(
      initialState,
      makeOrder.pending('', [''])
    );

    expect(actualState).toEqual({
      ...initialState,
      requestStatus: RequestStatus.Loading
    });
  });

  test('при успешном создании заказа устанавливается статус Success и добавляется новый заказ', () => {
    const actualState = orderSlice.reducer(
      {
        ...initialState,
        requestStatus: RequestStatus.Loading
      },
      makeOrder.fulfilled(
        { success: true, order: testOrder, name: 'name' },
        '',
        ['']
      )
    );

    expect(actualState).toEqual({
      order: testOrder,
      orders: [testOrder],
      requestStatus: RequestStatus.Success
    });
  });

  test('при ошибке создания заказа устанавливается статус Failed', () => {
    const actualState = orderSlice.reducer(
      {
        ...initialState,
        requestStatus: RequestStatus.Loading
      },
      makeOrder.rejected(testError, '', [''])
    );

    expect(actualState).toEqual({
      ...initialState,
      requestStatus: RequestStatus.Failed
    });
  });

  test('сброс заказа через resetOrder', () => {
    const initialStateWithOrder = {
      ...initialState,
      order: testOrder,
      requestStatus: RequestStatus.Success
    };

    const actualState = orderSlice.reducer(initialStateWithOrder, resetOrder());

    expect(actualState).toEqual({
      ...initialState,
      order: null,
      requestStatus: RequestStatus.Idle
    });
  });

  test('устанавливается статус Loading при запросе getOrders', () => {
    const actualState = orderSlice.reducer(initialState, getOrders.pending(''));

    expect(actualState).toEqual({
      ...initialState,
      requestStatus: RequestStatus.Loading
    });
  });

  test('при успешном запросе getOrders устанавливается статус Success и добавляются заказы', () => {
    const testOrders = [
      {
        _id: '1',
        ingredients: ['643d69a5c3f7b9001cfa093c'],
        status: 'done',
        name: 'Краторный люминесцентный бургер',
        createdAt: '2024-08-23T17:22:37.284Z',
        updatedAt: '2024-08-23T17:22:37.763Z',
        number: 50897
      },
      {
        _id: '2',
        ingredients: ['643d69a5c3f7b9001cfa093c'],
        status: 'done',
        name: 'Краторный люминесцентный метеоритный бургер',
        createdAt: '2024-08-23T17:13:54.100Z',
        updatedAt: '2024-08-23T17:13:54.587Z',
        number: 50896
      }
    ];

    const actualState = orderSlice.reducer(
      {
        ...initialState,
        requestStatus: RequestStatus.Loading
      },
      getOrders.fulfilled(testOrders, '')
    );

    expect(actualState).toEqual({
      order: null,
      orders: testOrders,
      requestStatus: RequestStatus.Success
    });
  });

  test('при ошибке запроса getOrders устанавливается статус Failed', () => {
    const actualState = orderSlice.reducer(
      {
        ...initialState,
        requestStatus: RequestStatus.Loading
      },
      getOrders.rejected(testError, '')
    );

    expect(actualState).toEqual({
      ...initialState,
      requestStatus: RequestStatus.Failed
    });
  });

  test('устанавливается статус Loading при запросе getOrder', () => {
    const actualState = orderSlice.reducer(
      initialState,
      getOrder.pending('', 50897)
    );

    expect(actualState).toEqual({
      ...initialState,
      requestStatus: RequestStatus.Loading
    });
  });

  test('при успешном запросе getOrder устанавливается статус Success и добавляется заказ в state', () => {
    const actualState = orderSlice.reducer(
      {
        ...initialState,
        requestStatus: RequestStatus.Loading
      },
      getOrder.fulfilled({ success: true, orders: [testOrder] }, '', 50897)
    );

    expect(actualState).toEqual({
      order: testOrder,
      orders: [testOrder],
      requestStatus: RequestStatus.Success
    });
  });

  test('при ошибке запроса getOrder устанавливается статус Failed', () => {
    const actualState = orderSlice.reducer(
      {
        ...initialState,
        requestStatus: RequestStatus.Loading
      },
      getOrder.rejected(testError, '', 50897)
    );

    expect(actualState).toEqual({
      ...initialState,
      requestStatus: RequestStatus.Failed
    });
  });
});
