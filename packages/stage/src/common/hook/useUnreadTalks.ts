import { queryFn } from 'common/util/api';
import { useQuery } from 'react-query';
import useSession from './useSession';

interface IUseUnreadTalksReturn {
  haveNewMessage: boolean;
  newMessageCount: number;
}

export default function useUnreadTalks(): IUseUnreadTalksReturn {
  const { loggedOut } = useSession();

  const { data } = useQuery<{ count: number }>('/talk-rooms/unreads', {
    queryFn,
    retry: false,
    enabled: !loggedOut,
  });

  const newMessageCount = data?.count || 0;
  const haveNewMessage = newMessageCount > 0;

  return {
    newMessageCount,
    haveNewMessage,
  };
}
