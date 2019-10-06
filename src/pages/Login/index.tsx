import * as React from 'react';
import useLogin from 'hooks/Login/useLogin';
import { faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  Container, CustomButton, Icon, ButtonMarginContainer,
} from './styles';

const Login = () => {
  const login = useLogin();
  return (
    <Container>
      <CustomButton aria-label="Delete" onClick={() => login.loginWithTwitter()}>
        <Icon icon={faTwitter} size="lg" />
        Twitterでログイン
      </CustomButton>
      <ButtonMarginContainer>
        <CustomButton aria-label="Delete" onClick={() => login.loginWithGoogle()}>
          <Icon icon={faGoogle} size="lg" />
          Googleでログイン
        </CustomButton>
      </ButtonMarginContainer>
    </Container>
  );
};

export default Login;
