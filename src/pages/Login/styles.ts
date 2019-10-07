import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  height: 400px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CustomButton = styled(Button)`
  text-transform: unset;
  background-color: #ffe62b;
  max-width: 400px;
  border-radius: 0;
  width: 70vw;
  :hover {
    background-color: #ffe62b;
    opacity: 0.7;
  }
`;

const ButtonMarginContainer = styled.div`
  margin-top: 20px;
`;

const Icon = styled(FontAwesomeIcon)`
  margin: 0 8px 0 0;
`;

export {
  Container, CustomButton, Icon, ButtonMarginContainer,
};