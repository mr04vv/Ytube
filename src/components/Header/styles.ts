import styled from 'styled-components';
import { IconButton, AppBar, Toolbar, Button, InputBase, Avatar } from '@material-ui/core';
import { COLOR_MAIN, COLOR_MAIN_TEXT, COLOR_WHITE } from 'constants/colors';
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
`;

export const CreatePostButtonLabel = styled.p`
  color: ${COLOR_MAIN_TEXT};
  font-size: 12px;
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
  height: 44%;
  border: thin solid ${COLOR_MAIN_TEXT};
  border-radius: 4px;
  display: flex;
  align-items: center;
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
