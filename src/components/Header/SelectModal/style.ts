import { COLOR_MAIN, COLOR_MAIN_TEXT } from 'constants/colors';
import Modal from 'react-modal';
import styled, { css } from 'styled-components';


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
  padding: 24px 36px;
  display: flex;
  flex-wrap: wrap;
`;

const CategoryStyle = css`
  border-radius: 8px;
  font-size: 14px;
  margin-right: 6px;
  margin-bottom: 12px;
  padding: 4px 10px;
  color: ${COLOR_MAIN_TEXT};
  display: flex;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;

export const CategoryName = styled.div`
  background-color: ${COLOR_MAIN};
  ${CategoryStyle};
`;
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
