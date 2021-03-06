import React from 'react';
import { SmallSizePostListItem } from 'components/SmallSizePostListItem';
import { useWindowDimensions } from 'usecase/useWindowDimensions';
import { PostListItem } from 'components/PostListItem';
import { TuneOutlined } from '@material-ui/icons';
import { Loader } from 'components/Loader';
import InfiniteScroll from 'react-infinite-scroller';
import { CircularProgress } from '@material-ui/core';
import { Sort } from 'components/Sort';
import { Post } from 'entity/entity/post';
import { NotFoundIcon } from 'components/NotFoundIcon';
import {
  Container,
  CustomExpansionPanelSummary,
  CustomExpantionPanel,
  Divider,
  LoaderContainer,
  NotFoundContainer,
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
  const maxSplit = window.splitSize > 5 ? 4 : window.splitSize - 1;
  const dummyLength = maxSplit - (enhancer.postLength % maxSplit);
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
          <Sort sortType={enhancer.sortType} onClick={enhancer.setSortType} />
        </CustomExpantionPanel>
        <Divider />
        {enhancer.isSorting ?
          <ProgressContainer>
            <CircularProgress size="30px" />
          </ProgressContainer> :
          <InfiniteScroll
            loadMore={enhancer.loadMore} // 項目を読み込む際に処理するコールバック関数
            hasMore={!enhancer.isLastPage && !enhancer.isMoreLoading && !enhancer.isLoading} // 読み込みを行うかどうかの判定
          >
            <PostContainer>
              <>
                {enhancer.posts.map((post: Post) =>
                  (window.windowDimensions.width > 480 ?
                    <PostListItemContainer key={`search_large_${post.id}`} onClick={() => enhancer.pushPostDetailPage(post.id)} width={window.windowDimensions.width} splitSize={window.splitSize}>
                      <PostListItem post={post} />
                    </PostListItemContainer>
                    :
                    <SmallPostListItemContainer key={`search_small_${post.id}`} onClick={() => enhancer.pushPostDetailPage(post.id)}>
                      <SmallSizePostListItem post={post} />
                    </SmallPostListItemContainer>
                  ))}
                {window.windowDimensions.width > 480 && [...Array(dummyLength)].map((_, i) => <PostListItemContainer key={`dummy_${i.toString()}`} width={window.windowDimensions.width} splitSize={window.splitSize} />)}
              </>
            </PostContainer>
            {enhancer.isMoreLoading &&
              <ProgressContainer>
                <CircularProgress size="30px" />
              </ProgressContainer>}
          </InfiniteScroll>}
        {enhancer.posts.length === 0 && !enhancer.isLoading && !enhancer.isMoreLoading && !enhancer.isSorting &&
          <NotFoundContainer>
            <NotFoundIcon size={60} />
            動画が見つかりませんでした
          </NotFoundContainer>}
      </Container>
  );
};

export default Home;
