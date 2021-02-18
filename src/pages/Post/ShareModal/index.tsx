import React from 'react';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Close } from '@material-ui/icons';
import SimpleSnackBar from 'components/SimpleSnackBar';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useEnhancer } from './enhancer';
import { A, AContainer, CloseButton, Container, CopyButton, CopyContainer, CustomModal, ModalTitleContainer, TwitterButton, TwitterIconContainer } from './style';

interface Props {
  dynamicLink: string;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export const ShareModal: React.FC<Props> = ({ dynamicLink, isOpen, setIsOpen }) => {
  const enhancer = useEnhancer();
  return (
    <>
      <SimpleSnackBar isShow={enhancer.isCopied} onClose={() => {}} message="クリップボードにコピーしました" type="success" />
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
          <ModalTitleContainer>
            <div>共有</div>
            <CloseButton onClick={() => setIsOpen(false)}>
              <Close />
            </CloseButton>
          </ModalTitleContainer>
          <CopyContainer>
            <div>{dynamicLink}</div>
            <CopyToClipboard text={dynamicLink} onCopy={() => enhancer.setCopy()}>
              <CopyButton color="primary">コピー</CopyButton>
            </CopyToClipboard>
          </CopyContainer>
          <AContainer>
            <A href={`https://twitter.com/intent/tweet/?text=%23わいコレ&url=${dynamicLink}`} target="_blank" rel="noreferrer noopener">
              <TwitterButton>
                <TwitterIconContainer>
                  <FontAwesomeIcon size="lg" icon={faTwitter} color="white" />
                </TwitterIconContainer>
                Twitterで共有
              </TwitterButton>
            </A>
          </AContainer>
        </Container>
      </CustomModal>
    </>
  );
};
