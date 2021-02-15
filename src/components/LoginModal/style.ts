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
  max-width: 500px;
  margin: 0 auto;
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
  justify-content: space-between;
  margin-bottom: 14px;
`;


export const CloseButton = styled(Button)`
  color: ${COLOR_LIGHT_GRAY};
  min-width: unset;
  padding: unset;
  :hover {
    color: black;
    background-color: ${COLOR_WHITE};
  }
`;

export const Explain = styled.div`
  font-size: 14px;
  color: ${COLOR_MAIN_TEXT};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;
