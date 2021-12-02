import { IRoute } from 'common/type';

export const ROUTES_MAP: IRoute[] = [
  {
    id: 1,
    text: '판타지',
    url: 'fantasy',
    subRoutes: [
      {
        id: 1,
        text: '작품',
        url: 'novels',
        subGenreIds: [1],
      },
    ],
  },
  {
    id: 2,
    text: '현판',
    url: 'modfan',
    subRoutes: [
      {
        id: 2,
        text: '작품',
        url: 'novels',
        subGenreIds: [2],
      },
    ],
  },
  {
    id: 3,
    text: '무협',
    url: 'orifan',
    subRoutes: [
      {
        id: 3,
        text: '작품',
        url: 'novels',
        subGenreIds: [3],
      },
    ],
  },
  {
    id: 4,
    text: '로맨스',
    url: 'romance',
    subRoutes: [
      {
        id: 4,
        text: '작품',
        url: 'novels',
        subGenreIds: [4],
      },
    ],
  },
  {
    id: 5,
    text: '로판',
    url: 'rofan',
    subRoutes: [
      {
        id: 5,
        text: '작품',
        url: 'novels',
        subGenreIds: [5],
      },
    ],
  },
  {
    id: 6,
    text: 'BL',
    url: 'bl',
    subRoutes: [
      {
        id: 6,
        text: '작품',
        url: 'novels',
        subGenreIds: [6],
      },
    ],
  },
  {
    id: 7,
    text: '자유',
    url: 'free',
    subRoutes: [
      {
        id: 7,
        text: '작품',
        url: 'novels',
        subGenreIds: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      },
      {
        id: 16,
        text: '썰Lab',
        url: 'ssullabs',
        subGenreIds: [16],
      },
    ],
  },
];

export const CS_CENTER_URL =
  'https://cs.kakao.com/requests?service=10&locale=ko';

export const ACCESS_TOKEN_KEY = '_access_token';
