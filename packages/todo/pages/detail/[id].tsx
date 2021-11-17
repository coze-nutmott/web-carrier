import type { NextPage } from 'next';
import React from 'react';

import useQueryParameter, {
  getNumberRequired,
} from 'shared/hook/useQueryParameter';

import Detail from 'detail/container/Detail';

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
