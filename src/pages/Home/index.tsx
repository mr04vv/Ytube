import React from 'react';
import { PostListItem } from 'components/PostListItem';
import { useWindowDimensions } from 'usecase/useWindowDimensions';
import { SmallSizePostListItem } from 'components/SmallSizePostListItem';
import { TuneOutlined } from '@material-ui/icons';
import { Loader } from 'components/Loader';
import InfiniteScroll from 'react-infinite-scroller';
import { CircularProgress } from '@material-ui/core';
import { SortTypes } from 'entity/union/sortType';
import { Sort } from 'components/Sort';
import {
  Container,
  CustomExpansionPanelSummary,
  CustomExpantionPanel,
  Devider,
  LoaderContainer,
  PostContainer,
  PostListItemContainer,
  ProgressContainer,
  SmallPostListItemContainer,
} from './styles';
import { useEnhancer } from './enhancer';

const Home = () => {
  // const modalOpen = usePostModal();
  // const master = useMasterData();
  // const post = useFetchPost(master.categoryMaster, master.gameMaster);
  // const info = useMyInfo();
  const enhancer = useEnhancer();
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const window = useWindowDimensions();
  const dummyLength = (window.splitSize - 1) - (enhancer.postLength % (window.splitSize - 1));
  return (
    enhancer.isLoading ?
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
      :
      <Container>
        <CustomExpantionPanel expanded={isExpanded}>
          <CustomExpansionPanelSummary
            onClick={() => { setIsExpanded(!isExpanded); }}
            expandIcon={<TuneOutlined />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            並べ替え
          </CustomExpansionPanelSummary>
          <Sort sortType={SortTypes.NEWEST} onClick={enhancer.onClickOrder} />
        </CustomExpantionPanel>
        <Devider />
        <InfiniteScroll
          loadMore={enhancer.loadMore} // 項目を読み込む際に処理するコールバック関数
          hasMore={!enhancer.isLastPage && !enhancer.isMoreLoading} // 読み込みを行うかどうかの判定
        >
          <PostContainer>
            <>
              {enhancer.posts.map(post =>
                (window.windowDimensions.width > 480 ?
                  <PostListItemContainer width={window.windowDimensions.width} splitSize={window.splitSize}>
                    <PostListItem post={post as any} />
                  </PostListItemContainer>
                  :
                  <SmallPostListItemContainer>
                    <SmallSizePostListItem post={post as any} />
                  </SmallPostListItemContainer>
                ))}
              {window.windowDimensions.width > 480 && [...Array(dummyLength)].map(() => <PostListItemContainer width={window.windowDimensions.width} splitSize={window.splitSize} />)}
            </>
          </PostContainer>
          {enhancer.isMoreLoading &&
            <ProgressContainer>
              <CircularProgress size="30px" />
            </ProgressContainer>
            }

        </InfiniteScroll>

      </Container>
  /* <SearchContainer>
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
                setIsExpanded(false);
              }
            }}
            label="フリーワード検索"
            onChange={(e: any) => post.setSearchWord(e.target.value)}
            value={post.searchWord}
          />
          <SearchButton
            onClick={() => {
              post.doSearch({});
              setIsExpanded(false);
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
          <CustomSearchContainer>
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
          </CustomSearchContainer>
        </CustomExpantionPanel>
        {info.isLoading && <CircularProgress style={{ margin: '30vh auto', display: 'block' }} />}
      </SearchContainer>
      <PostList
        path="home"
        posts={post.posts}
        isLoading={post.isLoading}
        hasNext={post.hasNext}
        hasPrev={post.hasPrev}
        page={post.page}
        next={post.next}
        prev={post.prev}
        per={post.per}
        master={master}
        hasController
        place="home"
      />
      {info.loginStatus === 'success' && (
        <Container>
          <CustomFab onClick={() => modalOpen.setIsOpen(true)}>
            <AddIcon />
          </CustomFab>
          <PostModal
            isOpen={modalOpen.isOpen}
            closeModal={() => modalOpen.setIsOpen(false)}
            master={master}
            page={post.page}
            per={post.per}
          />
        </Container>
      )} */
  );
};

export default Home;
