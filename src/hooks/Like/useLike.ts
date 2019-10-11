/* eslint-disable no-console */
import { useDispatch, useSelector } from 'react-redux';
import { createLike, deleteLike } from 'reduxes/modules/likes/like';
import { PostInterface } from 'interfaces/posts/PostInterface';
import { fetchSuccess } from 'reduxes/modules/posts/fetchPost';
import { fetchSuccess as fetchMySuccess } from 'reduxes/modules/posts/fetchMyPost';
import { useState } from 'react';

const useLike = (post: PostInterface[], path: string) => {
  const dispatch = useDispatch();
  const postSelector = (state: any) => state.fetchPost;
  const myPostSelector = (state: any) => state.fetchPostMe;
  const postState = useSelector(postSelector);
  const myPostState = useSelector(myPostSelector);
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
    } else {
      const data = {
        meta: postState.data.meta,
        posts: slice,
      };
      dispatch(fetchSuccess(data));
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
    } else {
      console.debug('here');
      const data = {
        meta: postState.data.meta,
        posts: slice,
      };
      dispatch(fetchSuccess(data));
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
