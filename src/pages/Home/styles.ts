import styled from 'styled-components';
import { Button, Fab } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  max-width: 800px;
`;

const CustomFab = styled(Fab)`
  background-color: #ffe62b;
  position: fixed;
  bottom: 100px;
  right: 40px;
  @media screen and (min-width:420px) {
    right: 300px;
  }
  :hover {
    background-color: #ffe62b;
    opacity: 0.8;
  }
`;

export {
  CustomFab, Container,
};
