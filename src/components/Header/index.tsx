import React from 'react';
import { ClickAwayListener, Grow, MenuList, Paper } from '@material-ui/core';
import { AccountCircle, ExitToApp, HomeRounded, NavigateNext } from '@material-ui/icons';
import { LoginModal } from 'components/LoginModal';
import { Category } from 'entity/entity/category';
import { Game } from 'entity/entity/game';
import Logo from 'assets/logo.png';
import { useEnhancer } from './enhancer';
import { SelectModal } from './SelectModal';
import { CustomAvatar, Container, WhiteAppBar, ImageContainer, BarContainer, AppBarLeftItem, AppBarRightItem, CustomIconLabel, CustomIconButton, CreatePostButton, CreatePostButtonLabel, VideoCallIcon, AvatarContainer, SearchContainer, SearchField, SearchButton, SearchIcon, TopLink, AccountInfo, UserName, IconContainer, CustomPopper, MenuItemIcon, CustomMenuItem, Divider, LoginButton, LoginButtonLabel, SearchPopup, PopupTitleContainer, PopupItemContainer, PopupLastItemContainer, UnselectButton } from './styles';

const Header = () => {
  const enhancer = useEnhancer();
  return (
    <>
      <LoginModal isOpen={enhancer.isOpenLoginModal} setIsOpen={enhancer.setIsOpenLoginModal} />

      <SearchPopup open={enhancer.openSearchPopup} anchorEl={enhancer.searchRef.current} role={undefined} transition disablePortal>
        <ClickAwayListener onClickAway={enhancer.searchPopupClose}>
          <div>
            <SelectModal
              search={enhancer.categoryFilter}
              loading={enhancer.loadingMeta}
              items={enhancer.filteredCategories}
              setItem={(c: Category) => enhancer.setSearchCategory(c)}
              itemType="category"
              isOpen={enhancer.openCategories}
              setIsOpen={enhancer.setOpenCategories}
            />
            <SelectModal
              search={enhancer.gameFilter}
              loading={enhancer.loadingMeta}
              items={enhancer.filteredGames}
              setItem={(g: Game) => enhancer.setSearchGame(g)}
              itemType="game"
              isOpen={enhancer.openGames}
              setIsOpen={enhancer.setOpenGames}
            />
            <PopupTitleContainer>
              カテゴリ
              {enhancer.searchCategory && <UnselectButton onClick={() => enhancer.setSearchCategory(undefined)}>選択を解除</UnselectButton>}
            </PopupTitleContainer>
            <PopupItemContainer onClick={() => enhancer.openSelectCategory()}>
              {enhancer.searchCategory?.name ?? '選択なし'}
              <NavigateNext />
            </PopupItemContainer>
            <PopupTitleContainer>
              ゲーム
              {enhancer.searchGame && <UnselectButton onClick={() => enhancer.setSearchGame(undefined)}>選択を解除</UnselectButton>}
            </PopupTitleContainer>
            <PopupLastItemContainer onClick={() => enhancer.openSelectGame()}>
              {enhancer.searchGame?.title ?? '選択なし'}
              <NavigateNext />
            </PopupLastItemContainer>
          </div>
        </ClickAwayListener>
      </SearchPopup>
      <Container>
        <WhiteAppBar>
          <BarContainer>
            <TopLink onClick={() => enhancer.pushHome()}>
              <ImageContainer>
                <img height="40px" src={Logo} alt="" />
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
                onFocus={() => enhancer.setOpenSearchPopup(true)}
                value={enhancer.searchWord}
                ref={enhancer.searchRef}
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
                    {({ placement }) => (
                      <Grow
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
                </>}
            </AppBarRightItem>
          </BarContainer>
        </WhiteAppBar>
      </Container>
    </>
  );
};

export default Header;
