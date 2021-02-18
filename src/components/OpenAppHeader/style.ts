import { AppBar, Button } from '@material-ui/core';
import { COLOR_WHITE, COLOR_MAIN_TEXT } from 'constants/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: ${COLOR_MAIN_TEXT};
`;

export const IconImage = styled.img`
  height: 66px;
  width: 66px;
  border-radius: 8px;
  margin-right: 12px;
`;

export const AppContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Explain = styled.div``;

export const WhiteAppBar = styled(AppBar as React.FC)`
  display: none;
  @media (max-width: 480px) {
    display: flex;
    justify-content: center;
    height: 80px;
    background-color: ${COLOR_WHITE};
    box-shadow: none;
    border-bottom: thin solid ${COLOR_MAIN_TEXT};
  }
`;

export const AppButton = styled(Button)`
  border: none;
`;
