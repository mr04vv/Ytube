/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { CategoryInterface } from 'interfaces/CategoryInterface';
import { useDispatch, useSelector } from 'react-redux';
import { Category, implementsCategory } from 'entity/entity/category';
import { Game, implementsGame } from 'entity/entity/game';
import { FetchGamesState } from 'entity/reduxState/fetchGamesState';
import { FetchCategoriesState } from 'entity/reduxState/fetchCategoriesState';
import ReactPlayer from 'react-player';
import { convertPlayTime } from 'utilities/convertPlayTime';
import { CreatePostRequestDto } from 'entity/requestDto/createPostRequestDto';
import { createPost } from 'api/posts/createPost';
import useReactRouter from 'use-react-router';
import { FetchMeState } from 'entity/reduxState/fetchMeState';

export const useEnhancer = () => {
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [titleError] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [commentError] = useState<string>('');
  const [game, setGame] = useState<number | undefined>();
  const [category, setCategory] = useState<number[]>([]);
  const [categoryName, setCategoryName] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const gameSelector = (state: any) => state.gameList;
  const gameState: FetchGamesState = useSelector(gameSelector);
  const categorySelector = (state: any) => state.categoryList;
  const categoryState: FetchCategoriesState = useSelector(categorySelector);
  const [openGames, setOpenGames] = useState<boolean>(false);
  const [openCategories, setOpenCategories] = useState<boolean>(false);
  const [loadingMeta, setLoadingMeta] = useState<boolean>(false);
  const [openHelp, setOpenHelp] = useState<boolean>(false);
  const [ref] = useState<React.MutableRefObject<ReactPlayer | undefined>>(
    React.useRef()
  );
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  const [canPost, setCanPost] = useState<boolean>(false);
  const { history } = useReactRouter();
  const userSelector = (state: any) => state.login;
  const userState: FetchMeState = useSelector(userSelector);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);

  useEffect(() => {
    if (implementsGame(gameState.data)) {
      setGames(gameState.data);
      setFilteredGames(gameState.data);
    }
  }, [gameState]);

  useEffect(() => {
    if (implementsCategory(categoryState.data)) {
      setFilteredCategories(categoryState.data);
      setCategories(categoryState.data);
    }
  }, [categoryState]);


  const setStart = () => {
    if (ref.current) {
      const currentTime = Math.floor(ref.current.getCurrentTime() / 1);
      setStartTime(convertPlayTime(currentTime));
    }
  };

  const setEnd = () => {
    if (ref.current) {
      const currentTime = Math.floor(ref.current.getCurrentTime() / 1);
      setEndTime(convertPlayTime(currentTime));
    }
  };

  const parsePlayTime = (time: string) => {
    const times = time.split(':');
    try {
      if (times.length === 1) {
        return Number(times[0]);
      } if (times.length === 2) {
        return Number(times[1]) + (Number(times[0]) * 60);
      } if (times.length === 3) {
        return Number(times[2]) +
            (Number(times[1]) * 60) +
            (Number(times[0]) * 3600);
      }
      return -1;
    } catch (e) {
      return -1;
    }
  };


  const post = async () => {
    if (userState.status !== 'loggedIn') {
      setIsOpenLoginModal(true);
      return;
    }

    setIsLoading(true);
    const st = parsePlayTime(startTime);
    const ed = parsePlayTime(endTime);
    console.debug(st);
    console.debug(ed);
    if (st - ed >= 0 || Number.isNaN(st) || Number.isNaN(ed)) {
      setError('時間を正しく入力してください');
      setTimeout(() => {
        setError('');
      }, [2000]);
      setIsLoading(false);
      return;
    }
    // ここで時間を文字列から数値に治す
    const body: CreatePostRequestDto = {
      title,
      detail: comment,
      start_time: st,
      end_time: ed,
      video_url: url,
      game_id: selectedGames[0].id,
      category_ids: selectedCategories.map(c => c.id),
      is_anonymous: isAnonymous,
    };

    await createPost(body).catch((err: any) => {
      if (err.response.status === 400) {
        setError('そのチャンネルの動画は投稿できません');
      } else {
        setError('投稿に失敗しました');
      }
      setTimeout(() => {
        setError('');
      }, [2000]);
      setIsLoading(false);
      throw err;
    });

    history.push({
      pathname: '/home',
    });
  };

  const categoryFilter = (keyword: string) => {
    let filtered = categories.filter((c: Category) => c.name.includes(keyword));
    selectedCategories.forEach((sc: Category) => { filtered = filtered.filter(f => f.id !== sc.id); });
    console.debug(filtered);
    setFilteredCategories(filtered);
  };

  const gameFilter = (keyword: string) => {
    const filtered = games.filter((g: Game) => g.title.includes(keyword));
    setFilteredGames(filtered);
  };

  const openSelectCategory = () => {
    let filtered = categories.slice();
    selectedCategories.forEach((sc: Category) => { filtered = filtered.filter(f => f.id !== sc.id); });
    console.debug(filtered);
    setFilteredCategories(filtered);
    setOpenCategories(true);
  };

  const openSelectGame = () => {
    setFilteredGames(games);
    setOpenGames(true);
  };

  useEffect(() => {
    if (url && selectedCategories.length > 0 && selectedGames.length > 0 && title && startTime && endTime) {
      setCanPost(true);
    } else {
      setCanPost(false);
    }
  }, [url, startTime, endTime, title, selectedCategories, selectedGames]);


  return {
    startTime,
    endTime,
    url,
    setUrl: (e: React.ChangeEvent<HTMLInputElement>) => { setUrl(e.target.value); },
    setStartTime: (e: React.ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value),
    setEndTime: (e: React.ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value),
    error,
    setError,
    title,
    comment,
    setTitle: (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    titleError,
    setComment: (e: React.ChangeEvent<HTMLInputElement>) => {
      setComment(e.target.value);
    },
    commentError,
    game,
    setGame: (v: string) => {
      setGame(parseInt(v, 10));
    },
    category,
    setCategory: (v: string[]) => {
      const list = categories.filter((c: CategoryInterface) => v.includes(c.name));
      const idList = list.map((l: CategoryInterface) => l.id);
      setCategory(idList);
      setCategoryName(v);
    },
    categoryName,
    post,
    isLoading,
    isAnonymous,
    setIsAnonymous,
    filteredCategories,
    filteredGames,
    categoryFilter,
    gameFilter,
    loadingMeta,
    openCategories,
    openGames,
    setOpenGames,
    setOpenCategories,
    setStart,
    setEnd,
    ref,
    openHelp,
    setOpenHelp,
    openSelectCategory,
    openSelectGame,
    selectedCategories,
    selectedGames,
    setSelectedCategories: (c: Category) => {
      setSelectedCategories(s => [...s, c]);
      setFilteredCategories(fcs => fcs.filter(fc => fc !== c));
    },
    setSelectedGames: (g: Game) => {
      setSelectedGames([g]);
    },
    unsetSelectedCategories: (c: Category) => {
      const i = selectedCategories;
      const unseted = i.filter(f => f !== c);
      setSelectedCategories(unseted);
      setFilteredCategories(f => [...f, c]);
    },
    canPost,
    isOpenLoginModal,
    setIsOpenLoginModal,
  };
};
