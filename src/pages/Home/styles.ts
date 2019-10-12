import styled from 'styled-components';
import { Fab } from '@material-ui/core';

const Container = styled.div`
  max-width: 800px;
`;

const CustomFab = styled(Fab)`
  background-color: #e85c9c;
  position: fixed;
  bottom: 70px;
  right: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (min-width:420px) {
    right: 300px;
  }
  :hover {
    background-color: #e85c9c;
    opacity: 0.8;
  }
`;

export {
  CustomFab, Container,
};
