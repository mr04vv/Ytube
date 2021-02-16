import { useState, useEffect } from 'react';

export const useWindowDimensions = () => {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [splitSize, setSplitSize] = useState(Math.floor(getWindowDimensions().width / 230));
  useEffect(() => {
    const onResize = () => {
      setWindowDimensions(getWindowDimensions());
      setSplitSize(Math.floor(getWindowDimensions().width / 230));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return { windowDimensions, splitSize };
};
