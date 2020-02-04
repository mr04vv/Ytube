/* eslint-disable no-console */
import { useDispatch, useSelector } from 'react-redux';
import { createLike, deleteLike } from 'reduxes/modules/likes/like';
import { PostInterface } from 'interfaces/posts/PostInterface';
import { fetchSuccess } from 'reduxes/modules/posts/fetchPost';
import { fetchSuccess as fetchMySuccess } from 'reduxes/modules/posts/fetchMyPost';
import { fetchSuccess as fetchLikedSuccess } from 'reduxes/modules/posts/fetchLikedPost';
import { useState } from 'react';

export interface UseLikeInterface {
  like: (postId: number, idx: number) => void;
  delLike: (postId: number, idx: number) => void;
  isNoLoginError: boolean;
  setIsNoLoginError: (v: boolean) => void;
}

const useLike = (post: PostInterface[], path: string) => {
  const dispatch = useDispatch();
  const postSelector = (state: any) => state.fetchPost;
  const myPostSelector = (state: any) => state.fetchPostMe;
  const likedPostSelector = (state: any) => state.likedPost;
  const postState = useSelector(postSelector);
  const myPostState = useSelector(myPostSelector);
  const likedPostState = useSelector(likedPostSelector);
  const [isNoLoginError, setIsNoLoginError] = useState<boolean>(false);

  const like = async (postId: number, idx: number) => {
    await dispatch(createLike(postId));
    const slice = post;
    slice[idx].likeCount += 1;
    slice[idx].alreadyLiked = true;
    if (path === 'accounts') {
      const data = {
        meta: myPostState.data.meta,
        posts: slice,
      };
      dispatch(fetchMySuccess(data));
    } else if (path === 'home') {
      const data = {
        meta: postState.data.meta,
        posts: slice,
      };
      dispatch(fetchSuccess(data));
    } else if (path === 'likes') {
      const data = {
        meta: likedPostState.data.meta,
        likes: slice.map((s: any) => ({ post: s })),
      };
      dispatch(fetchLikedSuccess(data));
    }
  };

  const delLike = async (postId: number, idx: number) => {
    await dispatch(deleteLike(postId));
    const slice = post;
    slice[idx].likeCount -= 1;
    slice[idx].alreadyLiked = false;
    if (path === 'accounts') {
      const data = {
        meta: myPostState.data.meta,
        posts: slice,
      };
      dispatch(fetchMySuccess(data));
    } else if (path === 'home') {
      const data = {
        meta: postState.data.meta,
        posts: slice,
      };
      dispatch(fetchSuccess(data));
    } else if (path === 'likes') {
      const data = {
        meta: likedPostState.data.meta,
        likes: slice.map((s: any, i: number) => {
          // const copy = s.slice();
          console.debug(s.alreadyLiked);
          if (i === idx) {
            s.alreadyLiked = false;
          }
          return { post: s };
        }),
      };
      dispatch(fetchLikedSuccess(data));
    }
  };

  return {
    like,
    delLike,
    isNoLoginError,
    setIsNoLoginError,
  };
};

export default useLike;
