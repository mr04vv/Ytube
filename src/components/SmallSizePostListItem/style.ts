import { Favorite } from '@material-ui/icons';
import { COLOR_GRAY, COLOR_LIGHT_GRAY, COLOR_MAIN, COLOR_MAIN_TEXT, COLOR_WHITE } from 'constants/colors';
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
  margin-bottom: 4px;
  flex-wrap: wrap;
  height: 23px;
  overflow: hidden;
`;

const CategoryStyle = css`
  border-radius: 20px;
  font-size: 9px;
  margin-right: 4px;
  margin-bottom: 10px;
  padding: 2px 8px;
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

export const Container = styled.div`
  display: flex;
`;

export const PostInfoContainer = styled.div`
  margin-left: 10px;
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Title = styled.p`
  font-size: 14px;
  color: ${COLOR_MAIN_TEXT};
  margin: 0;
  letter-spacing: 1.6px;
  height: calc( 1.3em * 3 );
  line-height: 1.3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

export const MetaContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
`;

export const LikeContainer = styled.div`
  font-size: 12px;
  color: ${COLOR_MAIN_TEXT};
  display: flex;
  align-items: center;
`;

export const LikeIcon = styled(Favorite)`
  font-size: 16px;
  color: ${COLOR_GRAY};
  margin-right: 3px;
`;

export const PlayCountAndDate = styled.div`
  font-size: 12px;
  color: ${COLOR_MAIN_TEXT};
`;

export const PostInfoDetailContainer = styled.div``;
