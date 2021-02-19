/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMe, signOut } from 'reduxes/modules/accounts/login';
import firebase from 'firebase';
import useReactRouter from 'use-react-router';
import { SortType, SortTypes } from 'entity/union/sortType';
import { SearchParams } from 'constants/searchParams';
import { FetchMeState } from 'entity/reduxState/fetchMeState';
import { implementsUser, User } from 'entity/entity/user';
import { LoginStatus } from 'entity/union/reduxStatus';
import { Category, implementsCategory } from 'entity/entity/category';
import { Game, implementsGame } from 'entity/entity/game';
import { fetchCategories } from 'reduxes/modules/categories/categoryList';
import { fetchGames } from 'reduxes/modules/games/gameList';
import { FetchGamesState } from 'entity/reduxState/fetchGamesState';
import { FetchCategoriesState } from 'entity/reduxState/fetchCategoriesState';

export interface UseMyInfoInterface {
  userInfo: User | undefined;
  isLoading: boolean;
  logout: () => void;
  loginStatus: string | undefined;
}

export const useEnhancer = () => {
  const [userInfo, setUserInfo] = useState<User | undefined>();
  const userSelector = (state: any) => state.login;
  const userState: FetchMeState = useSelector(userSelector);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const [loginStatus, setLoginStatus] = useState<LoginStatus>('notInitialized');
  const { history, location } = useReactRouter();
  const params = new URLSearchParams(location.search);
  const [sortType, setSortType] = useState<SortType>(SortTypes.NEWEST);
  const [searchWord, setSearchWord] = useState<string>('');
  const anchorRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [openSearchPopup, setOpenSearchPopup] = useState<boolean>(false);
  const [searchCategory, setSearchCategory] = useState<Category | undefined>();
  const [searchGame, setSearchGame] = useState<Game | undefined>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loadingMeta, setLoadingMeta] = useState<boolean>(false);
  const [openGames, setOpenGames] = useState<boolean>(false);
  const [openCategories, setOpenCategories] = useState<boolean>(false);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const gameSelector = (state: any) => state.gameList;
  const gameState: FetchGamesState = useSelector(gameSelector);
  const categorySelector = (state: any) => state.categoryList;
  const categoryState: FetchCategoriesState = useSelector(categorySelector);

  const getParams = () => {
    const word = params.get(SearchParams.WORD);
    if (word != null) {
      setSearchWord(word);
    }
  };

  useEffect(() => {
    (async () => {
        await dispatch(fetchMe());
    })();
  }, [dispatch]);

  useEffect(() => {
    getParams();
    (async () => {
      dispatch(fetchCategories());
      dispatch(fetchGames());
      setLoadingMeta(false);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (implementsGame(gameState.data)) {
      setGames(gameState.data);
      setFilteredGames(gameState.data);
      const gameId = params.get(SearchParams.GAME);
      if (gameId) {
        const game = gameState.data.find((g: Game) => g.id === Number(gameId));
        setSearchGame(game);
      }
    }
  }, [gameState]);

  useEffect(() => {
    if (implementsCategory(categoryState.data)) {
      setFilteredCategories(categoryState.data);
      setCategories(categoryState.data);
      const categoryId = params.get(SearchParams.CATEGORY);
      if (categoryId) {
        const category = categoryState.data.find((c: Category) => c.id === Number(categoryId));
        setSearchCategory(category);
      }
    }
  }, [categoryState]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const searchPopupClose = (event: React.MouseEvent<EventTarget>) => {
    if (searchRef.current && searchRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpenSearchPopup(false);
  };

  const isSearchable = (): boolean => {
    if (searchWord.length === 0 && !searchCategory && !searchGame) return false;
    return true;
  };

  const onKeyPressed = (key: string) => {
    if (!isSearchable()) return;
    if (key === 'Enter') {
      pushSearchPage();
    }
  };

  const pushSearchPage = () => {
    setOpenSearchPopup(false);
    let searchCondition = `order=${sortType}`;
    if (searchCategory) searchCondition += `&category=${searchCategory.id.toString()}`;
    if (searchGame) searchCondition += `&game=${searchGame.id.toString()}`;
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
    setSearchGame(undefined);
    setSearchCategory(undefined);
  };

  const onClickCreatePostButton = () => {
    if (implementsUser(userState.data)) {
      window.scrollTo(0, 0);
      history.push({
        pathname: '/create',
      });
    } else {
      setIsOpenLoginModal(true);
    }
  };

  useEffect(() => {
    if (implementsUser(userState.data)) {
      setUserInfo(userState.data);
      setIsLoading(false);
      setLoginStatus(userState.status);
    }
    if (userState.status === 'notLoggedIn') {
      setLoginStatus(userState.status);
      setUserInfo(undefined);
    }
  }, [userState]);

  const openSelectCategory = () => {
    setFilteredCategories(categories);
    setOpenCategories(true);
  };

  const openSelectGame = () => {
    setFilteredGames(games);
    setOpenGames(true);
  };

  const logout = () => {
    dispatch(signOut());
    firebase.auth().signOut();
    setLoginStatus('notLoggedIn');
    setOpen(false);
  };

  const categoryFilter = (keyword: string) => {
    const filtered = categories.filter((c: Category) => c.name.includes(keyword));
    setFilteredCategories(filtered);
  };

  const gameFilter = (keyword: string) => {
    const filtered = games.filter((g: Game) => g.title.includes(keyword));
    setFilteredGames(filtered);
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
    pushMyPage,
    onClickCreatePostButton,
    isOpenLoginModal,
    setIsOpenLoginModal,
    openSearchPopup,
    setOpenSearchPopup,
    searchPopupClose,
    searchRef,
    searchCategory,
    searchGame,
    setSearchCategory,
    setSearchGame,
    setOpenCategories,
    setOpenGames,
    categories,
    games,
    openCategories,
    openGames,
    openSelectCategory,
    openSelectGame,
    loadingMeta,
    categoryFilter,
    gameFilter,
    filteredCategories,
    filteredGames
  };
};
