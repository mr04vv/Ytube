import { AccountCircle, HistoryRounded, HomeRounded } from '@material-ui/icons';
import React from 'react';
import useReactRouter from 'use-react-router';
import { useEnhancer } from './enhancer';
import { CustomAvatar, Container, WhiteAppBar, ImageContainer, BarContainer, AppBarLeftItem, AppBarRightItem, CustomIconLabel, CustomIconButton, CreatePostButton, CreatePostButtonLabel, VideoCallIcon, AvatarContainer, SearchContainer, SearchField, SearchButton, SearchIcon, TopLink } from './styles';

const icon = require('assets/logo.png');

const Header = () => {
  const { history } = useReactRouter();
  const { userInfo } = useEnhancer();
  return (
    <Container>
      <WhiteAppBar>
        <BarContainer>
          <TopLink
            onClick={() =>
              history.push({
                pathname: '/home',
              })
            }
          >
            <ImageContainer>
              <img height="40px" src={icon} alt="" />
            </ImageContainer>
          </TopLink>
          <AppBarLeftItem>
            <CustomIconButton>
              <HomeRounded />
              <CustomIconLabel>ホーム</CustomIconLabel>
            </CustomIconButton>
            <CustomIconButton>
              <HistoryRounded />
              <CustomIconLabel>履歴</CustomIconLabel>
            </CustomIconButton>
          </AppBarLeftItem>
          <SearchContainer>
            <SearchField placeholder="検索" />
            <SearchButton>
              <SearchIcon />
            </SearchButton>
          </SearchContainer>
          <AppBarRightItem>
            <CreatePostButton>
              <VideoCallIcon />
              <CreatePostButtonLabel>新規投稿</CreatePostButtonLabel>
            </CreatePostButton>
            <AvatarContainer>
              {userInfo && userInfo.imageUrl ? (
                <CustomAvatar aria-label="recipe" src={userInfo.imageUrl} />
              ) : (
                <AccountCircle color="action" />
              )}
            </AvatarContainer>
          </AppBarRightItem>
        </BarContainer>
      </WhiteAppBar>
    </Container>
  );
};

export default Header;
