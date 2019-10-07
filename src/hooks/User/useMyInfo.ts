/* eslint-disable no-console */
import {
  useState, useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User } from 'interfaces/UserInterface';
import { signOut } from 'reduxes/modules/accounts/login';
import useReactRouter from 'use-react-router';
import firebase from 'firebase';

const useMyInfo = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const userSelector = (state: any) => state.login;
  const userState = useSelector(userSelector);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  useEffect(() => {
    if (userState.data) {
      setUserInfo(userState.data);
      setIsLoading(false);
    }
  }, [userState.data]);

  const logout = () => {
    dispatch(signOut());
    firebase.auth().signOut();
    history.push({
      pathname: '/login',
    });
  };

  return {
    userInfo,
    isLoading,
    logout,
  };
};

export default useMyInfo;
