
import { Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';
import { useEnhancer } from './enhancer';
import { ButtonContainer, CloseButton, Container, CustomModal, Explain, LogoContainer, ModalTitleContainer } from './style';

const icon = require('assets/logo.png');


interface Props {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export const LoginModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const enhancer = useEnhancer();
  return (
    <CustomModal
      onRequestClose={() => setIsOpen(false)}
      isOpen={isOpen}
      style={{
        overlay: {
          display: 'flex',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1200,
          backgroundColor: 'rgba(165, 165, 165, 0.5)',
        },
      }}
    >
      <Container>
        <CloseButton onClick={() => setIsOpen(false)}>
          <Close />
        </CloseButton>
        <ModalTitleContainer>
          <LogoContainer>
            <img height="40px" src={icon} alt="" />
          </LogoContainer>
        </ModalTitleContainer>
        <Explain>
          わいコレはわいわいさんがYouTubeに投稿した動画のお気に入りのシーンを投稿して共有するプラットフォームです。ログインしていいねや投稿をしましょう。
        </Explain>
        <ButtonContainer>
          <Button color="primary" onClick={enhancer.pushLogin}>ログイン画面へ</Button>
          <Button color="primary" onClick={() => setIsOpen(false)}>キャンセル</Button>
        </ButtonContainer>
      </Container>
    </CustomModal>
  );
};
