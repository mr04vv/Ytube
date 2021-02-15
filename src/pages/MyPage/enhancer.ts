// /* eslint-disable no-console */
import { useState, useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { useSelector } from 'react-redux';
import { Post } from 'entity/entity/post';
import { SortType, SortTypes } from 'entity/union/sortType';
import { COUNT_PER_PAGE } from 'constants/countPerPage';
import { fetchMyPostList } from 'api/posts/fetchMyPostList';
import { fetchLikePostList } from 'api/posts/fetchLikePostList';
import { LikePost } from 'entity/responseDto/likePostListResponseDto';
import { implementsUser, User } from 'entity/entity/user';
import { FetchMeState } from 'entity/reduxState/fetchMeState';

export interface OrderInterface {
  id: number;
  name: string;
}

export const TabType = {
  my: 0,
  like: 1
};

export const useEnhancer = () => {
  const [userInfo, setUserInfo] = useState<User | undefined>();
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [likePosts, setLikePosts] = useState<LikePost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const { history, location } = useReactRouter();
  const [isLastMyPost, setIsLastMyPost] = useState<boolean>(false);
  const [isLastLikePost, setIsLastLikePost] = useState<boolean>(false);
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  const [myPostLength, setMyPostLength] = useState<number>(0);
  const [likePostLength, setLikePostLength] = useState<number>(0);
  const [sortType, setSortType] = useState<SortType>(SortTypes.NEWEST);
  const [myPostPage, setMyPostPage] = useState<number>(1);
  const [likePostPage, setLikePostPage] = useState<number>(1);
  const [tabIndex, setTabIndex] = useState<number>(TabType.my);
  const userSelector = (state: any) => state.login;
  const userState: FetchMeState = useSelector(userSelector);

  const pushPostDetailPage = (postId: number) => {
    history.push({
      pathname: `/post/${postId}`,
    });
  };

  useEffect(() => {
    (async () => {
      setIsSorting(true);
      try {
        await initLoad();
      } finally {
        setIsLoading(false);
        setIsSorting(false);
      }
    })();
  }, [location.search]);

  const initLoad = async () => {
    setMyPosts([]);
    setLikePosts([]);
    try {
      const [resMyPosts, resLikePosts] = await Promise.all([fetchMyPostList(1, COUNT_PER_PAGE), fetchLikePostList(1, COUNT_PER_PAGE)]);
      setIsLastMyPost(false);
      setIsLastLikePost(false);
      setMyPosts(resMyPosts.posts);
      setMyPostLength(resMyPosts.posts.length);
      setLikePosts(resLikePosts.likes);
      setLikePostLength(resLikePosts.likes.length);
      if (resMyPosts.posts.length < COUNT_PER_PAGE) {
        setIsLastMyPost(true);
      }
      if (resLikePosts.likes.length < COUNT_PER_PAGE) {
        setIsLastLikePost(true);
      }
      setMyPostPage(2);
      setLikePostPage(2);
    } catch (e) {
      console.debug(e);
    }
  };


  const loadMoreMyPosts = async () => {
    setIsMoreLoading(true);
    try {
      const res = await fetchMyPostList(myPostPage, COUNT_PER_PAGE);
      setMyPosts([...myPosts, ...res.posts]);
      setMyPostLength(l => l + res.posts.length);
      setIsLoading(false);
      setMyPostPage(myPostPage + 1);
      if (res.posts.length < COUNT_PER_PAGE) {
        setIsLastMyPost(true);
      }
      setIsMoreLoading(false);
    } catch (e) {
      console.debug(e);
    } finally {
      setIsLoading(false);
    }
  };


  const loadMoreLikePosts = async () => {
    setIsMoreLoading(true);
    try {
      const res = await fetchLikePostList(likePostPage, COUNT_PER_PAGE);
      setLikePosts([...likePosts, ...res.likes]);
      setLikePostLength(l => l + res.likes.length);
      setIsLoading(false);
      setLikePostPage(likePostPage + 1);
      if (res.likes.length < COUNT_PER_PAGE) {
        setIsLastLikePost(true);
      }
      setIsMoreLoading(false);
    } catch (e) {
      console.debug(e);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (implementsUser(userState.data)) {
      setUserInfo(userState.data);
    }
    if (userState.status === 'failed') {
      history.push({
        pathname: '/login',
      });
    }
  }, [userState]);

  return {
    myPosts,
    isLoading,
    loadMoreMyPosts,
    loadMoreLikePosts,
    isLastMyPost,
    isLastLikePost,
    isMoreLoading,
    myPostLength,
    likePostLength,
    setSortType,
    isSorting,
    sortType,
    pushPostDetailPage,
    userInfo,
    tabIndex,
    setTabIndex,
    likePosts
  };
};
