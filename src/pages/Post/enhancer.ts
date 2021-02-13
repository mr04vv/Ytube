/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import fetchPost from 'api/posts/fetchPost';
import useReactRouter from 'use-react-router';
import { RouteComponentProps } from 'react-router';
import { Post } from 'entity/entity/post';
import { fetchRandomPostList } from 'api/posts/fetchRandomPostList';

export const useEnhancer = () => {
  const [post, setPost] = useState<Post>();
  const [randomPosts, setRandomPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { match, history }: RouteComponentProps<{id: string}> = useReactRouter();
  const { params } = match;

  const [failed, setFailed] = useState<boolean>(false);

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
    setIsLoading(true);
    window.scrollTo(0, 0);
    history.push({
      pathname: `/post/${postId}`,
    });
  };


  return {
    post,
    isLoading,
    failed,
    randomPosts,
    pushPostDetailPage
  };
};
