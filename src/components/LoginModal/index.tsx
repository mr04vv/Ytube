import React from 'react';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Close } from '@material-ui/icons';
import { GoogleIcon } from 'components/GoogleIcon';
import { useEnhancer } from './enhancer';
import { A, Attention, ButtonContainer, CloseButton, Container, CustomButton, CustomButtonContainer, CustomModal, Explain, IconContainer, LogoContainer, ModalTitleContainer, TwitterButton } from './style';

const icon = require('assets/logo.png');


interface Props {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export const LoginModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const enhancer = useEnhancer({ setIsOpen });
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
          <CustomButtonContainer>
            <CustomButton onClick={enhancer.loginWithGoogle}>
              <IconContainer>
                <GoogleIcon size={26} />
              </IconContainer>
              Googleでログイン
            </CustomButton>
          </CustomButtonContainer>
          <CustomButtonContainer>
            <TwitterButton onClick={enhancer.loginWithTwitter}>
              <IconContainer>
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </IconContainer>
              Twitterでログイン
            </TwitterButton>
          </CustomButtonContainer>
        </ButtonContainer>
        <Attention>
          <A href="https://mr04vv.github.io/yy_collection_kiyaku/" target="_blank">利用規約</A>
          と
          <A href="https://mr04vv.github.io/yy_collection_privacy/" target="_blank">プライバシーポリシー</A>
          に同意した上でログインしてください。
        </Attention>
      </Container>
    </CustomModal>
  );
};
