import React from 'react';
import { PostListItem } from 'components/PostListItem';
import { useWindowDimensions } from 'usecase/useWindowDimensions';
import { SmallSizePostListItem } from 'components/SmallSizePostListItem';
import { Loader } from 'components/Loader';
import InfiniteScroll from 'react-infinite-scroller';
import { CircularProgress, Tab, Tabs } from '@material-ui/core';
import {
  AccountIcon,
  AccountInfo,
  Container,
  IconContainer,
  LoaderContainer,
  NotFoundContainer,
  PostContainer,
  PostListItemContainer,
  ProgressContainer,
  SmallPostListItemContainer,
  TabContainer,
  UserName,
} from './styles';
import { TabType, useEnhancer } from './enhancer';

export const MyPage = () => {
  const enhancer = useEnhancer();
  const window = useWindowDimensions();
  const maxSplit = window.splitSize > 5 ? 4 : window.splitSize - 1;
  const dummyLength = maxSplit - (enhancer.myPostLength % maxSplit);
  return (
    enhancer.isLoading ?
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
      :
      <Container>
        <AccountInfo>
          <IconContainer>
            <AccountIcon src={enhancer.userInfo?.imageUrl} />
          </IconContainer>
          <UserName>{ enhancer.userInfo?.name}</UserName>
        </AccountInfo>
        <TabContainer>
          <Tabs
            value={enhancer.tabIndex}
            onChange={(_: React.ChangeEvent<{}>, newValue: number) => enhancer.setTabIndex(newValue)}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="投稿" />
            <Tab label="いいね" />
          </Tabs>
        </TabContainer>
        {enhancer.isSorting ?
          <ProgressContainer>
            <CircularProgress size="30px" />
          </ProgressContainer> :
          <>
            {enhancer.tabIndex === TabType.my ?
              <>
                <InfiniteScroll
                  loadMore={enhancer.loadMoreMyPosts} // 項目を読み込む際に処理するコールバック関数
                  hasMore={!enhancer.isLastMyPost && !enhancer.isMoreLoading && !enhancer.isLoading}
                >
                  <PostContainer>
                    <>
                      {enhancer.myPosts.map((post) =>
                        (window.windowDimensions.width > 480 ?
                          <PostListItemContainer key={`mypost_large_${post.id}`} onClick={() => enhancer.pushPostDetailPage(post.id)} width={window.windowDimensions.width} splitSize={window.splitSize}>
                            <PostListItem post={post} />
                          </PostListItemContainer>
                          :
                          <SmallPostListItemContainer key={`mypost_small_${post.id}`} onClick={() => enhancer.pushPostDetailPage(post.id)}>
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
                </InfiniteScroll>
                {enhancer.myPosts.length === 0 &&
                <NotFoundContainer>
                  投稿はまだありません
                </NotFoundContainer>}
              </>
              :
              <>
                <InfiniteScroll
                  loadMore={enhancer.loadMoreLikePosts} // 項目を読み込む際に処理するコールバック関数
                  hasMore={!enhancer.isLastLikePost && !enhancer.isMoreLoading && !enhancer.isLoading}
                >
                  <PostContainer>
                    <>
                      {enhancer.likePosts.map((like) =>
                        (window.windowDimensions.width > 480 ?
                          <PostListItemContainer key={`like_large_${like.post.id}`} onClick={() => enhancer.pushPostDetailPage(like.post.id)} width={window.windowDimensions.width} splitSize={window.splitSize}>
                            {console.debug(like.post.id)}
                            <PostListItem post={like.post} />
                          </PostListItemContainer>
                          :
                          <SmallPostListItemContainer key={`like_small_${like.post.id}`} onClick={() => enhancer.pushPostDetailPage(like.post.id)}>
                            <SmallSizePostListItem post={like.post} />
                          </SmallPostListItemContainer>
                        ))}
                      {window.windowDimensions.width > 480 && [...Array(dummyLength)].map((_, i) => <PostListItemContainer key={`dummy_${i.toString()}`} width={window.windowDimensions.width} splitSize={window.splitSize} />)}
                    </>
                  </PostContainer>
                  {enhancer.isMoreLoading &&
                  <ProgressContainer>
                    <CircularProgress size="30px" />
                  </ProgressContainer>}
                </InfiniteScroll>
                {enhancer.likePosts.length === 0 &&
                <NotFoundContainer>
                  いいねはまだありません
                </NotFoundContainer>}
              </>}
          </>}
      </Container>
  );
};
