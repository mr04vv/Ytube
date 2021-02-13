import styled from 'styled-components';
import { IconButton, AppBar, Toolbar } from '@material-ui/core';

const Container = styled.div`
  flex-grow: 1;
`;

const RightIconButton = styled(IconButton)`
  margin-right: 100px;
`;

const Title = styled.h1`
  color: black;
  font-weight: 100;
  font-size: 28px;
  margin-left: 4px;
  /* font-family: 'Nova Flat', cursive; */
  font-family: 'Nico Moji', 'Meiryo';
`;

const YellowAppBar = styled(AppBar as React.SFC)`
  background-color: #ffbd14;
  box-shadow: none;
  height: 50px;
`;

const ImageContainer = styled.p`
  display: flex;
  align-items: center;
`;

const BarContainer = styled(Toolbar as React.SFC)`
  padding: 0 16px;
  height: 50px;
  min-height: 50px;
  @media screen and (max-width: 480px) {
    display: flex;
    justify-content: center;
  }
`;

export { Container, RightIconButton, YellowAppBar, Title, ImageContainer, BarContainer };
