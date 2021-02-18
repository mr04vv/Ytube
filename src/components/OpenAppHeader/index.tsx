import React from 'react';
import Icon from 'assets/icon_ios.png';
import { AppButton, AppContainer, Container, IconImage, WhiteAppBar } from './style';

export const OpenAppHeader = () => (
  <WhiteAppBar>
    <Container>
      <AppContainer>
        <IconImage src={Icon} />
        {'スマホの方は右のボタンから\nアプリをダウンロード'}
      </AppContainer>
      <a href="https://yycollection.page.link/iGuj" style={{ textDecoration: 'none' }}>
        <AppButton color="primary">開く</AppButton>
      </a>
    </Container>
  </WhiteAppBar>
);
