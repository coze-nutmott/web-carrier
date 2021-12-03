import { ROUTES_MAP } from 'common/constant';
import { IRoute } from 'common/type';
import GenreContainer from 'genre/container/GenreContainer';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

export interface IProps {
  genre: IRoute;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = ROUTES_MAP.map(genre => ({
    params: { genre: genre.url },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async context => {
  return {
    props: {
      genre: ROUTES_MAP.find(genre => genre.url === context.params?.genre),
    },
  };
};

export default function Genre({ genre }: IProps) {
  return <GenreContainer genre={genre} />;
}
