'use client';

import { useEffect, useState } from 'react';

export default function useMediaQuery(query: string) {
  const [match, setMatch] = useState<boolean>(false);

  useEffect(() => {
    const onChange = (e: MediaQueryListEvent) => {
      setMatch(e.matches);
    };

    const result = matchMedia(query);
    result.addEventListener('change', onChange);
    setMatch(result.matches);

    return () => {
      result.removeEventListener('change', onChange);
    };
  }, [query]);

  return match;
}
