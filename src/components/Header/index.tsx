import { AccountCircle, HomeRounded } from '@material-ui/icons';
import React from 'react';
import { useEnhancer } from './enhancer';
import { CustomAvatar, Container, WhiteAppBar, ImageContainer, BarContainer, AppBarLeftItem, AppBarRightItem, CustomIconLabel, CustomIconButton, CreatePostButton, CreatePostButtonLabel, VideoCallIcon, AvatarContainer, SearchContainer, SearchField, SearchButton, SearchIcon, TopLink } from './styles';

const icon = require('assets/logo.png');

const Header = () => {
  const { userInfo, setSearchWord, onKeyPressed, searchWord, pushSearchPage, pushHome, isSearchable } = useEnhancer();
  return (
    <Container>
      <WhiteAppBar>
        <BarContainer>
          <TopLink onClick={() => pushHome()}>
            <ImageContainer>
              <img height="40px" src={icon} alt="" />
            </ImageContainer>
          </TopLink>
          <AppBarLeftItem>
            <CustomIconButton onClick={() => pushHome()}>
              <HomeRounded />
              <CustomIconLabel>ホーム</CustomIconLabel>
            </CustomIconButton>
            {/* <CustomIconButton>
              <HistoryRounded />
              <CustomIconLabel>履歴</CustomIconLabel>
            </CustomIconButton> */}
          </AppBarLeftItem>
          <SearchContainer>
            <SearchField
              value={searchWord}
              placeholder="検索"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchWord(e.target.value)}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => onKeyPressed(e.key)}
            />
            <SearchButton onClick={() => {
              if (!isSearchable()) return;
              pushSearchPage();
            }}
            >
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
