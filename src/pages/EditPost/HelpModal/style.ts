import { COLOR_LIGHT_GRAY, COLOR_MAIN_TEXT } from 'constants/colors';
import Modal from 'react-modal';
import styled from 'styled-components';

export const CustomModal = styled(Modal)`
  width: 80%;
  height: 80%;
  left: unset;
  right: unset;
  bottom: unset;
  background-color: white;
  margin: 0 auto;
  position: relative;
  overflow: auto;
  border-radius: 4px;
  :focus {
    outline: none;
  }
`;

export const Container = styled.div`
  padding: 24px 0;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 22px;
  text-align: center;
  color: ${COLOR_MAIN_TEXT};
  letter-spacing: 1.08px;
  margin-bottom: 20px;
`;

export const HelpImage = styled.img`
  width: 100%;
  height: auto;
  min-height: 300px;
  background-color: ${COLOR_LIGHT_GRAY};
`;

export const HelpSmallImage = styled.img`
  width: 100%;
  height: auto;
  background-color: ${COLOR_LIGHT_GRAY};
`;

export const Explain = styled.div`
  color: ${COLOR_MAIN_TEXT};
  font-size: 14px;
  margin: 20px 0;
  letter-spacing: 1.08px;
`;
