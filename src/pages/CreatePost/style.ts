import { Checkbox, TextField } from '@material-ui/core';
import { NavigateNext } from '@material-ui/icons';
import { COLOR_LIGHT_GRAY, COLOR_MAIN, COLOR_MAIN_HEAVY, COLOR_MAIN_TEXT, COLOR_SUPER_LIGHT_GREY } from 'constants/colors';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

export const Container = styled.div`
  margin: 80px auto;
  max-width: 700px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.img`
  width: 50%;
  margin-top: 10px;
  height: 100%;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const Explain = styled.p`
  display: flex;
  align-items: center;
  width: 40%;
  margin: 20px auto;
  text-align: left;
  line-height: 2;
  font-size: 18px;
  @media (min-width: 1261px) {
    padding-left: 180px;
  }
  @media (max-width: 1024px) {
    width: 96%;
    line-height: 1.2;
  }
`;

export const ExplainContainer = styled.div`
  display: flex;
  margin: 20px 0;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1024px) {
    flex-direction: column-reverse;
  }
`;

export const Title = styled.p`
  margin: 30px 0 0;
  font-size: 26px;
`;

export const PromptContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: red;
  font-size: 18px;
`;

export const YouTubePlayer = styled(ReactPlayer)`
  max-width: 700px;
  max-height: 394px;
  background-color: ${COLOR_SUPER_LIGHT_GREY};
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CustomTextField = styled(TextField)`
 .MuiInputBase-input {
   font-size: 13px;
   line-height: 20px;
 }
`;

export const TextFieldContainer = styled.div`
  margin-top: 14px;
`;

export const SelectItemContainer = styled.div`
  margin-top: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
`;

export const ItemTitle = styled.div`
  color: ${COLOR_MAIN_TEXT};
  font-size: 13px;
  display: flex;
  align-items: center;
`;

export const SelectItem = styled.div`
  display: flex;
  padding-right: 30px;
  align-items: center;
  color: ${COLOR_MAIN_TEXT};
  font-size: 13px;
  padding: 4px 0;
  :hover {
    cursor: pointer;
  }
`;

export const NextIcon = styled(NavigateNext)`
  margin-left: 40px;
`;

export const CheckContainer = styled.div`
  margin-top: 14px;
  display: flex;
`;

export const Check = styled(Checkbox)`
  &.Mui-checked {
    color: ${COLOR_MAIN_HEAVY};
    :hover {
      background-color: rgb(215 142 31 / 8%);
    }
  }
  :hover {
    background-color: rgb(215 142 31 / 8%);
  }
`;
