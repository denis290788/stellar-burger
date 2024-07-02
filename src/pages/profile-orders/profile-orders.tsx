import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { selectorOrders } from '../../services/slices/orders';
import { useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO:DONE взять переменную из стора */
  const { selectorOrdersData } = selectorOrders;

  const orders: TOrder[] = useSelector(selectorOrdersData);
  // const orders: TOrder[] = [];

  return <ProfileOrdersUI orders={orders} />;
};
