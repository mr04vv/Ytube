import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import History from '@material-ui/icons/Home';
// import SearchIcon from '@material-ui/icons/Search';
import NotificationsNone from '@material-ui/icons/HelpOutline';
import AccountCircle from '@material-ui/icons/AccountCircle';
import useNavigation from 'hooks/Footer/useNavigation';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import useReactRouter from 'use-react-router';
import useStyles from './styles';

const SideMenu = () => {
  const classes = useStyles();
  const nav = useNavigation();
  const { location, history } = useReactRouter();

  return (
    <BottomNavigation showLabels value={nav.value} onChange={nav.handleChange} className={classes.root}>
      <ButtonWrapper>
        {location.pathname === '/home' && (
          <SelectedButton onClick={() => history.push({
            pathname: '/home',
          })}
          >
            <History />
            <Title>ホーム</Title>
          </SelectedButton>
        )}
        {location.pathname !== '/home' && (
          <CustomButton onClick={() => history.push({
            pathname: '/home',
          })}
          >
            <History />
            <Title>ホーム</Title>
          </CustomButton>
        )}
      </ButtonWrapper>
      <ButtonWrapper>
        {location.pathname === '/help' && (
          <SelectedButton onClick={() => history.push({
            pathname: '/help',
          })}
          >
            <NotificationsNone />
            <Title>ヘルプ</Title>
          </SelectedButton>
        )}
        {location.pathname !== '/help' && (
          <CustomButton onClick={() => history.push({
            pathname: '/help',
          })}
          >
            <NotificationsNone />
            <Title>ヘルプ</Title>
          </CustomButton>
        )}
      </ButtonWrapper>
      <ButtonWrapper>
        {location.pathname === '/accounts' && (
          <SelectedButton onClick={() => history.push({
            pathname: '/accounts',
          })}
          >
            <AccountCircle />
            <Title>マイページ</Title>
          </SelectedButton>
        )}
        {location.pathname !== '/accounts' && (
          <CustomButton onClick={() => history.push({
            pathname: '/accounts',
          })}
          >
            <AccountCircle />
            <Title>マイページ</Title>
          </CustomButton>
        )}
      </ButtonWrapper>
      {/* <BottomNavigationAction className={classes.icon} classes={{ selected: classes.selected }} value="/home" icon={} /> */}
      {/* <BottomNavigationAction className={classes.icon} classes={{ selected: classes.selected }} value="/" icon={<SearchIcon />} /> */}
    </BottomNavigation>
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
    color: #f1d400;
    background-color: #ffe62b36
  }
`;

const SelectedButton = styled(Button)`
  border-radius: 20px;
  color: #f1d400;
  :hover {
    color: #f1d400;
    background-color: #ffe62b36
  }
`;

const Title = styled.p`
  margin: 0 10px;
`;
