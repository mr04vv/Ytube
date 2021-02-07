import { Favorite } from '@material-ui/icons';
import { COLOR_GRAY, COLOR_LIGHT_GRAY, COLOR_MAIN, COLOR_MAIN_TEXT, COLOR_WHITE } from 'constants/colors';
import styled, { css } from 'styled-components';

export const ThumbnailImageContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
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
  margin: 8px 0;
  flex-wrap: wrap;
  height: 23px;
  overflow: hidden;
`;

const CategoryStyle = css`
  border-radius: 20px;
  font-size: 10px;
  margin-right: 4px;
  margin-bottom: 10px;
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

export const Container = styled.div`
`;

export const Title = styled.p`
  font-size: 14px;
  color: ${COLOR_MAIN_TEXT};
  margin: 0;
  letter-spacing: 1.6px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
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
