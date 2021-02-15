import styled from 'styled-components';
import { COLOR_LIGHT_GRAY, COLOR_MAIN_TEXT } from 'constants/colors';
import { Avatar } from '@material-ui/core';

export const Container = styled.div`
  margin: 80px 16px;
  display: flex;
  flex-direction: column;
`;

export const PostContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;


interface Props {
  width: number;
  splitSize: number;
  }

export const PostListItemContainer = styled.div<Props>`
  width: calc(${props => props.width}px / ${props => props.splitSize} + 25px);
  min-width: calc(${props => props.width}px / 5);
  margin: 18px 0;
  :hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

export const SmallPostListItemContainer = styled.div`
  min-width: 230px;
  margin: 2px 0;
  :hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

export const Divider = styled.div`
  border-bottom: thin solid ${COLOR_LIGHT_GRAY};
  margin: 4px 14px 0 14px;
`;

export const LoaderContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 60px;
  align-items: center;
`;

export const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 10px 18px;
`;

export const AccountIcon = styled(Avatar)`
  width: 60px;
  height: 60px;
`;

export const IconContainer = styled.div`
  margin: 0 12px;
`;

export const UserName = styled.div`
  font-size: 16px;
  color: ${COLOR_MAIN_TEXT};
`;

export const TabContainer = styled.div`
  margin: 0 30px;
`;
