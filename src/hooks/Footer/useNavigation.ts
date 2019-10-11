import { useState, useEffect } from 'react';
import useReactRouter from 'use-react-router';

const useNavigation = () => {
  const [value, setValue] = useState<string>('');
  const { history, location } = useReactRouter();

  useEffect(() => {
    if (location.pathname) {
      setValue(location.pathname);
    }
  }, [location.pathname]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    window.scrollTo(0, 0);
    history.push({
      pathname: newValue,
    });
  };

  return {
    value,
    handleChange,
  };
};
export default useNavigation;
