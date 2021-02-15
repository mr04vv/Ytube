import { ClickAwayListener, Grow, MenuList, Paper } from '@material-ui/core';
import { AccountCircle, ExitToApp, HomeRounded } from '@material-ui/icons';
import { LoginModal } from 'components/LoginModal';
import React from 'react';
import { useEnhancer } from './enhancer';
import { CustomAvatar, Container, WhiteAppBar, ImageContainer, BarContainer, AppBarLeftItem, AppBarRightItem, CustomIconLabel, CustomIconButton, CreatePostButton, CreatePostButtonLabel, VideoCallIcon, AvatarContainer, SearchContainer, SearchField, SearchButton, SearchIcon, TopLink, AccountInfo, UserName, IconContainer, CustomPopper, MenuItemIcon, CustomMenuItem, Divider, LoginButton, LoginButtonLabel } from './styles';

const icon = require('assets/logo.png');

const Header = () => {
  const enhancer = useEnhancer();
  return (
    <>
      <LoginModal isOpen={enhancer.isOpenLoginModal} setIsOpen={enhancer.setIsOpenLoginModal} />
      <Container>
        <WhiteAppBar>
          <BarContainer>
            <TopLink onClick={() => enhancer.pushHome()}>
              <ImageContainer>
                <img height="40px" src={icon} alt="" />
              </ImageContainer>
            </TopLink>
            <AppBarLeftItem>
              <CustomIconButton onClick={() => enhancer.pushHome()}>
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
                value={enhancer.searchWord}
                placeholder="検索"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => enhancer.setSearchWord(e.target.value)}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => enhancer.onKeyPressed(e.key)}
              />
              <SearchButton onClick={() => {
                if (!enhancer.isSearchable()) return;
                enhancer.pushSearchPage();
              }}
              >
                <SearchIcon />
              </SearchButton>
            </SearchContainer>
            <AppBarRightItem>
              {enhancer.loginStatus === 'notLoggedIn' &&
                <LoginButton onClick={enhancer.onClickCreatePostButton}>
                  <LoginButtonLabel>ログイン</LoginButtonLabel>
                </LoginButton>}
              {enhancer.loginStatus === 'loggedIn' &&
                <>
                  <CreatePostButton onClick={enhancer.onClickCreatePostButton}>
                    <VideoCallIcon />
                    <CreatePostButtonLabel>新規投稿</CreatePostButtonLabel>
                  </CreatePostButton>
                  <AvatarContainer ref={enhancer.anchorRef} onClick={enhancer.handleToggle}>
                    {enhancer.userInfo && enhancer.userInfo.imageUrl ? (
                      <CustomAvatar aria-label="recipe" src={enhancer.userInfo.imageUrl} />
                    ) : (
                      <AccountCircle color="action" />
                    )}
                  </AvatarContainer>
                  <CustomPopper open={enhancer.open} anchorEl={enhancer.anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={enhancer.handleClose}>
                            <MenuList id="menu-list-grow">
                              <AccountInfo>
                                <IconContainer>
                                  <CustomAvatar aria-label="recipe" src={enhancer.userInfo?.imageUrl} />
                                </IconContainer>
                                <UserName>{enhancer.userInfo?.name}</UserName>
                              </AccountInfo>
                              <Divider />
                              <CustomMenuItem onClick={enhancer.pushMyPage}>
                                <MenuItemIcon>
                                  <AccountCircle color="action" />
                                </MenuItemIcon>
                                マイページ
                              </CustomMenuItem>
                              {/* <CustomMenuItem onClick={enhancer.handleClose}>
                          <MenuItemIcon>
                            <History color="action" />
                          </MenuItemIcon>
                          視聴履歴
                        </CustomMenuItem> */}
                              <CustomMenuItem onClick={enhancer.logout}>
                                <MenuItemIcon>
                                  <ExitToApp color="action" />
                                </MenuItemIcon>
                                ログアウト
                              </CustomMenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </CustomPopper>
                </>
              }
            </AppBarRightItem>
          </BarContainer>
        </WhiteAppBar>
      </Container>
    </>
  );
};

export default Header;
