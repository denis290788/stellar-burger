import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { selectorConstructor } from '../../services/slices/burgerConstructor';
import { useSelector } from '../../services/store';
import { selectorOrder } from '../../services/slices/order';

export const OrderInfo: FC = () => {
  /** TODO:DONE? взять переменные orderData и ingredients из стора */

  const { selectorConstructorIngredients, selectorConstructorBun } =
    selectorConstructor;
  const ingredients: TIngredient[] = useSelector(
    selectorConstructorIngredients
  ) as TConstructorIngredient[];
  const bun: TIngredient = useSelector(
    selectorConstructorBun
  ) as TConstructorIngredient;
  // const ingredientsIds = ingredients.map((ing) => ing._id);

  const ingredientsIds = [...ingredients.map((ing) => ing._id), bun._id];

  const { selectorOrderData } = selectorOrder;
  const order: TOrder | null = useSelector(selectorOrderData);

  if (!order) {
    return <Preloader />;
  }

  const orderData = {
    createdAt: order.createdAt,
    ingredients: ingredientsIds,
    _id: order._id,
    status: order.status,
    name: order.name,
    updatedAt: order.updatedAt,
    number: order.number
  };

  // const ingredients: TIngredient[] = [];

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
