/* eslint-disable no-console */
import {
  useState, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { User } from 'interfaces/UserInterface';


const useMyInfo = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const userSelector = (state: any) => state.login;
  const userState = useSelector(userSelector);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (userState.data) {
      setUserInfo(userState.data);
      setIsLoading(false);
    }
  }, [userState.data]);


  return {
    userInfo,
    isLoading,
  };
};

export default useMyInfo;
