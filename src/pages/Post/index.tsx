import * as React from 'react';
import PostList from 'components/PostList';
import useFetchPost from './enhancer';

const Post = () => {
  const post = useFetchPost();

  return (
    <>
      <PostList
        path="home"
        posts={post.posts}
        isLoading={false}
        hasNext={false}
        hasPrev={false}
        page="0"
        next={() => {}}
        prev={() => {}}
        per="1"
        hasController={false}
      />
    </>
  );
};

export default Post;
