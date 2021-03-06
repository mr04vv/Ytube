import React from 'react';
import styled, { css } from 'styled-components';
import { IconButton, AppBar, Toolbar, Button, InputBase, Avatar, Popper, MenuItem, PopperProps } from '@material-ui/core';
import { COLOR_LIGHT_GRAY, COLOR_MAIN, COLOR_MAIN_TEXT, COLOR_SUPER_LIGHT_GREY, COLOR_WHITE } from 'constants/colors';
import { SearchRounded, VideoCallRounded } from '@material-ui/icons';
import { InputBaseProps } from '@material-ui/core/InputBase';

export const Container = styled.div`
  flex-grow: 1;
`;

export const RightIconButton = styled(IconButton)`
  margin-right: 100px;
`;

export const Title = styled.h1`
  color: black;
  font-weight: 100;
  font-size: 28px;
  margin-left: 4px;
  /* font-family: 'Nova Flat', cursive; */
  font-family: 'Nico Moji', 'Meiryo';
`;

export const WhiteAppBar = styled(AppBar as React.FC)`
  background-color: ${COLOR_WHITE};
  box-shadow: none;
  border-bottom: thin solid ${COLOR_MAIN_TEXT};
  @media (max-width: 480px) {
    margin-top: 80px;
  }
`;

export const ImageContainer = styled.p`
  display: flex;
  align-items: center;
`;

export const BarContainer = styled(Toolbar as React.FC)`
  padding: 0 16px;
  height: 60px;
  min-height: 60px;
  @media screen and (max-width: 480px) {
    display: flex;
    justify-content: center;
  }
`;

export const AppBarLeftItem = styled.div`
  margin-left: 10px;
  @media (max-width: 1020px) {
    display: none;
  }
`;

export const AppBarRightItem = styled.div`
  display: flex;
  margin-right: 0;
  margin-left: auto;
  align-items: center;
`;

export const CustomIconButton = styled(IconButton)`
  .MuiIconButton-label {
    display: flex;
    flex-direction: column;  
  }
`;

export const CustomIconLabel = styled.p`
  font-size: 10px;
  margin: 0;
`;

export const CreatePostButton = styled(Button)`
  width: 100px;
  height: 30px;
  margin: 0 5px;
  background-color: ${COLOR_MAIN};
  :hover {
    background-color: ${COLOR_MAIN};
    opacity: 0.8;
   }
   display: flex;
   justify-content: space-around;
   @media (max-width: 1020px) {
    min-width: 40px;
    width: 40px;
  }
`;

export const CreatePostButtonLabel = styled.p`
  color: ${COLOR_MAIN_TEXT};
  font-size: 12px;
  @media (max-width: 1020px) {
    display: none;
  }
`;

export const VideoCallIcon = styled(VideoCallRounded)`
  color: ${COLOR_MAIN_TEXT};
`;

export const AvatarContainer = styled(IconButton)`
  display: flex;
`;

export const SearchContainer = styled.div`
  margin: 0 0 0 auto;
  width: 54%;
  max-width: 500px;
  height: 44%;
  border: thin solid ${COLOR_MAIN_TEXT};
  border-radius: 4px;
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  @media (max-width: 1020px) {
    width: 42%;
    left: 46%;
  }
`;

export const SearchField = styled(InputBase as React.FC<InputBaseProps>)`
  padding: 0 10px;
  font-size: 12px;
  width: 100%;
`;

export const SearchButton = styled(Button)`
  padding: 0;
  height: 100%;
  border-left: thin solid #6A6A6A;
  border-radius: 0;
  min-width: 48px;
`;

export const SearchIcon = styled(SearchRounded)`
  color: ${COLOR_MAIN_TEXT};
`;

export const TopLink = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;

export const CustomAvatar = styled(Avatar)`
  width: 36px;
  height: 36px;
`;

export const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 0;
  :focus {
    outline: none;
  }
`;

export const IconContainer = styled.div`
  margin: 0 12px;
`;

export const UserName = styled.div`
  font-size: 16px;
  color: ${COLOR_MAIN_TEXT};
`;

export const CustomPopper = styled(Popper)`
  width: 230px;
  left: -14px;
`;

export const MenuItemIcon = styled.div`
  margin: 0 10px;
  display: flex;
  align-items: center;
`;

export const CustomMenuItem = styled(MenuItem)`
  display: flex;
  align-items: center;
  padding: 8px 2px;
  font-size: 14px;
  color: ${COLOR_MAIN_TEXT};
`;

export const Divider = styled.div`
  border-bottom: thin solid ${COLOR_LIGHT_GRAY};
  margin: 4px 0;
`;

export const LoginButton = styled(Button)`
  width: 100px;
  height: 30px;
  margin: 0 5px;
  background-color: ${COLOR_MAIN};
  :hover {
    background-color: ${COLOR_MAIN};
    opacity: 0.8;
   }
  display: flex;
  justify-content: space-around;
  font-weight: bold;
`;

export const LoginButtonLabel = styled.p`
  color: ${COLOR_MAIN_TEXT};
  font-size: 12px;
`;

export const SearchPopup = styled(Popper as React.FC<PopperProps>)`
  position: fixed;
  min-width: 471px;
  top: 56px;
  text-align: left;
  left: 285px;
  border: thin solid ${COLOR_MAIN_TEXT};
  background-color: ${COLOR_WHITE};
  z-index: 1101;
  margin-top: 6px;
  @media (max-width: 1020px) {
    width: 90%;
    margin: 0 auto;
    min-width: unset;
  }
`;

export const PopupTitleContainer = styled.div`
  height: 30px;
  display: flex;
  font-size: 13px;
  align-items: center;
  border-bottom: thin solid ${COLOR_MAIN_TEXT};
  justify-content: space-between;
  padding: 6px 10px;
  background-color: ${COLOR_SUPER_LIGHT_GREY};
  color: ${COLOR_MAIN_TEXT};
`;

const PopupItemStyle = css`
  height: 30px;
  display: flex;
  font-size: 13px;
  align-items: center;
  justify-content: space-between;
  padding: 6px 18px;
  color: ${COLOR_MAIN_TEXT};
  background-color: ${COLOR_WHITE};
  :hover {
    cursor: pointer;
  }
`;

export const PopupItemContainer = styled.div`
  ${PopupItemStyle};
  border-bottom: thin solid ${COLOR_MAIN_TEXT};
`;

export const PopupLastItemContainer = styled.div`
  ${PopupItemStyle};
`;

export const UnselectButton = styled(Button)`
  color: ${COLOR_MAIN_TEXT};
`;
