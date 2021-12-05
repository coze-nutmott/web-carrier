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

export interface IUser {
  id: number;
  email: string;
  emailVerified: boolean;
  adultVerified: boolean;
  age: number | null;
  username: string;
  defaultNicknameId: number;
  profile?: IFile | null;
  userType: 'ADMIN' | 'USER' | 'CP';
  userStatus: 'ACTIVE' | 'STOP' | 'WITHDRAWAL';
  createdAt: ITimestamp;
}

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

export interface INickname {
  id: number;
  name: string;
  createdAt: ITimestamp;
  profile?: IFile;
  required?: boolean;
  type: 'USER' | 'CP' | 'ADMIN';
  withdrawal: boolean;
  kakaopageNicknameFlag?: boolean;
  isDeleted?: boolean;
}

export type IFlashType = 'success' | 'error';

export interface IFlash {
  id: number;
  message: string;
  type: IFlashType;
}

export interface IFile {
  byteSize: number;
  checksum: string;
  contentType?: string;
  filename: string;
  id: number;
  metadata: string;
  path: string;
  url: string;
}

export interface IKeyword {
  id: number;
  name: string;
  groupName: string;
  createdAt: ITimestamp;
}

export interface IRanking {
  novel: INovel;
  changeRanking: number | null;
}

export type INovelStatus =
  | 'PUBLIC'
  | 'INFORMATION'
  | 'PRIVATE'
  | 'DELETE'
  | 'BLOCK'
  | 'COPYRIGHT_BLOCK';
export type IAgeRating = 'ALL' | 'FIFTEEN' | 'NINETEEN';
export type IRegisterType = 'TOOL' | 'ATTACHMENT';
export type IContentType = 'WEBTOON' | 'NOVEL';
export type IContestVisibility = 'PUBLIC' | 'INFORMATION' | 'PRIVATE';
export type IContestStatus = 'PUBLIC' | 'PRIVATE' | 'DELETE';
export interface INovel {
  // NOTE: Novel은 ID가 아닌 stageSeriesNumber를 PK로 사용하도록 합니다.
  // id: number;
  stageSeriesNumber: number;
  title: string;
  contest?: INovelContest;
  synopsis: string;
  thumbnail?: IFile;
  ageRating: IAgeRating;
  subGenre: ISubGenre;
  keywords: IKeyword[];
  kakaopageSeries: boolean;
  seriesId?: number; // 카카오페이지 채널링에 사용되는 카카오페이지 작품 ID
  status: INovelStatus;
  nickname: INickname;
  seriesSupportStatus: null | 'JOIN' | 'ACTIVE' | 'END' | 'CANCEL' | 'DELETE';
  completeGuaranteeSupportStatus: null | 'JOIN' | 'END' | 'CANCEL' | 'DELETE';
  firstPublishedAt: ITimestamp;
  latestPublishedAt?: ITimestamp;
  episodeCommentStatus: boolean;
  createdAt: ITimestamp;
  visitorCount: number; // 작품 정렬에 사용
  accumulateVisitorCount: number; // 실제 독자수
  publishedEpisodeCount: number;
  bestIndex: number;
  favoriteCount: number;
  viewCount: number;
  completionPromise: boolean;
  isBookmark?: boolean;
  isMine?: boolean;
  completed: boolean;
  completedAt?: ITimestamp;
  editedAt: ITimestamp;
  onlyStage: boolean;
  stageOn: boolean;
  pageGo?: boolean;
}
interface INovelContest {
  contentType: string;
  contestEndedAt: ITimestamp | null;
  entryEndedAt: ITimestamp;
  entryStartedAt: ITimestamp;
  id: number;
  operator: string;
  registerType: IRegisterType;
  status: IContestStatus;
  terms: string;
  title: string;
  user: IUser;
  visibility: IContestVisibility;
}

export type IQnaStatus = 'PENDING' | 'COMPLETED';

export interface IQnaCategory {
  id: number;
  name: string;
  priority: number;
  type: string;
  active: boolean;
  createdAt: ITimestamp;
  updatedAt: ITimestamp;
}

export interface IQuestion {
  id: number;
  title: string;
  body: string;
  status: IQnaStatus;
  user: IUser;
  category: IQnaCategory;
  createdAt: ITimestamp;
  updatedAt: ITimestamp;
}

interface ILink {
  id: number;
  link: string;
  coordinate: string;
  newTab: boolean;
}
export interface IImageMapResponse {
  id: number;
  image: IFile;
  imageType: 'DESKTOP' | 'MOBILE';
  links: ILink[];
}

export interface IPages {
  id: number;
  title: string;
  type: 'IMAGE' | 'CONTENT' | 'IMAGE_AND_CONTENT';
  startedAt: string;
  endedAt: string;
  active: boolean;
  pcImage: IImageMapResponse;
  mobileImage: IImageMapResponse;
  contentName?: string;
  contentLayoutType?: 'LINEAR' | 'GRID';
  novels: INovel[];
}
export interface IBanner {
  id: number;
  desktopImage: IFile;
  mobileImage: IFile;
  imageType: 'DESKTOP' | 'MOBILE';
  link: string;
  newTab: boolean;
  placement: 'GENRE_HOME_TOP' | 'GENRE_HOME_BOTTOM';
  priority: number;
  title: string;
  backgroundColor?: string;
}

export interface IPaginatedResponse<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
  };
  first: boolean;
  last: boolean;
  totalElements: number;
  numberOfElements: number;
  empty: true;
  totalPages: number;
  number: number;
  size: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
}

export type Nullable<T> = T | null;

export interface IKakaoAuth {
  refresh_token?: string;
  access_token: string;
  app_user_id: number;
}
