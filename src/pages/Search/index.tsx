import React from 'react';
import { PostListItem } from 'components/PostListItem';
import { useWindowDimensions } from 'usecase/useWindowDimensions';
import { SmallSizePostListItem } from 'components/SmallSizePostListItem';
import { TuneOutlined } from '@material-ui/icons';
import { Loader } from 'components/Loader';
import InfiniteScroll from 'react-infinite-scroller';
import { CircularProgress } from '@material-ui/core';
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
        <Devider />
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
        }

      </Container>
  );
};

export default Home;
