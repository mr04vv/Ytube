import React from 'react';
import styled from 'styled-components';
import useReactRouter from 'use-react-router';
import { Container, YellowAppBar, ImageContainer, BarContainer } from './styles';

const icon = require('images/icon.png');

const Header = () => {
  const { history } = useReactRouter();
  return (
    <Container>
      <YellowAppBar>
        <BarContainer>
          <TopLink
            onClick={() =>
              history.push({
                pathname: '/home',
              })
            }
          >
            <ImageContainer>
              <img height="50px" src={icon} alt="" />
            </ImageContainer>
          </TopLink>
        </BarContainer>
      </YellowAppBar>
    </Container>
  );
};

export default Header;

const TopLink = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;
