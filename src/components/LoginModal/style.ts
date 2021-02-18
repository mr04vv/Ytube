import { Button } from '@material-ui/core';
import { COLOR_LIGHT_GRAY, COLOR_MAIN_TEXT, COLOR_TWITTER, COLOR_TWITTER_HOVER, COLOR_WHITE } from 'constants/colors';
import Modal from 'react-modal';
import styled from 'styled-components';

export const CustomModal = styled(Modal)`
  width: 100%;
  left: unset;
  right: unset;
  bottom: unset;
  background-color: white;
  max-width: 370px;
  margin: 0 auto;
  position: relative;
  border-radius: 4px;
  :focus {
    outline: none;
  }
`;

export const Container = styled.div`
  padding: 24px 36px;
`;

export const ModalTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 14px;
`;

export const CloseButton = styled(Button)`
  color: ${COLOR_LIGHT_GRAY};
  min-width: unset;
  padding: unset;
  position: absolute;
  top: 1em;
  right: 1em;
  :hover {
    color: black;
    background-color: ${COLOR_WHITE};
  }
`;

export const Explain = styled.div`
  font-size: 13px;
  color: ${COLOR_MAIN_TEXT};
  letter-spacing: 1.08px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const IconContainer = styled.div`
  padding-right: 10px;
  display: flex;
  align-items: center;
`;

export const CustomButton = styled(Button)`
  width: 200px;
  padding: 4px 20px;
  text-transform: unset;
  font-weight: bold;
  font-size: 14px;
  border: 1px solid rgba(92,147,187,.15);
  box-shadow: 0 2px 5px -2px rgb(100 110 167 / 20%);
  background: rgba(239,246,251,0.6);
  :hover {
    background: #edf2f7;
  }
`;

export const TwitterButton = styled(Button)`
  width: 200px;
  padding: 4px 20px;
  text-transform: unset;
  font-weight: bold;
  font-size: 14px;
  border: 1px solid rgba(92,147,187,.15);
  box-shadow: 0 2px 5px -2px rgb(100 110 167 / 20%);
  background: ${COLOR_TWITTER};
  color: ${COLOR_WHITE};
  :hover {
    background: ${COLOR_TWITTER_HOVER};
  }
`;

export const CustomButtonContainer = styled.div`
  margin: 3px 0;
`;

export const Attention = styled.div`
  margin-top: 20px;
  font-size: 12px;
  color: ${COLOR_MAIN_TEXT};
  letter-spacing: 1.08px;
`;

export const A = styled.a`
  color: ${COLOR_MAIN_TEXT};
`;
