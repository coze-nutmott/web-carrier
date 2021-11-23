/**
 * 주요 포인트
 * 타입 이름은 항상 I 로 시작합니다
 */
export interface IRoute {
  id: number;
  text: string;
  url: string;
  subRoutes?: IRoute[];
  subGenreIds?: number[]; // 소장르 페이지에서 보여줄 subGenreId 리스트
  rankingSubRoutes?: boolean; // 랭킹에서 소장르 선택 표시 여부
}

export type IGenre =
  | 'fantasy'
  | 'modfan'
  | 'orifan'
  | 'romance'
  | 'rofan'
  | 'bl'
  | 'free';

export interface ISubGenre {
  id: number;
  genreId: number;
  name: string;
  createdAt: ITimestamp;
  active: boolean;
}

/**
 * ISO 8601 포맷 타임스탬프
 * ex: 2020-08-05T09:01:47
 */
export type ITimestamp = string;

export interface IErrorResponse {
  className: string;
  fieldName: string;
  httpStatusCode: number;
  httpStatusMessage: string;
  stageErrorName: string;
  stageErrorCode: string;
  stageErrorMessage: string;
}

export type IEpisodeStatus = 'ACTIVE' | 'DELETE' | 'BLOCK' | 'COPYRIGHT_BLOCK';

export interface IEpisode {
  id: number;
  index?: number; // 회차 번호
  title: string;
  preview: string;
  bodySize: number;
  status: IEpisodeStatus;
  published: boolean;
  publishedAt?: ITimestamp;
  firstPublishedAt?: ITimestamp;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: ITimestamp;
  editedAt: ITimestamp;
}

export interface IDisplayOptions {
  background: IBackgroundOption;
  fontSize: number; // px
  font: IFont;
}
export type IBackgroundOption = 'lightMode' | 'darkMode' | 'greenMode';
export type IFont = 'sans-serif' | 'serif';
