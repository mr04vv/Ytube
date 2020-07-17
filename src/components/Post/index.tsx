/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  CardHeader,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { PostInterface } from 'interfaces/posts/PostInterface';
import { CustomAvater } from 'pages/Account/styles';
import { UseMyInfoInterface } from 'hooks/User/useMyInfo';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReactPlayer from 'react-player';
import updatePlayCount from 'api/posts/updatePlayCount';
import styled from 'styled-components';
import { CategoryInterface } from 'interfaces/CategoryInterface';
import CopyToClipboard from 'react-copy-to-clipboard';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import { UseEditPostInterface } from 'hooks/Post/useEditPost';
import { UseLikeInterface } from 'hooks/Like/useLike';
import PostModal from 'pages/Home/PostModal';
import { UseMasterData } from 'hooks/Post/useMasterData';
import { Place } from 'components/PostList';
import { ShareOutlined } from '@material-ui/icons';
import { Twemb } from 'components/PostList/tw';
import DeleteModal from './DeleteModal';

const { Twitter } = require('react-social-sharing');

interface PostProps {
  post: PostInterface;
  index: number;
  user: UseMyInfoInterface;
  page: string;
  per: string;
  refs: any[];
  loop: (r: any, second: number) => void;
  setCopy: () => void;
  isPlaying: boolean[];
  setIsPlaying: (value: boolean[]) => void;
  edit: UseEditPostInterface;
  like: UseLikeInterface;
  master: UseMasterData;
  place: Place;
}

const Post: React.SFC<PostProps> = ({
  post,
  index,
  user,
  page,
  per,
  refs,
  loop,
  setCopy,
  isPlaying,
  setIsPlaying,
  edit,
  like,
  master,
  place,
}) => {
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  return (
    <div key={post.id}>
      <PostModal
        content={post}
        isOpen={isOpenEditModal}
        closeModal={() => setIsOpenEditModal(false)}
        master={master}
        page={page}
        per={per}
        place={place}
        isEdit
      />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        closeModal={() => setIsOpenDeleteModal(false)}
        del={() => edit.del(post.id, page, per)}
      />
      <CardHeader
        avatar={
          post.isAnonymous ? (
            <Avatar aria-label="recipe">匿</Avatar>
          ) : (
            <CustomAvater aria-label="recipe" src={post.user.imageUrl} />
          )
        }
        action={
          <>
            {user.userInfo && user.userInfo.id === post.user.id && place !== 'search' && (
              <IconButton
                aria-label="settings"
                aria-controls="simple-menu"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => edit.handleClick(e, index + 1)}
              >
                <MoreVertIcon />
              </IconButton>
            )}
          </>
        }
        title={post.isAnonymous ? '匿名ユーザー' : post.user.name}
        subheader={new Date(post.createdAt).toLocaleString('ja')}
      />
      <Menu
        id="simple-menu"
        anchorEl={edit.anchorEl}
        keepMounted
        open={edit.isOpenNumber === index + 1}
        onClose={edit.handleClose}
      >
        <MenuItem
          onClick={() => {
            edit.handleClose();
            setIsOpenEditModal(true);
          }}
        >
          編集
        </MenuItem>
        <MenuItem
          onClick={() => {
            edit.handleClose();
            setIsOpenDeleteModal(true);
          }}
        >
          削除
        </MenuItem>
      </Menu>
      <ReactPlayer
        width="100%"
        height={window.innerWidth < 420 ? '300px' : '500px'}
        ref={refs[index]}
        controls
        onStart={async () => {
          updatePlayCount(post.id);
        }}
        onEnded={async () => {
          loop(refs[index].current, post.startTime);
          updatePlayCount(post.id);
        }}
        url={post.videoUrl}
        youtubeConfig={{
          playerVars: {
            start: post.startTime,
            end: post.endTime,
          },
        }}
        onPlay={() => setIsPlaying(isPlaying.map((v: boolean, idx: number) => idx === index))}
        playing={isPlaying[index]}
      />
      <CustomCardContent>
        <Typography gutterBottom component="h4">
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.detail}
        </Typography>
        <InfoWrapper>
          <Typography variant="body2" color="textSecondary" component="p">
            {`長さ：${post.endTime - post.startTime}秒 / 再生回数：${post.playCount ? post.playCount : 0}回`}
          </Typography>
        </InfoWrapper>
        <TypeContainer>
          <TypeName>ゲーム：</TypeName>
          <Link to={`/search?game=${post.game.id}`} onClick={() => window.scrollTo(0, 0)}>
            {post.game.title}
          </Link>
        </TypeContainer>
        <TypeContainer>
          <TypeName>カテゴリ：</TypeName>
          {post.categories.map((c: CategoryInterface, idx: number) => (
            <TypeContainer key={c.name}>
              {idx !== 0 && ', '}
              <Link to={`/search?category=${c.id}`} onClick={() => window.scrollTo(0, 0)}>
                {c.name}
              </Link>
            </TypeContainer>
          ))}
        </TypeContainer>
      </CustomCardContent>
      <CardActionContainer>
        <CustomCardAction>
          <LikeContainer>
            <CustomIconButton
              aria-label="add to favorites"
              onClick={() => {
                user.loginStatus === 'success'
                  ? post.alreadyLiked
                    ? like.delLike(post.id, index)
                    : like.like(post.id, index)
                  : like.setIsNoLoginError(true);
              }}
            >
              <FavoriteIcon color={post.alreadyLiked ? 'secondary' : 'disabled'} width="3px" fontSize="small" />
            </CustomIconButton>
            <LikeCount>{post.likeCount}</LikeCount>
          </LikeContainer>
          {/* <CustomIconButton aria-label="add to favorites">
                    <PlaylistAdd />
                  </CustomIconButton> */}
          <CopyToClipboard text={`https://yy-tube.com/post/${post.id}`}>
            <IconWrapper>
              <ShareOutlined color="action" onClick={() => setCopy()} />
            </IconWrapper>
          </CopyToClipboard>
          <Twitter message="#わいちゅーぶ #わいわい #ガヤ民" link={`https://yy-tube.com/post/${post.id}`} />
        </CustomCardAction>
      </CardActionContainer>
      <Hr />
      <Twemb />
    </div>
  );
};

export default Post;

const CustomCardContent = styled(CardContent as React.SFC)`
  padding-bottom: 0;
`;

const IconWrapper = styled.div`
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const Hr = styled.hr`
  border-width: 1px;
  border-color: #a5a5a5;
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

const TypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TypeName = styled.p`
  margin: 0;
`;

const InfoWrapper = styled.div`
  margin: 8px 0;
`;
