/* eslint-disable no-console */
import { useState } from 'react';

export const useEnhancer = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const setCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return {
    isCopied,
    setCopy
  };
};
