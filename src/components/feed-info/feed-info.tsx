import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { selectorOrder } from '../../services/slices/order';
import { useSelector } from '../../services/store';
import { selectorFeed } from '../../services/slices/feed';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO:DONE? взять переменные из стора */
  const { selectorOrdersData } = selectorOrder;
  const {
    selectorFeedData,
    selectorFeedTotal,
    selectorFeedTotalToday,
    selectorFeedStatus
  } = selectorFeed;

  const orders: TOrder[] = useSelector(selectorOrdersData);
  const feedOrders = useSelector(selectorFeedData);
  const feedTotal = useSelector(selectorFeedTotal);
  const feedTotalToday = useSelector(selectorFeedTotalToday);
  const feedStatus = useSelector(selectorFeedStatus);
  const feed = {
    orders: feedOrders,
    total: feedTotal,
    totalToday: feedTotalToday,
    status: feedStatus
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
