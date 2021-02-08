/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { CategoryInterface } from 'interfaces/CategoryInterface';
import { useDispatch } from 'react-redux';
import { createPost } from 'reduxes/modules/posts/post';
import { CreatePostInterface, UpdatePostInterface } from 'interfaces/posts/CreatePostInterface';
import { getPosts } from 'reduxes/modules/posts/fetchPost';
import { fetchLikedPost } from 'reduxes/modules/posts/fetchLikedPost';
import { PostInterface } from 'interfaces/posts/PostInterface';
import updatePost from 'api/posts/updatePost';
import { Place } from 'components/PostList';
import { fetchMyPosts } from 'reduxes/modules/posts/fetchMyPost';

const usePost = (
  categoryMaster: CategoryInterface[],
  content?: PostInterface,
  page?: string,
  per?: string,
  place?: Place
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
    setTitle(content ? content.title : '');
    setCategory(content ? content.categories.map((c: CategoryInterface) => c.id) : []);
    setCategoryName(content ? content.categories.map((c: CategoryInterface) => c.name) : []);
    setGame(content ? content.game.id : undefined);
    setComment(content ? content.detail : '');
    setUrl(content ? content.videoUrl : '');
    setStartTime(content ? content.startTime.toString() : '0');
    setIsAnonymous(content ? content.isAnonymous : false);
    setEndTime(content ? content.endTime.toString() : '0');
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
    if (page && per) {
      if (place === 'like') {
        dispatch(fetchLikedPost(page, per));
      }
      if (place === 'accounts') {
        dispatch(fetchMyPosts(page, per));
      }
      if (place === 'home') {
        dispatch(getPosts(0, 20));
      }
    }
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
    editPost,
  };
};

export default usePost;
