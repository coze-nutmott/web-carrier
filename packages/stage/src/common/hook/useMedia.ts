import { useState, useEffect } from 'react';

import screen from '../../../tailwind/screen';

type queryKey = 'desktop';

const useMedia = (key: queryKey): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`screen and (min-width:${screen[key]})`);
    const listener = () => {
      setMatches(media.matches);
    };
    listener();

    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [key]);

  return matches;
};

export default useMedia;
