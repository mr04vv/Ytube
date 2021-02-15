/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
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
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getParams();
  }, []);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

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

  const isSearchable = (): boolean => {
    if (searchWord.length === 0) return false;
    return true;
  };


  const onKeyPressed = (key: string) => {
    if (!isSearchable()) return;
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

  const pushMyPage = (event: React.MouseEvent<EventTarget>) => {
    handleClose(event);
    resetSearchParam();
    history.push({
      pathname: '/mypage',
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
    searchWord,
    isSearchable,
    anchorRef,
    open,
    handleClose,
    handleToggle,
    pushMyPage
  };
};
