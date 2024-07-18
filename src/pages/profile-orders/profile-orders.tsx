import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { selectorOrdersData } from '../../services/slices/order';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../services/thunks/order';

export const ProfileOrders: FC = () => {
  /** TODO:DONE взять переменную из стора */

  const orders: TOrder[] = useSelector(selectorOrdersData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
