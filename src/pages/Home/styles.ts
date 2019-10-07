import styled from 'styled-components';
import { Fab } from '@material-ui/core';

const Container = styled.div`
  max-width: 800px;
`;

const CustomFab = styled(Fab)`
  background-color: #ffe62b;
  position: fixed;
  bottom: 70px;
  right: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
