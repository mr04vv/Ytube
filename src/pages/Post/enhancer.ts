/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import fetchPost from 'api/posts/fetchPost';
import useReactRouter from 'use-react-router';
import { RouteComponentProps } from 'react-router';
import { Post } from 'entity/entity/post';
import { fetchRandomPostList } from 'api/posts/fetchRandomPostList';
import ReactPlayer from 'react-player';

export const useEnhancer = () => {
  const [post, setPost] = useState<Post>();
  const [randomPosts, setRandomPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { match, history }: RouteComponentProps<{id: string}> = useReactRouter();
  const { params } = match;
  const [isOpenShareModal, setIsOpenShareModal] = useState<boolean>(false);

  const [failed, setFailed] = useState<boolean>(false);
  const [ref] = useState<React.MutableRefObject<ReactPlayer | undefined>>(
    React.useRef()
  );

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
          setRandomPosts(randomRes.posts);
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
    console.debug(r.state);
    r.seekTo(second, 'seconds');
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
    setIsOpenShareModal
  };
};
