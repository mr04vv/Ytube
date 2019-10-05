import React from 'react';
import {
  Container, YellowAppBar, Title, ImageContainer, BarContainer,
} from './styles';

const icon = require('images/ych.jpg');

const Header = () => (
  <Container>
    <YellowAppBar>
      <BarContainer>
        <ImageContainer>
          <img height="50px" src={icon} alt="" />
        </ImageContainer>
        <Title>
          YTube
        </Title>
      </BarContainer>
    </YellowAppBar>
  </Container>
);

export default Header;
