/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from 'reduxes/modules/posts/fetchPost';
import { FetchPostsState } from 'entity/reduxState/fetchPostsState';
import { Post } from 'entity/entity/post';
import useReactRouter from 'use-react-router';
import { SortType } from 'entity/union/sortType';

export interface OrderInterface {
  id: number;
  name: string;
}

export const useEnhancer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const postSelector = (state: any) => state.fetchPost;
  const postState: FetchPostsState = useSelector(postSelector);
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  const PER = 20;
  const [postLength, setPostLength] = useState<number>(0);
  const { history } = useReactRouter();

  useEffect(() => {
    dispatch(getPosts(1, PER));
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

  useEffect(() => {
    if (postState.data.posts) {
      if (postState.status === 'success') {
        const fetchedPosts = postState.data.posts;
        setPostLength(l => l + fetchedPosts.length);
        setPosts([...posts, ...fetchedPosts]);
        setIsLoading(false);
        setPage(p => p + 1);
        checkLastPage(fetchedPosts);
        setIsMoreLoading(false);
      }
    }
  }, [postState]);

  const checkLastPage = (postList: Post[]) => {
    if (postList.length < PER) {
      setIsLastPage(true);
    }
  };

  const loadMore = async () => {
    setIsMoreLoading(true);
    await dispatch(getPosts(page, PER));
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
