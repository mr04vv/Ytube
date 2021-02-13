import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { CustomButton, CancelButton } from 'pages/Home/PostModal/styles';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

interface PropsInterface {
  isOpen: boolean;
  closeModal: () => void;
  del: () => void;
}

const customStyles = {
  overlay: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    right: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '10px 50px',
    width: '70%',
    left: 'calc(250px + 10%)',
    top: '35%',
    bottom: 'unset',
    margin: '0 auto',
    position: 'unset',
  },
};

const DeleteModal = ({ isOpen, closeModal, del }: PropsInterface) => (
  <Modal isOpen={isOpen} contentLabel="Contact Modal">
    <LabelContainer>
      <Typography>削除しますか？</Typography>
    </LabelContainer>
    <ButtonContainer>
      <CancelButton color="primary" variant="contained" onClick={closeModal}>
        キャンセル
      </CancelButton>
      <CustomButton color="primary" variant="contained" onClick={del}>
        削除
      </CustomButton>
    </ButtonContainer>
  </Modal>
);
export default DeleteModal;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
`;

export const LabelContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;
