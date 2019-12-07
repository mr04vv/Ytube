/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { CategoryInterface } from 'interfaces/CategoryInterface';
import { GameInterface } from 'interfaces/GameInterface';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGames } from 'reduxes/modules/games/gameList';

import { fetchCategories } from 'reduxes/modules/categories/categoryList';
import { createPost } from 'reduxes/modules/posts/post';
import { CreatePostInterface } from 'interfaces/posts/CreatePostInterface';
import { fetchPosts } from 'reduxes/modules/posts/fetchPost';

const usePost = () => {
  const [startTime, setStartTime] = useState<string>('0');
  const [endTime, setEndTime] = useState<string>('0');
  const [url, setUrl] = useState<string>('');
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [titleError] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [commentError] = useState<string>('');
  const [game, setGame] = useState<number | undefined>();
  const [category, setCategory] = useState<number[]>([]);
  const [categoryMaster, setCategoryMaster] = useState<CategoryInterface[]>([]);
  const [gameMaster, setGameMaster] = useState<GameInterface[]>([]);
  const [categoryName, setCategoryName] = useState<string[]>([]);
  const gameSelector = (state: any) => state.gameList;
  const gameState = useSelector(gameSelector);
  const categorySelector = (state: any) => state.categoryList;
  const categoryState = useSelector(categorySelector);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  const init = () => {
    setTitle('');
    setCategory([]);
    setCategoryName([]);
    setGame(undefined);
    setComment('');
    setUrl('');
    setStartTime('0');
    setIsAnonymous(false);
    setEndTime('0');
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchGames());
  }, [dispatch]);

  useEffect(() => {
    if (categoryState.data.length > 0) {
      categoryState.data.unshift({
        id: -1,
        name: '選択しない',
      });
      setCategoryMaster(categoryState.data);
    }
  }, [categoryState.data]);

  useEffect(() => {
    if (gameState.data.length > 0) {
      gameState.data.unshift({
        id: -1,
        title: '選択しない',
      });
      setGameMaster(gameState.data);
    }
  }, [gameState.data]);

  const setStart = (r: any) => {
    if (r.player) {
      setStartTime(r.player.getCurrentTime());
    }
  };

  const setEnd = (r: any) => {
    if (r.player) {
      setEndTime(r.player.getCurrentTime());
    }
  };

  const next = () => {
    setTabIndex(1);
  };

  const post = async (closeModal: () => void) => {
    setIsLoading(true);
    const body: CreatePostInterface = {
      title,
      detail: comment,
      start_time: parseInt(startTime, 10),
      end_time: parseInt(endTime, 10),
      video_url: url,
      game_id: game!,
      category_ids: category,
      is_anonymous: isAnonymous,
    };

    await dispatch<any>(createPost(body)).catch((err: any) => {
      if (err.response.status === 400) {
        setError('YYの動画のみ投稿可能です');
      } else {
        setError('投稿に失敗しました');
      }
      setIsLoading(false);
      throw err;
    });
    init();
    setTabIndex(0);
    closeModal();
    dispatch(fetchPosts('1', '10'));
    setIsLoading(false);
  };

  return {
    startTime,
    endTime,
    url,
    setUrl,
    setStart,
    setEnd,
    tabIndex,
    setTabIndex,
    next,
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
    gameMaster,
    categoryMaster,
    category,
    setCategory: (v: string[]) => {
      const list = categoryMaster.filter((c: CategoryInterface) => v.includes(c.name));
      const idList = list.map((l: CategoryInterface) => l.id);
      setCategory(idList);
      setCategoryName(v);
    },
    categoryName,
    post,
    isLoading,
    isAnonymous,
    setIsAnonymous,
  };
};

export default usePost;
