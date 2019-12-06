/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { PostInterface } from 'interfaces/posts/PostInterface';
import fetchPost from 'api/posts/fetchPost';
import useReactRouter from 'use-react-router';

export interface OrderInterface {
  id: number;
  name: string;
}

const useFetchPost = () => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const { match } = useReactRouter();
  const { params }: any = match;
  useEffect(() => {
    (async () => {
      const post = await fetchPost(params.id);
      setPosts([post as any]);
    })();
  });

  return {
    posts,
  };
};

export default useFetchPost;
