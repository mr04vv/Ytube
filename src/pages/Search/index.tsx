import React, { useState } from 'react';
import useMyInfo from 'hooks/User/useMyInfo';
import {
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  ListItemText,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import TuneOutlined from '@material-ui/icons/TuneOutlined';
import useFetchPost, { OrderInterface } from 'hooks/Post/useFetchPost';
import PostList from 'components/PostList';
import { CategoryInterface } from 'interfaces/CategoryInterface';
import { GameInterface } from 'interfaces/GameInterface';
import useMasterData from 'hooks/Post/useMasterData';
import {
  Container,
  CustomExpantionPanel,
  CustomSearchButton,
  SearchButton,
  SearchContainer,
  SearchTextField,
} from './styles';

const Search = () => {
  const info = useMyInfo();
  const master = useMasterData();
  const post = useFetchPost(master.categoryMaster, master.gameMaster);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <>
      <Container>
        <FormControl
          fullWidth
          style={{
            minWidth: '100%',
            marginBottom: '10px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <SearchTextField
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.keyCode === 13) {
                post.doSearch({});
              }
            }}
            label="フリーワード検索"
            onChange={(e: any) => post.setSearchWord(e.target.value)}
            value={post.searchWord}
          />
          <SearchButton
            onClick={() => {
              post.doSearch({});
            }}
          >
            <SearchOutlined />
          </SearchButton>
        </FormControl>
        <CustomExpantionPanel expanded={isExpanded}>
          <ExpansionPanelSummary
            onClick={() => setIsExpanded(!isExpanded)}
            expandIcon={<TuneOutlined />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ marginLeft: 'auto', marginRight: '0px', fontSize: '14px' }}>
              条件を絞って検索
            </Typography>
          </ExpansionPanelSummary>
          <SearchContainer>
            <FormControl fullWidth style={{ width: '100%' }}>
              <InputLabel>ゲームタイトル</InputLabel>
              <Select
                input={<Input style={{ height: '34px' }} />}
                value={post.searchGameTitle}
                onChange={(e: any) => {
                  post.setSearchGames(e.target.value);
                }}
                MenuProps={{
                  style: {
                    height: '500px',
                  },
                }}
              >
                {master.searchGameMaster.map((game: GameInterface) => (
                  <MenuItem key={game.title} value={game.title}>
                    <ListItemText primary={game.title} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ width: '100%', marginTop: '10px' }}>
              <InputLabel>カテゴリ</InputLabel>
              <Select
                input={<Input style={{ height: '34px' }} />}
                value={post.searchCategoryName}
                onChange={(e: any) => {
                  post.setSearchCategories(e.target.value);
                }}
                MenuProps={{
                  style: {
                    height: '500px',
                  },
                }}
              >
                {master.searchCategoryMaster.map((category: CategoryInterface) => (
                  <MenuItem key={category.name} value={category.name}>
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ width: '100%', margin: '10px auto' }}>
              <InputLabel>並び替え</InputLabel>
              <Select
                input={<Input style={{ height: '34px' }} />}
                value={post.searchOrder}
                onChange={(e: any) => {
                  post.setSearchOrder(parseInt(e.target.value, 10));
                }}
                MenuProps={{
                  style: {
                    height: '500px',
                  },
                }}
              >
                {post.orderMaster.map((order: OrderInterface) => (
                  <MenuItem key={order.name} value={order.id}>
                    <ListItemText primary={order.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <CustomSearchButton
              onClick={() => {
                post.doSearch({});
                setIsExpanded(false);
              }}
            >
              検索
            </CustomSearchButton>
          </SearchContainer>
        </CustomExpantionPanel>
        {info.isLoading && <CircularProgress style={{ margin: '30vh auto', display: 'block' }} />}
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
          master={master}
          place="search"
        />
      )}
    </>
  );
};

export default Search;
