import { Button } from '@material-ui/core';
import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const TwContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  border-radius: 4px;
`;

export const TwitterButton = styled(Button)`
  text-transform: unset;
  background-color: rgb(29, 161, 242);
  border-radius: 4px;
  color: black;
  box-shadow: unset;
  padding: 0;
  :hover {
    background-color: rgb(29, 161, 242);
    opacity: 0.8;
    color: black;
    box-shadow: unset;
  }
`;

export const TwitterFollowA = styled.a`
  color: white;
  font-size: 14px;
  text-decoration: none;
  padding: 6px 8px;
`;
