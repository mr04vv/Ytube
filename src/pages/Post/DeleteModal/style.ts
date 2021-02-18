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
  max-width: 540px;
  margin: 0 auto;
  border-radius: 4px;
  position: relative;
  :focus {
    outline: none;
  }
`;

export const Container = styled.div`
  padding: 24px 36px;
`;

export const DeleteButton = styled(Button)`
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ModalTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${COLOR_MAIN_TEXT};
`;

export const CloseButton = styled(Button)`
  position: absolute;
  right: 1em;
  top: 1em; 
  color: ${COLOR_LIGHT_GRAY};
  min-width: unset;
  padding: unset;
  :hover {
    color: black;
    background-color: ${COLOR_WHITE};
  }
`;
