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
              <InfiniteScroll
                loadMore={enhancer.loadMoreMyPosts} // 項目を読み込む際に処理するコールバック関数
                hasMore={!enhancer.isLastMyPost && !enhancer.isMoreLoading && !enhancer.isLoading}
              >
                <PostContainer>
                  <>
                    {enhancer.myPosts.map(post =>
                      (window.windowDimensions.width > 480 ?
                        <PostListItemContainer onClick={() => enhancer.pushPostDetailPage(post.id)} width={window.windowDimensions.width} splitSize={window.splitSize}>
                          <PostListItem post={post} />
                        </PostListItemContainer>
                        :
                        <SmallPostListItemContainer onClick={() => enhancer.pushPostDetailPage(post.id)}>
                          <SmallSizePostListItem post={post} />
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
              :
              <InfiniteScroll
                loadMore={enhancer.loadMoreLikePosts} // 項目を読み込む際に処理するコールバック関数
                hasMore={!enhancer.isLastLikePost && !enhancer.isMoreLoading && !enhancer.isLoading}
              >
                <PostContainer>
                  <>
                    {enhancer.likePosts.map(like =>
                      (window.windowDimensions.width > 480 ?
                        <PostListItemContainer onClick={() => enhancer.pushPostDetailPage(like.post.id)} width={window.windowDimensions.width} splitSize={window.splitSize}>
                          <PostListItem post={like.post} />
                        </PostListItemContainer>
                        :
                        <SmallPostListItemContainer onClick={() => enhancer.pushPostDetailPage(like.post.id)}>
                          <SmallSizePostListItem post={like.post} />
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
          </>
        }

      </Container>
  );
};
