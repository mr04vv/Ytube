/* eslint-disable no-nested-ternary */
import React from 'react';
import ReactPlayer from 'react-player';
// import {
//   CardHeader, Avatar, IconButton, CardContent, Typography, CardActions,
// } from '@material-ui/core';
import {
  CardHeader, CardContent, Typography, CircularProgress, Button, IconButton, Menu, MenuItem, Avatar, CardActions,
} from '@material-ui/core';
import styled from 'styled-components';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import { PostInterface } from 'interfaces/posts/PostInterface';
import { CustomAvater } from 'pages/Account/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useEditPost from 'hooks/Post/useEditPost';
import useMyInfo from 'hooks/User/useMyInfo';
import useLike from 'hooks/Like/useLike';
import SimpleSnackBar from 'components/SimpleSnackBar';

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
}

const PostList = ({
  posts, isLoading, hasNext, hasPrev, page, next, prev, per, path,
}: PropInterface) => {
  const refs: any[] = [React.useRef(null), React.useRef(null), React.useRef(null), React.useRef(null), React.useRef(null), React.useRef(null), React.useRef(null), React.useRef(null), React.useRef(null), React.useRef(null)];
  const [isPlaying, setIsPlaying] = React.useState<boolean[]>([false, false, false, false, false, false, false, false, false, false]);
  const loop = (r: any, second: number) => {
    r.player.seekTo(second, 'seconds');
  };
  const edit = useEditPost();
  const user = useMyInfo();
  const like = useLike(posts, path);
  return (
    <Container>
      {(isLoading || edit.isLoading) ? <CircularProgress style={{ margin: '30vh auto' }} />
        : (
          posts && posts.map((p: PostInterface, index: number) => (
            <div key={p.id}>
              <CardHeader
                avatar={
                  p.isAnonymous ? (
                    <Avatar aria-label="recipe">匿</Avatar>
                  )
                    : (
                      <CustomAvater aria-label="recipe" src={p.user.imageUrl} />
                    )}
                action={(
                  <>
                    {user.userInfo && user.userInfo.id === p.user.id && (
                      <IconButton aria-label="settings" aria-controls="simple-menu" onClick={(e: React.MouseEvent<HTMLButtonElement>) => edit.handleClick(e, index + 1)}>
                        <MoreVertIcon />
                      </IconButton>
                    )}
                  </>
                )}
                title={p.isAnonymous ? '匿名ユーザー' : p.user.name}
                subheader={new Date(p.createdAt).toLocaleString('ja')}
              />
              <Menu
                id="simple-menu"
                anchorEl={edit.anchorEl}
                keepMounted
                open={edit.isOpenNumber === index + 1}
                onClose={edit.handleClose}
              >
                <MenuItem onClick={() => edit.del(p.id, page, per)}>削除</MenuItem>
              </Menu>
              <ReactPlayer
                width="100%"
                height={window.innerWidth < 420 ? '300px' : '500px'}
                ref={refs[index]}
                controls
                onEnded={() => loop(refs[index].current, p.startTime)}
                url={p.videoUrl}
                youtubeConfig={{
                  playerVars: {
                    start: p.startTime, end: p.endTime,
                  },
                }}
                onPlay={() => setIsPlaying(isPlaying.map((v: boolean, idx: number) => idx === index))}
                playing={isPlaying[index]}
              />
              <CustomCardContent>
                <Typography gutterBottom component="h4">
                  {p.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {p.detail}
                </Typography>
              </CustomCardContent>
              <CardActionContainer>
                <CustomCardAction>
                  <LikeContainer>
                    <CustomIconButton aria-label="add to favorites" onClick={() => (user.loginStatus === 'success' ? (p.alreadyLiked ? like.delLike(p.id, index) : like.like(p.id, index)) : like.setIsNoLoginError(true))}>
                      <FavoriteIcon color={p.alreadyLiked ? 'secondary' : 'disabled'} width="3px" fontSize="small" />
                    </CustomIconButton>
                    <LikeCount>
                      {p.likeCount}
                    </LikeCount>
                  </LikeContainer>
                  {/* <CustomIconButton aria-label="add to favorites">
                    <PlaylistAdd />
                  </CustomIconButton> */}
                </CustomCardAction>
              </CardActionContainer>
              <Hr />
            </div>
          )))
      }
      {
        posts && posts.length === 0 && (
          <NoPost>投稿がありません</NoPost>
        )
      }
      {
        !isLoading && posts && posts.length !== 0 && (
          <PageButtonContainer>
            <PageButton
              color="primary"
              variant="contained"
              disabled={!hasPrev}
              onClick={() => prev()}
            >
              前へ
            </PageButton>
            <PageButton
              color="primary"
              variant="contained"
              disabled={!hasNext}
              onClick={() => next()}
            >
              次へ
            </PageButton>
          </PageButtonContainer>
        )
      }
      <SimpleSnackBar
        isShow={like.isNoLoginError}
        onClose={() => like.setIsNoLoginError(false)}
        message="ログインしてください"
        type="warning"
      />
    </Container>
  );
};

export default PostList;

const Hr = styled.hr`
  border-width: 1px;
  border-color: #a5a5a5;
`;

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
  background-color: #ffe62b;
  border-radius: 0;
  color: black;
  box-shadow: unset;
  width: 100px;
  :hover {
    background-color: #ffe62b;
    opacity: 0.7;
    color: black;
    box-shadow: unset;
  }
`;

const CardActionContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CustomCardAction = styled(CardActions as React.SFC)`
  display: flex;
  justify-content: space-around;
  width: 400px;
`;

const CustomIconButton = styled(IconButton)`
  padding: 0;

`;

const NoPost = styled.div`
  text-align: center;
  margin: 40px;
`;

const CustomCardContent = styled(CardContent as React.SFC)`
  padding-bottom: 0;
`;

const LikeContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LikeCount = styled.p`
  color: #a5a5a5;
  margin-left: 10px;
  font-size: 14px;
`;
