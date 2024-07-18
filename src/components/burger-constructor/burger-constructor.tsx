import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  resetConstructor,
  selectorConstructorBun,
  selectorConstructorIngredients
} from '../../services/slices/burgerConstructor';
import { useDispatch, useSelector } from '../../services/store';
import { makeOrder } from '../../services/thunks/order';
import {
  resetOrder,
  selectorOrderData,
  selectorOrderStatus
} from '../../services/slices/order';
import { useNavigate } from 'react-router-dom';
import { userDataSelector } from '../../services/slices/user';

export const BurgerConstructor: FC = () => {
  /** TODO:DONE? взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorBun = useSelector(
    selectorConstructorBun
  ) as TConstructorIngredient;
  const constructorIngredients = useSelector(
    selectorConstructorIngredients
  ) as TConstructorIngredient[];
  const constructorItems = {
    bun: constructorBun,
    ingredients: constructorIngredients
  };

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
      constructorBun._id,
      ...constructorIngredients.map((ing) => ing._id),
      constructorBun._id
    ];

    dispatch(makeOrder(ingredientsIds));
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
