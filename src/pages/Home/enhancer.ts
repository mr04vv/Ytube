/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { Post } from 'entity/entity/post';
import useReactRouter from 'use-react-router';
import { SortType, SortTypes } from 'entity/union/sortType';
import { searchPostList } from 'api/posts/searchPostList';
import { COUNT_PER_PAGE } from 'constants/countPerPage';

export interface OrderInterface {
  id: number;
  name: string;
}

export const useEnhancer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  const PER = 20;
  const [postLength, setPostLength] = useState<number>(0);
  const { history } = useReactRouter();

  useEffect(() => {
    (async () => {
      try {
        await initLoad();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const onClickOrder = (order: SortType) => {
    const searchCondition = `order=${order}`;
    history.push({
      pathname: 'search',
      search: `?${searchCondition}`,
    });
  };

  const pushPostDetailPage = (postId: number) => {
    history.push({
      pathname: `/post/${postId}`,
    });
  };

  const checkLastPage = (postList: Post[]) => {
    if (postList.length < PER) {
      setIsLastPage(true);
    }
  };

  const initLoad = async () => {
    setPosts([]);
    try {
      const res = await searchPostList(1, COUNT_PER_PAGE, [], [], SortTypes.NEWEST, '');
      setIsLastPage(false);
      setPosts(res.posts);
      setPostLength(res.posts.length);
      checkLastPage(res.posts);
      setPage(2);
    } catch (e) {
      console.debug(e);
    }
  };

  const loadMore = async () => {
    setIsMoreLoading(true);
    try {
      const res = await searchPostList(page, COUNT_PER_PAGE, [], [], SortTypes.NEWEST, '');
      setPosts([...posts, ...res.posts]);
      setPostLength((l) => l + res.posts.length);
      setIsLoading(false);
      setPage(page + 1);
      checkLastPage(res.posts);
      setIsMoreLoading(false);
    } catch (e) {
      console.debug(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    posts,
    isLoading,
    loadMore,
    isLastPage,
    isMoreLoading,
    postLength,
    onClickOrder,
    pushPostDetailPage
  };
};
