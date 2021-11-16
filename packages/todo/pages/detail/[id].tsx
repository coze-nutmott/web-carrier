import type { NextPage } from 'next';
import React from 'react';

import Detail from 'detail/container/Detail';

import useQueryParameter, {
  getNumberRequired,
} from 'shared/hook/useQueryParameter';

interface IQuery {
  id: number;
}

const DetailPage: NextPage = () => {
  const param = useQueryParameter<IQuery>([
    { name: 'id', getter: getNumberRequired },
  ]);

  if (!param.isValid) {
    return null;
  }
  return <Detail todoId={param.query.id} />;
};

export default DetailPage;
