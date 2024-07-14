import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  resetConstructor,
  selectorConstructor
} from '../../services/slices/burgerConstructor';
import { useDispatch, useSelector } from '../../services/store';
import { makeOrder } from '../../services/thunks/order';
import { resetOrder, selectorOrder } from '../../services/slices/order';
import { useNavigate } from 'react-router-dom';
import { userDataSelector } from '../../services/slices/user';

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
  const navigate = useNavigate();

  const constructorItems = {
    bun: constructorBun,
    ingredients: constructorIngredients
  };

  const { selectorOrderData, selectorOrderStatus, selectorOrdersData } =
    selectorOrder;

  const orders = useSelector(selectorOrdersData);

  const orderStatusRequest = useSelector(selectorOrderStatus);
  const orderRequest = orderStatusRequest === 'Loading' ? true : false;
  const orderModalData = useSelector(selectorOrderData);

  const user = useSelector(userDataSelector);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const ingredientsIds = [
      ...constructorIngredients.map((ing) => ing._id),
      constructorBun._id
    ];

    dispatch(makeOrder(ingredientsIds));
    console.log(orders);
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
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
