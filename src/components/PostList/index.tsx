import React, { useState, useEffect } from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import styled from 'styled-components';
import { PostInterface } from 'interfaces/posts/PostInterface';
import useEditPost from 'hooks/Post/useEditPost';
import useMyInfo from 'hooks/User/useMyInfo';
import useLike from 'hooks/Like/useLike';
import SimpleSnackBar from 'components/SimpleSnackBar';
import Post from 'components/Post';
import { UseMasterData } from 'hooks/Post/useMasterData';

export type Place = 'accounts' | 'home' | 'like' | 'search' | 'post';

interface PropInterface {
  posts: PostInterface[];
  isLoading: boolean;
  hasNext: boolean;
  hasPrev: boolean;
  page: string;
  per: string;
  next: Function;
  prev: Function;
  path: string;
  hasController: Boolean;
  master: UseMasterData;
  place: Place;
}

const PostList = ({
  posts,
  isLoading,
  hasNext,
  hasPrev,
  page,
  next,
  prev,
  per,
  path,
  hasController,
  master,
  place,
}: PropInterface) => {
  const [refs] = useState<any[]>([
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
  ]);
  const [isPlaying, setIsPlaying] = React.useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const setCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  useEffect(() => {
    setIsPlaying([false, false, false, false, false, false, false, false, false, false]);
  }, [posts]);
  const loop = (r: any, second: number) => {
    r.player.seekTo(second, 'seconds');
  };
  const edit = useEditPost();
  const user = useMyInfo();
  const like = useLike(posts, path);
  return (
    <Container>
      {isLoading || edit.isLoading ? (
        <CircularProgress style={{ margin: '30vh auto' }} />
      ) : (
        posts &&
        posts.map((p: PostInterface, index: number) => (
          <Post
            place={place}
            post={p}
            index={index}
            like={like}
            edit={edit}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setCopy={setCopy}
            page={page}
            per={per}
            loop={loop}
            refs={refs}
            user={user}
            master={master}
          />
        ))
      )}
      {posts && posts.length === 0 && <NoPost>投稿がありません</NoPost>}
      {!isLoading && posts && posts.length !== 0 && hasController && (
        <PageButtonContainer>
          <PageButton color="primary" variant="contained" disabled={!hasPrev} onClick={() => prev()}>
            前へ
          </PageButton>
          <PageButton color="primary" variant="contained" disabled={!hasNext} onClick={() => next()}>
            次へ
          </PageButton>
        </PageButtonContainer>
      )}
      <SimpleSnackBar
        isShow={like.isNoLoginError}
        onClose={() => like.setIsNoLoginError(false)}
        message="ログインしてください"
        type="warning"
      />
      <SimpleSnackBar isShow={isCopied} onClose={() => {}} message="クリップボードにコピーしました" type="success" />
    </Container>
  );
};

export default PostList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px auto 100px;
  max-width: 800px;
`;

const PageButtonContainer = styled.div`
  margin: 2px auto;
  display: flex;
  width: 90%;
  justify-content: space-between;
`;

const PageButton = styled(Button)`
  text-transform: unset;
  background-color: #e85c9c;
  border-radius: 0;
  color: black;
  box-shadow: unset;
  width: 100px;
  :hover {
    background-color: #e85c9c;
    opacity: 0.7;
    color: black;
    box-shadow: unset;
  }
`;

const NoPost = styled.div`
  text-align: center;
  margin: 40px;
`;
