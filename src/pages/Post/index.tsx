import * as React from 'react';
import Helmet from 'react-helmet';
import { SmallSizePostListItem } from 'components/SmallSizePostListItem';
import { useWindowDimensions } from 'usecase/useWindowDimensions';
import { Category } from 'entity/entity/category';
import { SMALL_POST_LIST_CONTAINER_MAX_WIDTH } from 'constants/maxWidth';
import { Loader } from 'components/Loader';
import { useEnhancer } from './enhancer';
import { CategoryGameContainer, CategoryName, Container, Detail, DetailContainer, Devider, GameTitle, LikeContainer, LikeIcon, LoaderContainer, MainContentContainer, MetaContainer, OpenAppButton, OpenAppButtonContainer, PlayCountAndDate, RandomPostContainer, RandomPostListContainer, ShareAndLikeContainer, ShareContainer, ShareIcon, Title, YouTubePlayer, } from './style';


const Post = () => {
  const enhancer = useEnhancer();
  const window = useWindowDimensions();

  return (
    <>
      { enhancer.isLoading &&
      <LoaderContainer>
        <Loader />
      </LoaderContainer>}
      {enhancer.failed &&
        <div>見つかりませんでした</div>
      }
      {enhancer.post && (
        <Helmet
          title="わいコレ | わいわいの動画共有SNS"
          meta={[
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: enhancer.post.title },
            { name: 'twitter:description', content: enhancer.post.detail },
            { name: 'twitter:image', content: enhancer.post.thumbnailUrl },
            { property: 'og:title', content: enhancer.post.title },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: `https://yy-tube.com/enhancer.post/${enhancer.post.id}` },
            { property: 'og:image', content: enhancer.post.thumbnailUrl },
            { property: 'og:description', content: enhancer.post.detail },
          ]}
        />
      )}
      {enhancer.post &&
        <Container width={window.windowDimensions.width}>
          <MainContentContainer width={`${window.windowDimensions.width - SMALL_POST_LIST_CONTAINER_MAX_WIDTH - 56}px`}>
            <YouTubePlayer
              key={enhancer.post.id}
              ref={enhancer.ref}
              controls
              width="100%"
              height={window.windowDimensions.width > 1700 ? `${(1700 - SMALL_POST_LIST_CONTAINER_MAX_WIDTH) * 0.5625}px` : `${(window.windowDimensions.width - SMALL_POST_LIST_CONTAINER_MAX_WIDTH) * 0.5625}px`}
              onStart={async () => { }}
              onEnded={() => {
                if (enhancer.ref.current) {
                  enhancer.loop(enhancer.ref.current, enhancer.post ? enhancer.post.startTime : 0);
                }
              }
            }
              url={enhancer.post.videoUrl}
              youtubeConfig={{
                playerVars: {
                  start: enhancer.post.startTime,
                  end: enhancer.post.endTime,
                },
              }}
              playing
            />
            <CategoryGameContainer>
              <GameTitle>{enhancer.post.game.title}</GameTitle>
              {enhancer.post.categories.map((category: Category) => <CategoryName>{category.name}</CategoryName>)}
            </CategoryGameContainer>
            <Title>{enhancer.post.title}</Title>
            <DetailContainer>
              <Detail>{enhancer.post.detail}</Detail>
            </DetailContainer>
            <MetaContainer>
              <PlayCountAndDate>
                {enhancer.post.playCount}
                回再生・
                {/* {calculatePostDate(enhancer.post.createdAt)} */}
                { enhancer.post.endTime - enhancer.post.startTime}
                秒
              </PlayCountAndDate>
              <ShareAndLikeContainer>
                <LikeContainer>
                  <LikeIcon />
                  {enhancer.post.likeCount}
                </LikeContainer>
                <ShareContainer>
                  <ShareIcon />
                  共有
                </ShareContainer>
              </ShareAndLikeContainer>
            </MetaContainer>
            <Devider />
            <OpenAppButtonContainer>
              <OpenAppButton>
                アプリで開く
              </OpenAppButton>
            </OpenAppButtonContainer>
          </MainContentContainer>
          <RandomPostListContainer>
            {
              enhancer.randomPosts.map(p =>
                <RandomPostContainer onClick={() => enhancer.pushPostDetailPage(p.id)}>
                  <SmallSizePostListItem post={p} />
                </RandomPostContainer>)}
          </RandomPostListContainer>
        </Container>
      }
    </>
  );
};

export default Post;
