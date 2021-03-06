import * as React from 'react';
import Helmet from 'react-helmet';
import { SmallSizePostListItem } from 'components/SmallSizePostListItem';
import { useWindowDimensions } from 'usecase/useWindowDimensions';
import { Category } from 'entity/entity/category';
import { SMALL_POST_LIST_CONTAINER_MAX_WIDTH } from 'constants/maxWidth';
import { Loader } from 'components/Loader';
import { LoginModal } from 'components/LoginModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { COLOR_YOUTUBE } from 'constants/colors';
import { NotFoundIcon } from 'components/NotFoundIcon';
import { MoreVert } from '@material-ui/icons';
import { Menu, MenuItem } from '@material-ui/core';
import { useEnhancer } from './enhancer';
import { A, AppButtonsContainer, CategoryGameContainer, CategoryName, Container, Detail, DetailContainer, Divider, GameTitle, LikeContainer, LikedIcon, LikeIcon, LoaderContainer, MainContentContainer, MetaContainer, NotFoundContainer, OpenAppButton, OpenAppButtonContainer, OpenYouTubeButton, PlayCountAndDate, RandomPostContainer, RandomPostListContainer, SettingContainer, ShareAndLikeContainer, ShareContainer, ShareIcon, Title, YouTubePlayer, } from './style';
import { ShareModal } from './ShareModal';
import { DeleteModal } from './DeleteModal';

const Post = () => {
  const enhancer = useEnhancer();
  const window = useWindowDimensions();

  return (
    <>
      <LoginModal isOpen={enhancer.isOpenLoginModal} setIsOpen={enhancer.setIsOpenLoginModal} />
      <DeleteModal isOpen={enhancer.openDeleteModal} setIsOpen={enhancer.setOpenDeleteModal} deletePost={enhancer.delPost} />
      { enhancer.isLoading &&
      <LoaderContainer>
        <Loader />
      </LoaderContainer>}
      {enhancer.failed &&
      <NotFoundContainer>
        <NotFoundIcon size={60} />
        動画が見つかりませんでした
      </NotFoundContainer>}
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
        <>
          <ShareModal isOpen={enhancer.isOpenShareModal} setIsOpen={enhancer.setIsOpenShareModal} dynamicLink={enhancer.post.dynamicLink} />
          <Container width={window.windowDimensions.width}>
            <MainContentContainer width={`${window.windowDimensions.width - SMALL_POST_LIST_CONTAINER_MAX_WIDTH - 56}px`}>
              <YouTubePlayer
                key={enhancer.post.id}
                ref={enhancer.ref}
                controls
                onPause={() => enhancer.setPlaying(false)}
                onPlay={() => enhancer.setPlaying(true)}
                width="100%"
                // eslint-disable-next-line no-nested-ternary
                height={window.windowDimensions.width > 1700 ? `${(1700 - SMALL_POST_LIST_CONTAINER_MAX_WIDTH) * 0.5625}px` : window.windowDimensions.width > 1020 ? `${(window.windowDimensions.width - SMALL_POST_LIST_CONTAINER_MAX_WIDTH) * 0.5625}px` : `${(window.windowDimensions.width) * 0.5625}px`}
                onEnded={() => {
                  if (enhancer.ref.current) {
                    enhancer.loop(enhancer.ref.current, enhancer.post ? enhancer.post.startTime : 0);
                  }
                }}
                url={enhancer.post.videoUrl}
                youtubeConfig={{
                  playerVars: {
                    start: enhancer.post.startTime,
                    end: enhancer.post.endTime,
                  },
                }}
                playing={enhancer.playing}
              />
              <CategoryGameContainer>
                <GameTitle onClick={() => enhancer.pushSearchPage(enhancer.post?.game?.id, undefined)}>{enhancer.post.game?.title}</GameTitle>
                {enhancer.post.categories?.map((category: Category) => <CategoryName onClick={() => enhancer.pushSearchPage(undefined, category.id)}>{category.name}</CategoryName>)}
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
                  <LikeContainer onClick={enhancer.onClickLikeButton}>
                    {enhancer.post.alreadyLiked ? <LikedIcon /> : <LikeIcon />}
                    {enhancer.post.likeCount}
                  </LikeContainer>
                  <ShareContainer onClick={() => enhancer.setIsOpenShareModal(true)}>
                    <ShareIcon />
                    共有
                  </ShareContainer>
                  {enhancer.isMyPost &&
                  <>
                    <SettingContainer aria-controls="simple-menu" onClick={enhancer.handleClick}>
                      <MoreVert />
                    </SettingContainer>
                    <Menu
                      id="simple-menu"
                      anchorEl={enhancer.anchorEl}
                      keepMounted
                      open={Boolean(enhancer.anchorEl)}
                      onClose={enhancer.handleClose}
                    >
                      <MenuItem onClick={enhancer.pushEdit}>編集</MenuItem>
                      <MenuItem onClick={() => {
                        enhancer.handleClose();
                        enhancer.setOpenDeleteModal(true);
                      }}
                      >
                        削除
                      </MenuItem>
                    </Menu>
                  </>}
                </ShareAndLikeContainer>
              </MetaContainer>
              <Divider />
              <AppButtonsContainer>
                <OpenAppButtonContainer>
                  <A href={enhancer.post.dynamicLink} target="_blank" rel="noreferrer">
                    <OpenAppButton onClick={enhancer.onClickOpenAppButton}>
                      アプリで開く
                    </OpenAppButton>
                  </A>
                </OpenAppButtonContainer>
                <OpenAppButtonContainer>
                  <A href={enhancer.post.videoUrl} target="_blank" rel="noreferrer">
                    <OpenYouTubeButton onClick={enhancer.onClickOpenAppButton}>
                      <FontAwesomeIcon icon={faYoutube} size="lg" color={COLOR_YOUTUBE} />
                      YouTubeで開く
                    </OpenYouTubeButton>
                  </A>
                </OpenAppButtonContainer>
              </AppButtonsContainer>
            </MainContentContainer>
            <RandomPostListContainer>
              {
              enhancer.randomPosts.map((p) =>
                <RandomPostContainer onClick={() => enhancer.pushPostDetailPage(p.id)}>
                  <SmallSizePostListItem post={p} />
                </RandomPostContainer>)
            }
            </RandomPostListContainer>
          </Container>
        </>}
    </>
  );
};

export default Post;
