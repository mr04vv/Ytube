import React from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';
import {
  TextField,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  ListItemText,
  Checkbox,
  FormControlLabel,
  withStyles,
} from '@material-ui/core';
import usePost from 'hooks/Post/usePost';
import DeleteIcon from '@material-ui/icons/Clear';
import Arrow from '@material-ui/icons/ArrowBack';
import SimpleSnackBar from 'components/SimpleSnackBar';
import { GameInterface } from 'interfaces/GameInterface';
import { CategoryInterface } from 'interfaces/CategoryInterface';
import usePostColumn from 'hooks/Post/usePostColumn';
import { CheckboxProps } from '@material-ui/core/Checkbox';
import { PostInterface } from 'interfaces/posts/PostInterface';
import { UseMasterData } from 'hooks/Post/useMasterData';
import { Place } from 'components/PostList';
import {
  CustomModal,
  PostContainer,
  TimeContainer,
  Time,
  CustomButton,
  PostHeader,
  PostButton,
  LengthCount,
  LengthCountError,
  ColumnContainer,
  NewPostContainer,
  AddButton,
} from './styles';
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

interface PropsInterface {
  isOpen: boolean;
  closeModal: () => void;
  content?: PostInterface;
  master: UseMasterData;
  isEdit?: boolean;
  page?: string;
  per?: string;
  place?: Place;
}

const PostModal = ({ isOpen, closeModal, content, master, isEdit, page, per, place }: PropsInterface) => {
  const refs = React.useRef(null);
  const post = usePost(master.categoryMaster, content, page, per, place);
  const add = usePostColumn();
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
          backgroundColor: 'rgba(165, 165, 165, 0.5)',
        },
      }}
    >
      <SimpleSnackBar isShow={!!post.error} onClose={() => post.setError('')} message={post.error} type="warning" />
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
            disabled={!post.url || parseInt(post.startTime, 10) >= parseInt(post.endTime, 10)}
          >
            次へ
          </PostButton>
        )}
        {post.tabIndex === 1 && (
          <PostButton
            color="primary"
            variant="contained"
            onClick={
              isEdit && isEdit === true && content
                ? () => post.editPost(content.id, () => closeModal())
                : () => post.post(() => closeModal())
            }
            disabled={
              post.isLoading ||
              post.title.length === 0 ||
              post.title.length > 30 ||
              post.comment.length > 200 ||
              post.category.length === 0 ||
              post.game === undefined
            }
          >
            {isEdit && isEdit === true ? '編集' : '投稿'}
          </PostButton>
        )}
      </PostHeader>
      {post.tabIndex === 0 ? (
        <>
          <ReactPlayer width="100%" height="50%" ref={refs} controls url={post.url} />
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
              <CustomButton color="primary" variant="contained" onClick={() => post.setStart(refs.current)}>
                開始時間をセット
              </CustomButton>
              <Time>{ConvertTime(post.startTime)}</Time>
            </TimeContainer>
            <TimeContainer>
              <CustomButton color="primary" variant="contained" onClick={() => post.setEnd(refs.current)}>
                終了時間をセット
              </CustomButton>
              <Time>{ConvertTime(post.endTime)}</Time>
            </TimeContainer>
          </PostContainer>
        </>
      ) : (
        <>
          <TextField
            style={{ margin: '4vh auto 0', width: '90%', display: 'flex' }}
            placeholder="タイトルを入力してね(30字以内)"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={post.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => post.setTitle(e)}
          />
          {post.title.length === 0 || post.title.length > 30 ? (
            <LengthCountError>
              {post.title.length}
              /30
            </LengthCountError>
          ) : (
            <LengthCount>
              {post.title.length}
              /30
            </LengthCount>
          )}
          <TextField
            style={{ margin: '20px auto', width: '90%', display: 'flex' }}
            placeholder="コメントを入力してね(任意)"
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
          {post.comment.length > 200 ? (
            <LengthCountError>
              {post.comment.length}
              /200
            </LengthCountError>
          ) : (
            <LengthCount>
              {post.comment.length}
              /200
            </LengthCount>
          )}

          <ColumnContainer>
            <FormControl fullWidth style={{ minWidth: '50%' }}>
              <InputLabel>ゲームタイトル</InputLabel>
              <Select fullWidth value={post.game} onChange={(e: any) => post.setGame(e.target.value)}>
                {master.gameMaster.map((game: GameInterface) => (
                  <MenuItem value={game.id}>{game.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ minWidth: '50%' }}>
              <InputLabel>カテゴリ</InputLabel>
              <Select
                multiple
                input={<Input />}
                value={post.categoryName}
                renderValue={selected => (selected as string[]).join(', ')}
                onChange={(e: any) => post.setCategory(e.target.value)}
              >
                {master.categoryMaster.map((category: CategoryInterface) => (
                  <MenuItem value={category.name}>
                    <Checkbox checked={post.category.indexOf(category.id) > -1} />
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ColumnContainer>
          <NewPostContainer>
            <TextField
              placeholder="ゲームを追加する"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={add.newGame}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => add.setNewGame(e.target.value)}
            />
            <AddButton disabled={add.isLoadingGame || !add.newGame} onClick={() => add.postGame()}>
              追加
            </AddButton>
          </NewPostContainer>
          <NewPostContainer>
            <TextField
              placeholder="カテゴリを追加する"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={add.newCategory}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => add.setNewCategory(e.target.value)}
            />
            <AddButton disabled={add.isLoadingCategory || !add.newCategory} onClick={() => add.postCategory()}>
              追加
            </AddButton>
          </NewPostContainer>
          <NewPostContainer>
            <FormControlLabel
              control={
                <YellowCheckbox
                  checked={post.isAnonymous}
                  onChange={() => post.setIsAnonymous(!post.isAnonymous)}
                  value={post.isAnonymous}
                  color="primary"
                />
              }
              label="匿名で投稿する"
            />
          </NewPostContainer>
        </>
      )}
    </CustomModal>
  );
};
export default PostModal;

const YellowCheckbox = withStyles({
  root: {
    '&$checked': {
      color: '#e85c9c',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);
