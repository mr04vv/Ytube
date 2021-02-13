import { useState } from 'react';

export const useEnhancer = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  return {
    loaded,
    setLoaded
  };
};
