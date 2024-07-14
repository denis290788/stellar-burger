import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { selectorOrder } from '../../services/slices/order';
import { useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO:DONE взять переменную из стора */
  const { selectorOrdersData } = selectorOrder;

  const orders: TOrder[] = useSelector(selectorOrdersData);
  // const orders: TOrder[] = [];

  return <ProfileOrdersUI orders={orders} />;
};
