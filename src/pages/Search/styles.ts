import styled from 'styled-components';
import { ExpansionPanelDetails, Button } from '@material-ui/core';

const Container = styled.div`
  max-width: 800px;
  margin: 80px auto 20px;
`;

const SearchContainer = styled(ExpansionPanelDetails as React.SFC)`
  flex-direction: column;
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


export { Container, SearchContainer, SearchButton };
