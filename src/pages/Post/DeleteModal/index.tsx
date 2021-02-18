import React, { useState } from 'react';
import { Close } from '@material-ui/icons';
import SimpleSnackBar from 'components/SimpleSnackBar';
import useReactRouter from 'use-react-router';
import { ButtonContainer, CloseButton, Container, CustomModal, DeleteButton, ModalTitleContainer } from './style';


interface Props {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  deletePost: () => Promise<boolean>;
}

export const DeleteModal: React.FC<Props> = ({ isOpen, setIsOpen, deletePost }) => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { history } = useReactRouter();
  return (
    <>
      <SimpleSnackBar isShow={!!error} onClose={() => setError('')} message={error} type="error" />
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
            <div>投稿を削除しますか？</div>
            <CloseButton onClick={() => setIsOpen(false)}>
              <Close />
            </CloseButton>
          </ModalTitleContainer>
          <ButtonContainer>
            <DeleteButton
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                const deleted = await deletePost();
                if (deleted) {
                  history.push({
                    pathname: '/home',
                  });
                } else {
                  setError('削除に失敗しました');
                  setTimeout(() => {
                    setError('');
                  }, [2000]);
                }
              }}
            >
              削除
            </DeleteButton>
            <DeleteButton disabled={loading} onClick={() => setIsOpen(false)}>キャンセル</DeleteButton>
          </ButtonContainer>
        </Container>
      </CustomModal>
    </>
  );
};
