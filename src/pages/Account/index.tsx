import * as React from 'react';
import AccountCircle from '@material-ui/icons/PermIdentityTwoTone';
import useMyInfo from 'hooks/User/useMyInfo';
import {
  Container, CustomAvater, ProfileContainer, UserInfoContainer, UserName,
} from './styles';

const Account = () => {
  const info = useMyInfo();
  return (
    <Container>
      {info.isLoading ? <div>loading</div> : (
        <ProfileContainer>
          <CustomAvater aria-label="recipe" src={info.userInfo!.imageUrl}>
            <AccountCircle fontSize="large" />
          </CustomAvater>
          <UserInfoContainer>
            <UserName>
              {info.userInfo!.name}
            </UserName>
          </UserInfoContainer>
        </ProfileContainer>
      )}
    </Container>
  );
};

export default Account;
