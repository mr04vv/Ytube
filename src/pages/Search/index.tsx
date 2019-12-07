import React from 'react';
import useMyInfo from 'hooks/User/useMyInfo';
import {
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  ListItemText,
  TextField,
} from '@material-ui/core';
import useFetchPost, { OrderInterface } from 'hooks/Post/useFetchPost';
import PostList from 'components/PostList';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CategoryInterface } from 'interfaces/CategoryInterface';
import usePost from 'hooks/Post/usePost';
import { GameInterface } from 'interfaces/GameInterface';
import { Container, SearchContainer, SearchButton } from './styles';

const Search = () => {
  const info = useMyInfo();
  const master = usePost();
  const post = useFetchPost(master.categoryMaster, master.gameMaster);

  return (
    <>
      <Container>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>条件を指定して検索する</Typography>
          </ExpansionPanelSummary>
          <SearchContainer>
            <FormControl fullWidth style={{ minWidth: '100%', marginBottom: '10px' }}>
              <TextField
                label="フリーワード検索"
                onChange={(e: any) => post.setSearchWord(e.target.value)}
                value={post.searchWord}
              />
            </FormControl>
            <FormControl fullWidth style={{ minWidth: '100%' }}>
              <InputLabel>ゲームタイトル</InputLabel>
              <Select
                input={<Input />}
                value={post.searchGameTitle}
                onChange={(e: any) => post.setSearchGames(e.target.value)}
              >
                {master.gameMaster.map((game: GameInterface) => (
                  <MenuItem key={game.title} value={game.title}>
                    <ListItemText primary={game.title} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ minWidth: '100%', marginTop: '10px' }}>
              <InputLabel>カテゴリ</InputLabel>
              <Select
                input={<Input />}
                value={post.searchCategoryName}
                onChange={(e: any) => post.setSearchCategories(e.target.value)}
              >
                {master.categoryMaster.map((category: CategoryInterface) => (
                  <MenuItem key={category.name} value={category.name}>
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ minWidth: '30%', margin: '10px auto' }}>
              <InputLabel>並び替え</InputLabel>
              <Select
                input={<Input />}
                value={post.searchOrder}
                onChange={(e: any) => post.setSearchOrder(parseInt(e.target.value, 10))}
              >
                {post.orderMaster.map((order: OrderInterface) => (
                  <MenuItem key={order.name} value={order.id}>
                    <ListItemText primary={order.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <SearchButton onClick={() => post.doSearch()}>検索</SearchButton>
          </SearchContainer>
        </ExpansionPanel>
        {info.isLoading && <CircularProgress style={{ margin: '30vh auto' }} />}
      </Container>
      {!info.isLoading && (
        <PostList
          path="home"
          posts={post.searchPost}
          isLoading={post.isLoading}
          hasNext={post.hasNext}
          hasPrev={post.hasPrev}
          page={post.page}
          next={post.next}
          prev={post.prev}
          per={post.per}
          hasController
        />
      )}
    </>
  );
};

export default Search;
