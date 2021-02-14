/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User } from 'interfaces/UserInterface';
import { signOut } from 'reduxes/modules/accounts/login';
import firebase from 'firebase';
import useReactRouter from 'use-react-router';
import { SortType, SortTypes } from 'entity/union/sortType';
import { SearchParams } from 'constants/searchParams';

export interface UseMyInfoInterface {
  userInfo: User | undefined;
  isLoading: boolean;
  logout: () => void;
  loginStatus: string | undefined;
}

export const useEnhancer = () => {
  const [userInfo, setUserInfo] = useState<User | undefined>();
  const userSelector = (state: any) => state.login;
  const userState = useSelector(userSelector);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const [loginStatus, setLoginStatus] = useState<string | undefined>('');
  const { history, location } = useReactRouter();
  const params = new URLSearchParams(location.search);
  const [sortType, setSortType] = useState<SortType>(SortTypes.NEWEST);
  const [searchWord, setSearchWord] = useState<string>('');

  useEffect(() => {
    getParams();
  }, []);

  const getParams = () => {
    const word = params.get(SearchParams.WORD);
    if (word != null) {
      setSearchWord(word);
    }

    // const order = params.get(SearchParams.ORDER);
    // if (order != null) {
    //   const orderNum: SortType = +order as SortType;
    //   searchParam.order = orderNum;
    //   setSortType(SortTypeRelation[orderNum]);
    // }
  };


  const onKeyPressed = (key: string) => {
    if (key === 'Enter') {
      pushSearchPage();
    }
  };

  const pushSearchPage = () => {
    let searchCondition = `order=${sortType}`;
    // if (selectedCategory.length !== 0) searchCondition += `&category=${selectedCategory.toString()}`;
    // if (selectedGame.length !== 0) searchCondition += `&game=${selectedGame.toString()}`;
    searchCondition += `&word=${searchWord}`;

    history.push({
      pathname: '/search',
      search: `?${searchCondition}`,
    });
  };

  const pushHome = () => {
    resetSearchParam();
    history.push({
      pathname: '/home',
    });
  };

  const resetSearchParam = () => {
    setSearchWord('');
    setSortType(SortTypes.NEWEST);
  };


  useEffect(() => {
    if (Object.keys(userState.data).length !== 0) {
      setUserInfo(userState.data);
      setIsLoading(false);
    }
    if (userState.status) {
      setLoginStatus(userState.status);
      setIsLoading(false);
    }
    if (userState.status === 'logout') {
      setUserInfo(undefined);
    }
  }, [userState]);

  const logout = () => {
    dispatch(signOut());
    firebase.auth().signOut();
    setLoginStatus('logout');
  };

  return {
    userInfo,
    isLoading,
    logout,
    loginStatus,
    setSearchWord,
    onKeyPressed,
    pushSearchPage,
    pushHome,
    searchWord
  };
};
