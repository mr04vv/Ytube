/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import fetchPost from 'api/posts/fetchPost';
import useReactRouter from 'use-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from 'reduxes/modules/posts/fetchPost';
import { FetchPostsState } from 'entity/reduxState/fetchPostsState';
import { Post } from 'entity/entity/post';
import { SortType, SortTypes } from 'entity/union/sortType';
import client from 'utilities/apiClient';
import { PostListResponseDto } from 'entity/responseDto/postListResponseDto';
import { searchPostList } from 'api/posts/searchPostList';

export interface OrderInterface {
  id: number;
  name: string;
}

export const useEnhancer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSorting, setIsSorting] = useState<boolean>(false);
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
  const [sortType, setSortType] = useState<SortType>(SortTypes.NEWEST);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await search();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      (async () => {
        setIsSorting(true);
        try {
          await search();
        } finally {
          setIsSorting(false);
        }
      })();
    }
  }, [sortType]);

  const search = async () => {
    setPosts([]);
    try {
      const res = await searchPostList(1, PER, [], [], sortType, '');
      console.debug(res.posts);
      setPosts(res.posts);
      setPostLength(res.posts.length);
      setPage(p => p + 1);
    } catch (e) {
      console.debug(e);
    }
  };


  const checkLastPage = (postList: Post[]) => {
    if (postList.length < PER) {
      setIsLastPage(true);
    }
  };

  const loadMore = async () => {
    setIsMoreLoading(true);
    try {
      const res = await searchPostList(page, PER, [], [], sortType, '');
      setPosts([...posts, ...res.posts]);
      setPostLength(l => l + res.posts.length);
      setIsLoading(false);
      setPage(p => p + 1);
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
    sortType,
    setSortType,
    search,
    isSorting
  };
};
