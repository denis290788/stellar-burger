import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  resetConstructor,
  selectorConstructor
} from '../../services/slices/burgerConstructor';
import { useDispatch, useSelector } from '../../services/store';
import { makeOrder } from '../../services/thunks/order';
import { selectorOrder } from '../../services/slices/order';

export const BurgerConstructor: FC = () => {
  /** TODO:DONE? взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { selectorConstructorBun, selectorConstructorIngredients } =
    selectorConstructor;
  const constructorBun = useSelector(
    selectorConstructorBun
  ) as TConstructorIngredient;
  const constructorIngredients = useSelector(
    selectorConstructorIngredients
  ) as TConstructorIngredient[];
  const dispatch = useDispatch();

  const constructorItems = {
    bun: {
      price: constructorBun ? constructorBun.price : 0
    },
    ingredients: constructorIngredients
  };

  const { selectorOrderData, selectorOrderStatus } = selectorOrder;

  const orderStatusRequest = useSelector(selectorOrderStatus);
  const orderRequest = orderStatusRequest === 'Success' ? true : false;
  const orderModalData: TOrder | null = useSelector(selectorOrderData);

  // const orderRequest = false;

  // const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const ingredientsIds = [
      ...constructorIngredients.map((ing) => ing._id),
      constructorBun._id
    ];

    dispatch(makeOrder(ingredientsIds));
  };
  const closeOrderModal = () => {
    dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
