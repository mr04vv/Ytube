/* eslint-disable no-console */
import {
  useState, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from 'reduxes/modules/posts/fetchPost';
import { PostInterface } from 'interfaces/posts/PostInterface';
import useReactRouter from 'use-react-router';
import { fetchMyPosts } from 'reduxes/modules/posts/fetchMyPost';

const useFetchPost = () => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [per] = useState<string>('10');
  const postSelector = (state: any) => state.fetchPost;
  const myPostSelector = (state: any) => state.fetchPostMe;
  const postState = useSelector(postSelector);
  const myPostState = useSelector(myPostSelector);
  const { history, location } = useReactRouter();
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [hasPrev, setHasPrev] = useState<boolean>(false);
  const [myPosts, setMyPosts] = useState<PostInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const initPage = params.get('page') || '1';
  const [page, setPage] = useState<string>(initPage);

  useEffect(() => {
    setPage(initPage);
  }, [initPage]);

  useEffect(() => {
    if (location.pathname === '/home') {
      dispatch(fetchPosts(page, per));
    } else if (location.pathname === '/accounts') {
      dispatch(fetchMyPosts(page, per));
    }
  }, [page, dispatch, per, location.pathname]);

  useEffect(() => {
    if (postState.data) {
      setPosts(postState.data.posts);
      setIsLoading(false);
      if (postState.data.meta) {
        setHasNext(!!postState.data.meta.nextPage);
        setHasPrev(!!postState.data.meta.prevPage);
      }
    }
  }, [postState]);

  useEffect(() => {
    if (myPostState.data) {
      setMyPosts(myPostState.data.posts);
      setIsLoading(false);
      if (myPostState.data.meta) {
        setHasNext(!!myPostState.data.meta.nextPage);
        setHasPrev(!!myPostState.data.meta.prevPage);
      }
    }
  }, [myPostState]);

  return {
    posts,
    isLoading,
    hasNext,
    hasPrev,
    page,
    myPosts,
    next: () => {
      setIsLoading(true);
      setPage((parseInt(page, 10) + 1).toString());
      window.scrollTo(0, 0);
      history.push({
        pathname: location.pathname,
        search: `?page=${parseInt(page, 10) + 1}`,
      });
    },
    prev: () => {
      setIsLoading(true);
      window.scrollTo(0, 0);
      setPage((parseInt(page, 10) - 1).toString());
      history.push({
        pathname: location.pathname,
        search: `?page=${parseInt(page, 10) - 1}`,
      });
    },
  };
};

export default useFetchPost;
