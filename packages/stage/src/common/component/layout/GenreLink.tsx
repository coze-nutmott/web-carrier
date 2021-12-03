import React from 'react';
import Link from 'next/link';
import { IRoute } from 'common/type';

interface IProps {
  route: Omit<IRoute, 'id'>;
  isActive?: boolean;
}

export default function GenreLink({ route, isActive }: IProps) {
  return (
    <Link href={`/${route.url}`} passHref>
      <a
        className={cn(
          'relative mr-34 desktop:mr-28 font-15 desktop:font-16',
          isActive ? 'text-black font-bold' : 'text-grayFont font-medium',
        )}
      >
        {route.text}
        {isActive && (
          <div className="w-8 desktop:w-10 h-8 desktop:h-10 absolute bg-yellow top-0 -right-1 desktop:-right-4 z-[-1]" />
        )}
      </a>
    </Link>
  );
}
