import styled from 'styled-components';
import Modal from 'react-modal';
import { Button } from '@material-ui/core';

const CustomModal = styled(Modal)`
  height: 100%;
  width: 100%;
  left: unset;
  right: unset;
  bottom: unset;
  background-color: white;
  max-width: 800px;
  margin: 0 auto;
  :focus {
    outline: none;
  }
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const TimeContainer = styled.div`
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

const Time = styled.p`
  margin: 0 2px;
  display: flex;
  align-items: center;
  width: 40px;
`;

const CustomButton = styled(Button)`
  text-transform: unset;
  background-color: #ffbd14;
  border-radius: 0;
  color: black;
  box-shadow: unset;
  :hover {
    background-color: #ffbd14;
    opacity: 0.7;
    color: black;
    box-shadow: unset;
  }
`;

const CancelButton = styled(Button)`
  text-transform: unset;
  background-color: #e0e0e0;
  border-radius: 0;
  color: black;
  box-shadow: unset;
  :hover {
    background-color: #e0e0e0;
    opacity: 0.7;
    color: black;
    box-shadow: unset;
  }
`;

const PostButton = styled(Button)`
  text-transform: unset;
  background-color: #ffbd14;
  border-radius: 0;
  color: black;
  box-shadow: unset;
  border-radius: 30px;
  height: 30px;
  font-size: 12px;
  margin-right: 10px;
  :hover {
    background-color: #ffbd14;
    opacity: 0.7;
    color: black;
    box-shadow: unset;
  }
`;

const PostButtonContainer = styled.div`
  margin: 2px auto;
  display: flex;
  width: 80%;
  justify-content: center;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LengthCount = styled.p`
  width: 90%;
  margin: 0 auto;
  font-size: 10px;
  text-align: right;
`;
const LengthCountError = styled.p`
  font-size: 10px;
  width: 90%;
  margin: 0 auto;
  text-align: right;
  color: red;
`;

const ColumnContainer = styled.div`
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const NewPostContainer = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
`;

const AddButton = styled(CustomButton)`
  margin-top: 16px;
  margin-bottom: 8px;
  padding-bottom: 3px;
`;

export {
  CustomModal,
  PostContainer,
  TimeContainer,
  Time,
  CustomButton,
  PostButtonContainer,
  PostHeader,
  PostButton,
  LengthCount,
  LengthCountError,
  ColumnContainer,
  NewPostContainer,
  AddButton,
  CancelButton,
};
