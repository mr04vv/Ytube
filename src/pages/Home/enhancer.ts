/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import fetchPost from 'api/posts/fetchPost';
import useReactRouter from 'use-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from 'reduxes/modules/posts/fetchPost';
import { FetchPostsState } from 'entity/reduxState/fetchPostsState';
import { Post } from 'entity/entity/post';

export interface OrderInterface {
  id: number;
  name: string;
}

export const useEnhancer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { match } = useReactRouter();
  const { params }: any = match;
  const postSelector = (state: any) => state.fetchPost;
  const postState: FetchPostsState = useSelector(postSelector);
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  const PER = 20;
  const [postLength, setPostLength] = useState<number>(0);

  useEffect(() => {
    dispatch(getPosts(1, PER));
  }, []);

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
    postLength
  };
};
