import { Button } from '@material-ui/core';
import { COLOR_LIGHT_GRAY, COLOR_MAIN_TEXT, COLOR_WHITE } from 'constants/colors';
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
  padding: 24px 20px;
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
