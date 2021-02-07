import styled from 'styled-components';
import { Button, ExpansionPanel, ExpansionPanelDetails, Fab, TextField } from '@material-ui/core';
import { ExpansionPanelProps } from '@material-ui/core/ExpansionPanel';
import { StandardTextFieldProps } from '@material-ui/core/TextField';

export const SearchContainer = styled.div`
  max-width: 800px;
  margin: 80px auto 20px;
  @media screen and (max-width: 480px) {
    width: 95%;
    margin: 64px auto 20px;
  }
`;

const Container = styled.div`
  max-width: 800px;
`;

const CustomFab = styled(Fab)`
  background-color: #ffbd14;
  position: fixed;
  bottom: 70px;
  right: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (min-width: 420px) {
    right: 300px;
  }
  :hover {
    background-color: #ffbd14;
    opacity: 0.8;
  }
`;

export const SearchButton = styled(Button)`
  text-transform: unset;
  background-color: #ffbd14;
  border-radius: 0;
  color: black;
  box-shadow: unset;
  :hover {
    background-color: #ffbd14;
    opacity: 0.7;
    color: black;
    box-shadow: unset;
  }
`;

export const CustomSearchButton = styled(Button)`
  text-transform: unset;
  background-color: #ffbd14;
  border-radius: 0;
  color: black;
  box-shadow: unset;
  width: 100%;
  :hover {
    background-color: #ffbd14;
    opacity: 0.7;
    color: black;
    box-shadow: unset;
  }
`;

export const CustomSearchContainer = styled(ExpansionPanelDetails as React.FC)`
  flex-direction: column;
  align-items: center;
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

export { CustomFab, Container };

interface Props {
  width: number;
  splitSize: number;
  }

export const A = styled.div<Props>`
  width: calc(${props => props.width}px / ${props => props.splitSize} + 25px);
  min-width: calc(${props => props.width}px / 5);
  margin: 18px 0;
`;
