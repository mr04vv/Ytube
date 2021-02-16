import { Button } from '@material-ui/core';
import { Favorite, FavoriteBorder, Share } from '@material-ui/icons';
import { COLOR_GRAY, COLOR_LIGHT_GRAY, COLOR_LIKED, COLOR_MAIN, COLOR_MAIN_TEXT, COLOR_WHITE } from 'constants/colors';
import { SMALL_POST_LIST_CONTAINER_MAX_WIDTH } from 'constants/maxWidth';
import ReactPlayer from 'react-player';
import styled, { css } from 'styled-components';

export const ThumbnailImageContainer = styled.div`
  position: relative;
  width:  45%;
`;

export const ThumbnailImage = styled.img`
  height: auto;
  width: 100%;
  border-radius: 3px;
`;

export const TimeContainer = styled.div`
  background: rgba(0,0,0,0.8);
  border-radius: 4px;
  font-size: 12px;
  position: absolute;
  right: 6px;
  bottom: 20px;
  text-align: center;
  padding: 3px 4px;
`;

export const Time = styled.p`
margin: 0;
color: ${COLOR_WHITE};
`;

export const CategoryGameContainer = styled.div`
  display:flex;
  margin: 14px 0;
  flex-wrap: wrap;
  overflow: hidden;
`;

const CategoryStyle = css`
  border-radius: 10px;
  font-size: 12px;
  margin-right: 8px;
  padding: 4px 10px;
  color: ${COLOR_MAIN_TEXT};
  display: flex;
  align-items: center;
`;

export const CategoryName = styled.div`
  background-color: ${COLOR_MAIN};
  ${CategoryStyle};
`;

export const GameTitle = styled.div`
  background-color: ${COLOR_LIGHT_GRAY};
  ${CategoryStyle};
`;

interface ContainerProps {
  width: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  margin: ${props => (props.width < 1700 ? '80px 20px 0 20px' : '80px auto 0 auto')};
  max-width: 1700px;
`;

export const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Title = styled.p`
  font-size: 18px;
  color: ${COLOR_MAIN_TEXT};
  margin: 0;
  letter-spacing: 1.6px;
`;

export const DetailContainer = styled.div`
  margin-top: 14px;
`;

export const Detail = styled.p`  
  font-size: 13px;
  color: ${COLOR_MAIN_TEXT};
  margin: 0;
  letter-spacing: 1.6px;
  white-space: pre-line;
`;


export const MetaContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
`;

export const LikeContainer = styled(Button)`
  font-size: 14px;
  color: ${COLOR_MAIN_TEXT};
  display: flex;
  align-items: center;
`;

export const LikeIcon = styled(FavoriteBorder)`
  font-size: 26px;
  color: ${COLOR_GRAY};
  margin-right: 6px;
`;

export const LikedIcon = styled(Favorite)`
  font-size: 26px;
  color: ${COLOR_LIKED};
  margin-right: 6px;`;

export const PlayCountAndDate = styled.div`
  font-size: 13px;
  color: ${COLOR_MAIN_TEXT};
  display: flex;
  align-items: center;
`;

export const ShareAndLikeContainer = styled.div`
  margin-right: 8px;
  display: flex;
`;

export const ShareContainer = styled(Button)`
  font-size: 14px;
  margin-left: 14px;
  color: ${COLOR_MAIN_TEXT};
  display: flex;
  align-items: center;
`;

export const ShareIcon = styled(Share)`
  font-size: 26px;
  color: ${COLOR_GRAY};
  margin-right: 6px;
`;

export const PostInfoDetailContainer = styled.div``;

export const YouTubePlayer = styled(ReactPlayer)``;

export const RandomPostContainer = styled.div`
  min-width: 230px;
  margin-bottom: 2px;
  :hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

export const RandomPostListContainer = styled.div`
  margin: 0 16px 20px 16px;
  max-width: ${SMALL_POST_LIST_CONTAINER_MAX_WIDTH}px;
  min-width: ${SMALL_POST_LIST_CONTAINER_MAX_WIDTH}px;
  display: flex;
  flex-direction: column;
`;

interface MainContentContainerProps {
  width: string;
}

export const MainContentContainer = styled.div<MainContentContainerProps>`
  display: flex;
  width: ${props => props.width};
  flex-direction: column;
`;

export const Divider = styled.div`
  border-bottom: thin solid ${COLOR_LIGHT_GRAY};
  margin-top: 4px;
`;

export const AppButtonsContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const OpenAppButtonContainer = styled.div`
  margin-right: 10px;
`;

export const OpenAppButton = styled(Button)`
  width: 150px;
  color: ${COLOR_MAIN_TEXT};
  border-radius: 0;
  border: thin solid ${COLOR_LIGHT_GRAY};
  :hover {
    opacity: 0.8;
  }
  display: flex;
  justify-content: space-around;
  text-decoration: none;
  text-transform: unset;
`;

export const OpenYouTubeButton = styled(Button)`
  width: 160px;
  color: ${COLOR_MAIN_TEXT};
  border-radius: 0;
  border: thin solid ${COLOR_LIGHT_GRAY};
  :hover {
    opacity: 0.8;
  }
  display: flex;
  justify-content: space-around;
  text-decoration: none;
  text-transform: unset;
`;

export const LoaderContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const A = styled.a`
  text-decoration: none;
`;
