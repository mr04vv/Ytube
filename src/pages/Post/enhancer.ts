/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { PostInterface } from 'interfaces/posts/PostInterface';
import fetchPost from 'api/posts/fetchPost';
import useReactRouter from 'use-react-router';
import queryString from 'query-string';

export interface OrderInterface {
  id: number;
  name: string;
}

const useFetchPost = () => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const { location } = useReactRouter();
  const param = queryString.parse(location.search);

  useEffect(() => {
    (async () => {
      const post = await fetchPost(Number(param.id));
      setPosts([post as any]);
    })();
  }, [param.id]);

  return {
    posts,
  };
};

export default useFetchPost;
