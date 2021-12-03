import { PREFERRED_GENRE_KEY } from 'common/constant';
import Cookies from 'js-cookie';

const MAX_AGE_OF_COOKIE_DAYS = 3 * 30;

export function getPreferredGenreFromCookies(): string | undefined {
  return Cookies.get(PREFERRED_GENRE_KEY);
}

export default function usePreferredGenre(): {
  preferredGenre: string | undefined;
  setPreferredGenre: (genre: string) => void;
} {
  const setPreferredGenre = (genre: string) => {
    Cookies.set(PREFERRED_GENRE_KEY, genre, {
      expires: MAX_AGE_OF_COOKIE_DAYS,
    });
  };

  return {
    preferredGenre: getPreferredGenreFromCookies(),
    setPreferredGenre,
  };
}
