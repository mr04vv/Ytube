import { Button } from '@material-ui/core';
import { COLOR_LIGHT_GRAY, COLOR_TWITTER, COLOR_WHITE } from 'constants/colors';
import Modal from 'react-modal';
import styled from 'styled-components';

const { Twitter } = require('react-social-sharing');

export const CustomModal = styled(Modal)`
  width: 100%;
  left: unset;
  right: unset;
  bottom: unset;
  background-color: white;
  max-width: 540px;
  margin: 0 auto;
  border-radius: 4px;
  position: relative;
  :focus {
    outline: none;
  }
`;

export const Container = styled.div`
  padding: 24px 36px;
`;

export const CopyButton = styled(Button)`
`;

export const CopyContainer = styled.div`
  margin-top: 14px;
  padding: 4px 0px 4px 10px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLOR_LIGHT_GRAY};
`;

export const TwitterShare = styled(Twitter)`
  margin: 0;
`;

export const TwitterButton = styled(Button)`
  padding: 6px 12px;
  border-radius: 4px;
  background-color: ${COLOR_TWITTER};
  color: ${COLOR_WHITE};
  text-transform: none;
  text-decoration: none;
  :hover {
    background-color: ${COLOR_TWITTER};
    opacity: 0.8;
  }
`;

export const A = styled.a`
  margin-top: 14px;
  text-decoration: none;
`;

export const AContainer = styled.div`
  margin-top: 14px;
`;

export const TwitterIconContainer = styled.div`
  margin-right: 6px;
`;

export const ModalTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;


export const CloseButton = styled(Button)`
  position: absolute;
  right: 1em;
  top: 1em; 
  color: ${COLOR_LIGHT_GRAY};
  min-width: unset;
  padding: unset;
  :hover {
    color: black;
    background-color: ${COLOR_WHITE};
  }
`;
