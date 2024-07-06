import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed } from '../../services/thunks/feed';
import { selectorFeed } from '../../services/slices/feed';
import { useLocation } from 'react-router-dom';

export const Feed: FC = () => {
  /** TODO:DONE? взять переменную из стора */

  // const orders: TOrder[] = [];
  const { selectorFeedData } = selectorFeed;
  const orders: TOrder[] = useSelector(selectorFeedData);
  const dispatch = useDispatch();

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI
    orders={orders}
    handleGetFeeds={() => {
      dispatch(getFeed());
    }}
  />;
};
