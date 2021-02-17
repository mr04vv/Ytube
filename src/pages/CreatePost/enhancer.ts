/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { CategoryInterface } from 'interfaces/CategoryInterface';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from 'reduxes/modules/posts/post';
import { CreatePostInterface, UpdatePostInterface } from 'interfaces/posts/CreatePostInterface';
import { getPosts } from 'reduxes/modules/posts/fetchPost';
import updatePost from 'api/posts/updatePost';
import { Post } from 'entity/entity/post';
import { Category, implementsCategory } from 'entity/entity/category';
import { Game, implementsGame } from 'entity/entity/game';
import { FetchGamesState } from 'entity/reduxState/fetchGamesState';
import { FetchCategoriesState } from 'entity/reduxState/fetchCategoriesState';

const usePost = (
  content?: Post,
) => {
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
  const [categoryName, setCategoryName] = useState<string[]>([]);
  const dispatch = useDispatch();
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

  useEffect(() => {
    setTitle(content?.title ?? '');
    setCategory(content?.categories?.map((c: CategoryInterface) => c.id) ?? []);
    setCategoryName(content?.categories?.map((c: CategoryInterface) => c.name) ?? []);
    setGame(content?.game?.id ?? undefined);
    setComment(content?.detail ?? '');
    setUrl(content?.videoUrl ?? '');
    setStartTime(content?.startTime.toString() ?? '0');
    setIsAnonymous(content?.isAnonymous ?? false);
    setEndTime(content?.endTime.toString() ?? '0');
  }, [content]);

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
        setError('そのチャンネルの動画は投稿できません');
      } else {
        setError('投稿に失敗しました');
      }
      setIsLoading(false);
      throw err;
    });
    init();
    setTabIndex(0);
    closeModal();
    dispatch(getPosts(1, 10));
    setIsLoading(false);
  };

  const editPost = async (id: number, closeModal: () => void) => {
    setIsLoading(true);
    const body: UpdatePostInterface = {
      title,
      detail: comment,
      start_time: parseInt(startTime, 10),
      end_time: parseInt(endTime, 10),
      video_url: url,
      game_id: game!,
      category_ids: category,
      is_anonymous: isAnonymous,
    };

    await updatePost(id, body).catch((err: any) => {
      if (err.response.status === 400) {
        setError('そのチャンネルの動画は投稿できません');
      } else {
        setError('投稿に失敗しました');
      }
      setIsLoading(false);
      throw err;
    });

    init();
    setTabIndex(0);
    closeModal();
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
    editPost,
  };
};

export default usePost;
