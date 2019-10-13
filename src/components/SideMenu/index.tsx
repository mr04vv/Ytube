import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import History from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNone from '@material-ui/icons/HelpOutline';
import AccountCircle from '@material-ui/icons/AccountCircle';
import useNavigation from 'hooks/Footer/useNavigation';
import { Button, Avatar } from '@material-ui/core';
import styled from 'styled-components';
import useReactRouter from 'use-react-router';
import useMyInfo from 'hooks/User/useMyInfo';
import useStyles from './styles';

const SideMenu = () => {
  const classes = useStyles();
  const nav = useNavigation();
  const user = useMyInfo();
  const { location, history } = useReactRouter();

  return (
    <>
      {location.pathname !== '/login' && (
        <BottomNavigation showLabels value={nav.value} onChange={nav.handleChange} className={classes.root}>
          <ButtonWrapper>
            {location.pathname === '/home' && (
              <SelectedButton onClick={() => {
                window.scrollTo(0, 0);
                history.push({
                  pathname: '/home',
                });
              }}
              >
                <History />
                <Title>ホーム</Title>
              </SelectedButton>
            )}
            {location.pathname !== '/home' && (
              <CustomButton onClick={() => {
                window.scrollTo(0, 0);
                history.push({
                  pathname: '/home',
                });
              }}
              >
                <History />
                <Title>ホーム</Title>
              </CustomButton>
            )}
          </ButtonWrapper>
          <ButtonWrapper>
            {location.pathname === '/search' && (
              <SelectedButton onClick={() => {
                window.scrollTo(0, 0);
                history.push({
                  pathname: '/search',
                });
              }}
              >
                <SearchIcon />
                <Title>検索</Title>
              </SelectedButton>
            )}
            {location.pathname !== '/search' && (
              <CustomButton onClick={() => {
                window.scrollTo(0, 0);
                history.push({
                  pathname: '/search',
                });
              }}
              >
                <SearchIcon />
                <Title>検索</Title>
              </CustomButton>
            )}
          </ButtonWrapper>
          <ButtonWrapper>
            {location.pathname === '/help' && (
              <SelectedButton onClick={() => {
                window.scrollTo(0, 0);
                history.push({
                  pathname: '/help',
                });
              }}
              >
                <NotificationsNone />
                <Title>ヘルプ</Title>
              </SelectedButton>
            )}
            {location.pathname !== '/help' && (
              <CustomButton onClick={() => {
                window.scrollTo(0, 0);
                history.push({
                  pathname: '/help',
                });
              }}
              >
                <NotificationsNone />
                <Title>ヘルプ</Title>
              </CustomButton>
            )}
          </ButtonWrapper>
          <ButtonWrapper>
            {location.pathname === '/accounts' && (
              <SelectedButton onClick={() => {
                window.scrollTo(0, 0);
                history.push({
                  pathname: '/accounts',
                });
              }}
              >
                {(user.userInfo && user.userInfo.imageUrl)
                  ? <CustomAvater aria-label="recipe" src={user.userInfo.imageUrl} />
                  : <AccountCircle />}
                <Title>マイページ</Title>
              </SelectedButton>
            )}
            {location.pathname !== '/accounts' && (
              <CustomButton onClick={() => {
                window.scrollTo(0, 0);
                history.push({
                  pathname: '/accounts',
                });
              }}
              >
                {(user.userInfo && user.userInfo.imageUrl)
                  ? <CustomAvater aria-label="recipe" src={user.userInfo.imageUrl} />
                  : <AccountCircle />}
                <Title>マイページ</Title>
              </CustomButton>
            )}
          </ButtonWrapper>
          {/* <BottomNavigationAction className={classes.icon} classes={{ selected: classes.selected }} value="/home" icon={} /> */}
          {/* <BottomNavigationAction className={classes.icon} classes={{ selected: classes.selected }} value="/" icon={<SearchIcon />} /> */}
        </BottomNavigation>
      )}
    </>
  );
};

export default SideMenu;

const ButtonWrapper = styled.div`
  display: flex;
  width: 150px;
`;

const CustomButton = styled(Button)`
  border-radius: 20px;
  :hover {
    color: #e85c9c;
    background-color: #e85c9c36
  }
`;

const SelectedButton = styled(Button)`
  border-radius: 20px;
  color: #e85c9c;
  :hover {
    color: #e85c9c;
    background-color: #e85c9c36
  }
`;

const Title = styled.p`
  margin: 0 10px;
`;

const CustomAvater = styled(Avatar)`
  width: 24px;
  height: 24px;
`;
