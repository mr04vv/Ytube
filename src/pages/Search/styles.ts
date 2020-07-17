import styled from 'styled-components';
import { ExpansionPanelDetails, Button, TextField, ExpansionPanel } from '@material-ui/core';
import { StandardTextFieldProps } from '@material-ui/core/TextField';
import { ExpansionPanelProps } from '@material-ui/core/ExpansionPanel';

const Container = styled.div`
  max-width: 800px;
  margin: 80px auto 20px;
  @media screen and (max-width: 480px) {
    width: 95%;
    margin: 64px auto 20px;
  }
`;

const SearchContainer = styled(ExpansionPanelDetails as React.SFC)`
  flex-direction: column;
  align-items: center;
`;

const SearchButton = styled(Button)`
  text-transform: unset;
  background-color: #e85c9c;
  border-radius: 0;
  color: black;
  box-shadow: unset;
  :hover {
    background-color: #e85c9c;
    opacity: 0.7;
    color: black;
    box-shadow: unset;
  }
`;

export const CustomSearchButton = styled(Button)`
  text-transform: unset;
  background-color: #e85c9c;
  border-radius: 0;
  color: black;
  box-shadow: unset;
  width: 100%;
  :hover {
    background-color: #e85c9c;
    opacity: 0.7;
    color: black;
    box-shadow: unset;
  }
`;

export const SearchTextField = styled(TextField as React.FC<StandardTextFieldProps>)`
  width: 100%;
`;

export const CustomExpantionPanel = styled(ExpansionPanel as React.FC<ExpansionPanelProps>)`
  &.MuiPaper-elevation1 {
    box-shadow: unset;
  }
  &.MuiExpansionPanel-root {
    position: unset;
  }
  text-align: 'right';
`;

export { Container, SearchContainer, SearchButton };
