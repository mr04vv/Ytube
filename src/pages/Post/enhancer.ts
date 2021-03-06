/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import fetchPost from 'api/posts/fetchPost';
import useReactRouter from 'use-react-router';
import { RouteComponentProps } from 'react-router';
import { Post } from 'entity/entity/post';
import { fetchRandomPostList } from 'api/posts/fetchRandomPostList';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { FetchMeState } from 'entity/reduxState/fetchMeState';
import { implementsUser } from 'entity/entity/user';
import { LikeRequestDto } from 'entity/requestDto/likeRequestDto';
import { like } from 'api/posts/like';
import { disLike } from 'api/posts/disLike';
import updatePlayCount from 'api/posts/updatePlayCount';
import { deletePost } from 'api/posts/deletePost';

export const useEnhancer = () => {
  const [post, setPost] = useState<Post>();
  const [randomPosts, setRandomPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { match, history }: RouteComponentProps<{id: string}> = useReactRouter();
  const { params } = match;
  const [isOpenShareModal, setIsOpenShareModal] = useState<boolean>(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(true);

  const [failed, setFailed] = useState<boolean>(false);
  const [isMyPost, setIsMyPost] = useState<boolean>(false);
  const [ref] = useState<React.MutableRefObject<ReactPlayer | undefined>>(
    React.useRef()
  );
  const userSelector = (state: any) => state.login;
  const userState: FetchMeState = useSelector(userSelector);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const postIdStr = params.id;
    const postId = Number(postIdStr);
    if (Number.isNaN(postId)) {
      setIsLoading(false);
      setFailed(true);
    } else {
      (async () => {
        try {
          const [postRes, randomRes] = await Promise.all([fetchPost(postId), fetchRandomPostList()]);
          setPost(postRes.post);
          setPlaying(true);
          incrementPlayCount(postRes.post);
          setRandomPosts(randomRes.posts);
        } catch (_) {
          setFailed(true);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [params.id]);

  const pushPostDetailPage = (postId: number) => {
    window.scrollTo(0, 0);
    history.push({
      pathname: `/post/${postId}`,
    });
  };

  const loop = (r: ReactPlayer, second: number) => {
    r.seekTo(second, 'seconds');
  };

  const onClickLikeButton = () => {
    if (implementsUser(userState.data)) {
      if (post) {
        if (post.alreadyLiked) {
          disLikePost();
        } else {
          likePost();
        }
        setLiked();
      }
    } else {
      setIsOpenLoginModal(true);
    }
  };

  const setLiked = () => {
    if (post) {
      const p: Post = { ...post };
      if (p.alreadyLiked) {
        p.likeCount -= 1;
      } else {
        p.likeCount += 1;
      }
      p.alreadyLiked = !p.alreadyLiked;
      setPost(p);
    }
  };

  const likePost = async () => {
    if (implementsUser(userState.data) && post) {
      const request: LikeRequestDto = {
        post_id: post.id
      };
      await like(request);
    }
  };

  useEffect(() => {
    if (implementsUser(userState.data) && post) {
      setIsMyPost(post.user.id === userState.data.id);
    }
  }, [userState.data, post]);

  const disLikePost = async () => {
    if (implementsUser(userState.data) && post) {
      await disLike(post.id);
    }
  };

  const incrementPlayCount = (p: Post) => {
    if (p) {
      updatePlayCount(p.id);
    }
  };

  const onClickOpenAppButton = () => {
    setPlaying(false);
  };

  const pushSearchPage = (gameId: number | undefined, categoryId: number | undefined) => {
    if (gameId) {
      history.push({
        pathname: '/search',
        search: `?order=0&game=${gameId}`
      });
    }
    if (categoryId) {
      history.push({
        pathname: '/search',
        search: `?order=0&category=${categoryId}`
      });
    }
  };

  const pushEdit = () => {
    window.scrollTo(0, 0);
    history.push({
      pathname: `/edit/${post?.id}`,
    });
  };

  const delPost = async (): Promise<boolean> => {
    try {
      if (post) {
        await deletePost(post.id);
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  };

  return {
    post,
    isLoading,
    failed,
    randomPosts,
    pushPostDetailPage,
    ref,
    loop,
    isOpenShareModal,
    setIsOpenShareModal,
    onClickLikeButton,
    isOpenLoginModal,
    setIsOpenLoginModal,
    incrementPlayCount,
    onClickOpenAppButton,
    playing,
    setPlaying,
    pushSearchPage,
    isMyPost,
    anchorEl,
    handleClick,
    handleClose,
    pushEdit,
    openDeleteModal,
    setOpenDeleteModal,
    delPost
  };
};
