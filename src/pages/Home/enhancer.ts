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
  useEffect(() => {
    dispatch(getPosts(0, 20));
  }, []);

  useEffect(() => {
    if (postState.data.posts) {
      setPosts(postState.data.posts);
      setTimeout(() => {
        setIsLoading(false);
      }, [1000]);
    }
  }, [postState]);

  return {
    posts,
    isLoading,
  };
};
