import { Button, TextField } from '@material-ui/core';
import { Close, SearchOutlined } from '@material-ui/icons';
import { COLOR_GRAY, COLOR_LIGHT_GRAY, COLOR_MAIN, COLOR_MAIN_TEXT, COLOR_WHITE } from 'constants/colors';
import Modal from 'react-modal';
import styled, { css } from 'styled-components';


export const CustomModal = styled(Modal)`
  width: 80%;
  height: 80%;
  left: unset;
  right: unset;
  bottom: unset;
  background-color: white;
  margin: 0 auto;
  position: relative;
  overflow: auto;
  border-radius: 4px;
  :focus {
    outline: none;
  }
`;

export const Container = styled.div`
  padding: 24px 36px;
  display: flex;
  flex-direction: column;
`;

const CategoryStyle = css`
  border-radius: 8px;
  font-size: 14px;
  margin-right: 6px;
  margin-bottom: 12px;
  padding: 4px 10px;
  color: ${COLOR_MAIN_TEXT};
  display: flex;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;

export const CategoryName = styled.div`
  background-color: ${COLOR_MAIN};
  ${CategoryStyle};
`;
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ModalTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${COLOR_MAIN_TEXT};
  margin-bottom: 18px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 18px;
  border-bottom: thin solid ${COLOR_LIGHT_GRAY};
`;

export const SearchIcon = styled(SearchOutlined)`
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

export const SelectedContainer = styled.div`
  border-bottom: thin solid ${COLOR_LIGHT_GRAY};
  display: flex;
  margin-bottom: 20px;
  padding: 14px 0;
  flex-wrap: wrap;
  font-size: 14px;
  color: ${COLOR_MAIN_TEXT};
  text-align: center;
`;

export const SelectedTitle = styled.div`
  font-size: 14px;
  color: ${COLOR_MAIN_TEXT};
`;

export const NextButton = styled(Button)`
  color: ${COLOR_MAIN_TEXT};
  margin-left: 14px;
  font-size: 12px;
  border: thin solid ${COLOR_LIGHT_GRAY};
`;

export const CloseIcon = styled(Close)`
  height: 18px;
  width: 18px;
  color: ${COLOR_GRAY};
`;


export const AddButton = styled(Button)`
  color: ${COLOR_MAIN_TEXT};
  margin-left: 14px;
  font-size: 12px;
  border: thin solid ${COLOR_LIGHT_GRAY};
  height: 30px;
`;

export const CustomTextField = styled(TextField)`
 .MuiInputBase-input {
   font-size: 13px;
   line-height: 20px;
 }
`;

export const TextFieldContainer = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: flex-end;
`;

export const HelpText = styled.div`
  margin-top: 8px;
  font-size: 10px;
  color: ${COLOR_MAIN_TEXT};
`;
