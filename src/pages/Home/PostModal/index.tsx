import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';
import {
  TextField, IconButton, Select, MenuItem,
} from '@material-ui/core';
import usePost from 'hooks/Post/usePost';
import DeleteIcon from '@material-ui/icons/Clear';
import Arrow from '@material-ui/icons/ArrowBack';
import SimpleSnackBar from 'components/SimpleSnackBar';
import zIndex from '@material-ui/core/styles/zIndex';
import {
  CustomModal, PostContainer, TimeContainer, Time, CustomButton, PostHeader, PostButton, LengthCount, LengthCountError, useStyles,
} from './styles';
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

interface PropsInterface {
  isOpen: boolean;
  closeModal: () => void;
}

const PostModal = ({ isOpen, closeModal }: PropsInterface) => {
  const refs = React.useRef(null);
  const post = usePost();
  const classes = useStyles();
  const ConvertTime = (time: string) => {
    const second = parseInt(time, 10);
    return `${Math.floor(second / 60).toString()}:${(second % 60).toString()}`;
  };
  return (
    <CustomModal
      isOpen={isOpen}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1200,
          backgroundColor: '#a5a5a5',
        },
      }}
    >
      <SimpleSnackBar
        isShow={!!post.error}
        onClose={() => post.setError('')}
        message={post.error}
        type="warning"
      />
      <PostHeader>
        <IconButton aria-label="delete">
          {post.tabIndex === 0 && <DeleteIcon onClick={() => closeModal()} fontSize="small" />}
          {post.tabIndex === 1 && <Arrow onClick={() => post.setTabIndex(0)} fontSize="small" />}
        </IconButton>
        {post.tabIndex === 0 && (
          <PostButton
            color="primary"
            variant="contained"
            onClick={() => post.next()}
            disabled={(!post.url || parseInt(post.startTime, 10) >= parseInt(post.endTime, 10))}
          >
            次へ
          </PostButton>
        )}
        {post.tabIndex === 1 && (
          <PostButton
            color="primary"
            variant="contained"
            onClick={() => post.setTabIndex(1)}
            disabled={(post.title.length === 0 || post.title.length > 20 || post.comment.length === 0 || post.comment.length > 200)}
          >
            投稿
          </PostButton>
        )}
      </PostHeader>
      {post.tabIndex === 0 ? (
        <>
          <ReactPlayer
            width="100%"
            height="50%"
            ref={refs}
            controls
            url={post.url}
          />
          <PostContainer>
            <TextField
              label="動画URL"
              style={{ margin: 8 }}
              placeholder="https://www.youtube.com/watch?v=b8M2TwcHqfs"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={post.url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => post.setUrl(e.target.value)}
            />
            <TimeContainer>
              <CustomButton color="primary" variant="contained" onClick={() => post.setStart(refs.current)}>開始時間をセット</CustomButton>
              <Time>{ConvertTime(post.startTime)}</Time>
            </TimeContainer>
            <TimeContainer>
              <CustomButton color="primary" variant="contained" onClick={() => post.setEnd(refs.current)}>終了時間をセット</CustomButton>
              <Time>{ConvertTime(post.endTime)}</Time>
            </TimeContainer>
          </PostContainer>
        </>
      )
        : (
          <>
            <TextField
              style={{ margin: '10vh auto 0', width: '90%', display: 'flex' }}
              placeholder="タイトルを入力してね(20字以内)"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={post.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => post.setTitle(e)}
            />
            {(post.title.length === 0 || post.title.length > 20) ? (
              <LengthCountError>
                {post.title.length}
                /20
              </LengthCountError>
            )
              : (
                <LengthCount>
                  {post.title.length}
                  /20
                </LengthCount>
              )}
            <TextField
              style={{ margin: '20px auto', width: '90%', display: 'flex' }}
              placeholder="コメントを入力してね(200字以内)"
              multiline
              rows="5"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={post.comment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => post.setComment(e)}
            />
            {(post.comment.length === 0 || post.comment.length > 200) ? (
              <LengthCountError>
                {post.comment.length}
                /200
              </LengthCountError>
            )
              : (
                <LengthCount>
                  {post.comment.length}
                  /200
                </LengthCount>
              )}
            <Select
              value={post.game}
              onChange={(e: any) => post.setGame(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </>
        )
      }
    </CustomModal>
  );
};
export default PostModal;
